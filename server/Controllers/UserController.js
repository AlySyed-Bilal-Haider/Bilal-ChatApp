import userModal from "../Modals/Modaluser.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
///////////////Create new user and save in Mongo Database///////////////////
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
      res
        .send(400)
        .json({ status: "error", message: "Please add complete form !" });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const existUser = await userModal.findOne({ email });
    if (existUser) {
      return res.status(201).json({
        status: "error",
        message: "user already exist ! !",
      });
    }
    const user = await userModal.create({
      name,
      email,
      password: passwordHash,
      // pic,
    });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        status: "ok",
        message: "user add successfully !",
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "User not save!",
      });
    }
  } catch (error) {
    console.log("error user create", error);
    next();
  }
};
//////////////////check user is exist in database or not , login handler/////////////////
const privateKey = "chatapp";
export const loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("request for login !", req.body);
    const islogin = await userModal.findOne({ email });
    const token = Jwt.sign({ id: islogin._id }, privateKey);
    if (islogin) {
      const matchpassword = await bcrypt.compare(password, islogin.password);
      if (matchpassword) {
        res.status(200).json({
          message: "user login success",
          status: "ok",
          token,
        });
      } else {
        res.status(201).json({
          message: "Please enter valid password",
          status: "error",
        });
      }
    } else {
      res.status(201).json({
        message: "Please enter valid email",
        status: "error",
      });
    }
  } catch (error) {
    console.log(" login error", error);
    next();
  }
};
/////////////////////Token verfiy of user start here//////////////
export const tokenverfiy = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("token verfiy:", token);
  try {
    if (token) {
      var decoded = Jwt.verify(token, privateKey);
      if (decoded.id) {
        const user = await userModal
          .findOne({ _id: decoded.id })
          .select("-password");
        if (user) {
          res.status(200).json({
            status: "ok",
            name: user?.name,
            userid: user?._id,
          });
        }
      } else {
        res.status(201).json({
          status: "error",
          message: " invaild token",
        });
      }
    } else {
      res.status(201).json({
        status: "error",
        message: "NO token, No autherizations",
      });
    }
  } catch (error) {
    console.log(" token error", error);
    next();
  }
};
