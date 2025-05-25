import bcrypt from "bcryptjs";
import { Router } from "express";
import { sql } from "~/db";
import { upload } from "~/middleware";

const router = Router();

router.get("/", async (req, res) => {
  const data = await sql`SELECT * FROM users`;

  res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const data = await sql`SELECT * FROM users WHERE id = ${id}`;

  res.status(200).json(data);
});

router.post("/", async (req, res) => {
  const { name, username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await sql`
    INSERT INTO users (name, username, email, password) VALUES (${name}, ${username}, ${email}, ${hashedPassword})
    returning *
  `;

  res.status(201).json(data);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, username, email, password, avatar_path } = req.body;

  console.log("PATCH request body:", req.body);


  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await sql`
    UPDATE users SET name = ${name}, username = ${username}, email = ${email}, password = ${hashedPassword}, avatar_path = ${avatar_path} WHERE id = ${id}
    returning *
  `;

  res.status(200).json(data);
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const data = await sql`DELETE FROM users WHERE id = ${id}`;

  res.status(200).json(data);
});

router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "File upload succesfully",
    data: {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    },
  });
});

export default router;
