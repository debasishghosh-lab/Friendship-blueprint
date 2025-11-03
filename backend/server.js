import express from "express";
import cors from "cors";
import multer from "multer";
import xlsx from "xlsx";
import fs from "fs";
import { spawn } from "child_process";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Multer setup — stores uploaded files in /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // keeps file extension (.csv/.xlsx)
  },
});

const upload = multer({ storage });

// ✅ Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = req.file.path;
  console.log("📂 File received:", filePath);

  // ✅ Run the Python model
  const pythonProcess = spawn("python", ["model/run_model.py", filePath]);

  let pythonData = "";
  let pythonError = "";

  pythonProcess.stdout.on("data", (data) => {
    pythonData += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    pythonError += data.toString();
  });

  pythonProcess.on("close", (code) => {
    if (pythonError) {
      console.error("❌ Python script failed:", pythonError);
      return res.status(500).json({ error: pythonError });
    }

    try {
      const parsed = JSON.parse(pythonData);
      res.json(parsed);
    } catch (e) {
      console.error("❌ Failed to parse Python output:", pythonData);
      res.status(500).json({ error: "Invalid Python output" });
    }
  });
});

// ✅ Serve React frontend (dist folder)
app.use(express.static(path.join(process.cwd(), "dist")));

// ✅ Catch-all route (regex form required in Express 5)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



