// server/index.js

import express from "express"
import path from "path"
import multer from "multer"
import cors from "cors"


const PORT = process.env.PORT || 3001;
const __dirname = path.resolve()
// console.log(__dirname)

const app = express();

const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "avatars");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage })

app.use(express.json())
app.use("/avatars", express.static(path.resolve(__dirname, 'avatars')))

app.use(express.static(path.resolve(__dirname, '../frontend/build')))

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
})

app.post("/avatars", upload.single("image"), (req, res) => {
  res.json({
    url: `/avatars/${req.file.originalname}`,
    text: "OKKK!!!"
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});