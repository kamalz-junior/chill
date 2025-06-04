import path from "path";
import cors from "cors";
import express from "express";
import multer from "multer";
import { authenticateToken } from "~/middleware";
import { env } from "~/env";
import auth from "~/routes/auth";
import users from "~/routes/users";
import watchlist from "~/routes/watchlist";

const app = express();
const port = env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/users", authenticateToken, users);
app.use("/watchlist", watchlist);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else if (err) {
    res.status(500).json({ error: err.message });
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
