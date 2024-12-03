const md5 = require("md5");
const User = require("../models/user.model");
const generateHelper = require("../../../helper/generate");
const ForgotPassword = require("../models/forgot-password.model");
const sendMailHelper = require("../../../helper/sendMail");
//[get] /api/v1/user/register
module.exports.register = async (req, res) => {
  req.body.password = md5(req.body.password);
  const exitEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (exitEmail) {
    res.json({
      code: 400,
      message: "email đã tồn tại",
    });
  } else {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });
    user.save();
    const token = user.token;
    res.cookie("token", token);
    res.json({
      code: 200,
      message: "Tạo tài khoản thành công",
      token: token,
    });
  }
};

//[get] /api/v1/user/login
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại",
    });
    return;
  }
  if (password !== user.password) {
    res.json({
      code: 400,
      message: "Mật khẩu không chính xác",
    });
    return;
  }
  const token = user.token;
  res.cookie("token", token);
  res.json({
    code: 200,
    message: "Đăng nhập thành công",
    token: token,
  });
};
//[get] /api/v1/user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại",
    });
    return;
  }
  const otp = generateHelper.generateRandomNumber(8);
  //lưu data vào database
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now(),
  };
  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  //gởi otp qua email user
  const subject = "Mã OTP xác minh";
  const html = `Mã OTP lấy lại mật khẩu là: <b style="color: green;">${otp}</b>. Thời hạn sử dụng là 3 phút.`;
  sendMailHelper.sendMail(email, subject, html);
  res.json({
    code: 200,
    message: "Đã gởi otp qua email",
  });
};
