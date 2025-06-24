import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./route/user.route.js";
import courseRoutes from "./route/course.route.js";
import compression from "compression";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import paymentRoutes from "./route/paymentRoutes.js"
import purchaseRoutes from "./route/purchaseRoute.js"
import progressRoutes from "./route/progress.route.js"


dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(helmet()); // Sets secure HTTP headers
app.use(compression()); // Enables GZIP compression
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Allow requests from localhost and devices on same network (192.168.*.*)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

// CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow no origin (e.g. Postman) or matching allowed origins or mobile IPs
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.startsWith("http://192.168.")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true, // allow cookies/headers like Authorization
}));


// Serve static assets (e.g., images, favicon, etc.)
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "1y",
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      } else {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  })
);

// Routes
app.use("/api/v1/user", userRoutes);

app.use("/api/v1/course", courseRoutes);

app.use("/api/v1/purchase", purchaseRoutes); // 👈 Register this too

app.use("/api/v1/payment", paymentRoutes);

app.use("/api/v1/progress", progressRoutes);



// Serve frontend build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
