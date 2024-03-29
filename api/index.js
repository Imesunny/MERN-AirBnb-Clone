const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownLoader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "secretkey";
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.send("test okay buddy");
});

//register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // res.json({name,email,password})
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const hashed_password = userDoc.password;
      const passOk = bcrypt.compareSync(password, hashed_password);

      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.json("Password mismatch");
      }
    } else {
      res.json("User not found");
    }
  } catch (error) {
    res.status(500).json(error, "error from Login");
  }
});

//profile
app.get("/profile", (req, res) => {
  // console.log(req.headers);
  const { token } = req.cookies;
  // console.log(token);
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      // console.log(userData);
      if (err) throw err;
      // console.log(user);
      const { name, email, _id } = await User.findById(userData.id);

      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// console.log({ __dirname });
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownLoader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/uploads", photosMiddleware.array("photos", 100), async(req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = path[parts.length - 1];
    const newPath = path + "." + ext;

    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads/', ''));
  }
  res.json(uploadedFiles);
});

app.listen(8000, () => {
  console.log("listening on post 8000");
});
