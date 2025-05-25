import { sql } from "~/db";

const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
	const {
		search,
		type = "all",
		sortBy = "created_at",
		order = "desc",
	} = req.query;

	const data = await sql`
    SELECT * FROM watchlist
    WHERE 1=1
    ${search ? sql`AND title ILIKE ${`%${search}%`}` : sql``}
    ${type !== "all" ? sql`AND type = ${type}` : sql``}
    ORDER BY ${sql.unsafe(sortBy)} ${sql.unsafe(order)}
  `;

	res.status(200).json(data);
});

router.post("/", async (req, res) => {
	const { userId, itemId, title, type, posterUrl } = req.body;

	const data = await sql`
    INSERT INTO watchlist (user_id, item_id, title, type, poster_url) VALUES (${userId}, ${itemId}, ${title}, ${type}, ${posterUrl})
    returning *
  `;

	res.status(201).json(data);
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	const data = await sql`DELETE FROM watchlist WHERE id = ${id}`;
	res.status(200).json(data);
});

export default router;
