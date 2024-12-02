const md5 = require("md5");
const User = require("../models/user.model");
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
