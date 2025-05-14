import express from "express";
import { sql } from "~/db";

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const data = await sql`SELECT * FROM users`;

  res.send(data);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const data = await sql`SELECT * FROM users WHERE id = ${id}`;

  res.send(data);
  console.log(data);
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body;

  const data = await sql`
    INSERT INTO users (username, password) VALUES (${username}, ${password})
    returning *
  `;

  res.send(data);
});

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, username, email, password } = req.body;

  const data = await sql`
    UPDATE users SET name = ${name}, username = ${username}, email = ${email}, password = ${password} WHERE id = ${id}
    returning *
  `;

  res.send(data);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const data = await sql`DELETE FROM users WHERE id = ${id}`;

  res.send(data);
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
