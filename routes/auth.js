const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const { CLIENT_URL } = process.env;
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

//REGISTER

function sendEmailAuth(customer_email) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "hoavangtrencoxanh981@gmail.com",
      pass: "forever981",
    },
  });

  var mailOption = {
    from: "hoavangtrencoxanh981@gmail.com",
    to: customer_email,
    subject: "Xac minh email",
    text: "Xac minh email",
    html: `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Chào mừng bạn đến với APP CHAT NH3.</h2>
            <p>Chúc mừng bạn! Bạn sẽ bắt bắt đầu sử dụng  APP CHAT NH3
                Hãy nhấp vào nút bên dưới để xác thực địa chỉ email của bạn
            </p>
      <p>Click <a href="http://localhost:3000/login/' +  '" style="background: crimson; 
      text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">ở đây</a> để xác thực email</p>
      `,
  };

  transporter.sendMail(mailOption, (err, info) => {
    if (err) console.log(err);
    else {
      console.log("Email sent " + info.response);
    }
  });
}

router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);

    // const {usename, email, password} = req.body
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //   const newUser = {
    //     usename, email,  password: hashedPassword
    // }

    //create new user
    const newUser = new User({
      username: req.body.username,
      profilePicture: req.body.profilePicture, //dvhsdihvis
      email: req.body.email,
      city: req.body.city,
      quanhe: req.body.quanhe,
      quoctich: req.body.quoctich,
      password: hashedPassword,
    });
    const u = await User.findOne({ email: req.body.email });
    if (u) return res.status(400).json("This email already exists.");

    const user = await newUser.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        sendEmailAuth(data.email);
        console.log(data);
        res.redirect("/");
      }
    });
    // res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).json({ msg: "Không tìm thấy người dùng" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Sai mật khẩu");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

module.exports = router;
