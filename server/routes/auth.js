import bcrypt from "bcryptjs";
import { Router } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { sql } from "~/db";
import { env } from "~/env";

const router = Router();

router.post("/register", async (req, res) => {
	const { name, username, email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const token = uuidv4();

	await sql`
    INSERT INTO users (name, username, email, password, token) VALUES (${name}, ${username}, ${email}, ${hashedPassword}, ${token})
    returning *
  `;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: env.EMAIL,
			pass: env.PASSWORD,
		},
	});

	const message = {
		from: `Chill <${env.EMAIL}>`,
		to: email,
		subject: "Email Verification",
		html: `
      <div>
        <p>Please verify your email by clicking the link below:</p>
        <a href="http://localhost:8080/auth/verify/${token}">Verify</a>
      <div>
    `,
	};

	transporter.sendMail(message, (error, info) => {
		if (error) {
			console.log(error);

			return res.status(500).json({
				message: "Failed to send verification email",
			});
		}

		// biome-ignore lint/style/useTemplate: <explanation>
		console.log("Verification email sent: " + info.response);
		res.json({
			message: "Verification email sent",
		});
	});
});

router.get("/verify/:token", async (req, res) => {
	const { token } = req.params;

	const [existingUser] = await sql`SELECT * FROM users WHERE token = ${token}`;

	if (!existingUser) {
		return res.status(404).json({
			message: "User not found",
		});
	}

	await sql`
    UPDATE users SET is_verified = ${true}, token = ${null} WHERE id = ${existingUser.id}
    returning *
  `;

	res.json({
		message: "Email verified succesfully",
	});
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const [existingUser] = await sql`SELECT * FROM users WHERE email = ${email}`;

	if (!existingUser) {
		return res.status(404).json({
			message: "User not found",
		});
	}

	const isValidPassword = await bcrypt.compare(password, existingUser.password);

	if (!isValidPassword) {
		return res.status(401).json({
			message: "Password invalid",
		});
	}

	const token = jwt.sign(
		{ id: existingUser.id, email: existingUser.email },
		env.JWT_SECRET,
		{
			expiresIn: env.JWT_EXPIRATION,
		},
	);

	res.status(200).json({
		data: {
			...existingUser,
			password,
			token,
		},
		message: "Login successful",
	});
});

export default router;
