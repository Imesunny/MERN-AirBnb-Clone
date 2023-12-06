const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "secretkey";
app.use(
  cors({
    origin: "*",
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
          function (err, token) {
            if (err) throw err;
            res.cookie("token", token).json("password match");
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

app.listen(8000, () => {
  console.log("listening on post 8000");
});
