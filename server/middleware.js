import path from "path";
import jwt from "jsonwebtoken";
import multer from "multer";
import { env } from "~/env";

export function authenticateToken(req, res, next){
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.sendStatus(401);

    const decoded = jwt.verify(token, env.JWT_secret);

    if(!decoded) return res.sendStatus(403);

    next();
}

export const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads");
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + ext);
      },
    }),
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png/;
      const mimeType = allowedTypes.test(file.mimetype);
      const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase(),
      );
  
      if (mimeType && extName) {
        cb(null, true);
      } else {
        cb(new multer.MulterError("Invalid file type", file));
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });