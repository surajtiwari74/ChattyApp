const { profile } = require("console");
const User = require("../model/user.model");
const { createHmac, randomBytes } = require("crypto");
const jwt = require("jsonwebtoken");
async function register(req, res) {
  try {
     
    const { fullName, username, password,  gender } = req.body;
    if (!fullName || !username || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username already exit try different" });
    }
    // profilePhoto
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      fullName,
      username,
      password,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    console.log(req.body)
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All filed are required " });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is worng", success: false });
    }
    const hashedPassword = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");
    if (hashedPassword !== user.password) {
      return res
        .status(400)
        .json({ message: "Username or password is worng", success: false });
    }
    const payload = {
      fullName:user.fullName,
      username:user.username,
      _id:user._id,
      profilePhoto:user.profilePhoto,
      gender:user.gender
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: "Login successfully", success: true,payload });
  } catch (error) {
    console.log(error)
    if ((error.type = "validation")) {
      return res
        .status(400)
        .json({ message: "Validation error", success: false });
    }
    return res
      .status(500)
      .json({ message: "internal service error", success: false });
  }
}

async function logout(req,res)
{
    try {
        res.status(200).cookie("token","").json({message:"Logout successfully ",success:true})
    } catch (error) {
        
    }
}

async function getOtherUser(req,res)
{
   
        try {
            const loggedInUserId = req.id;
            const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
            return res.status(200).json(otherUsers);
        } catch (error) {
            console.log(error);
        }
    
}

module.exports ={
    login,
    logout,
    getOtherUser,
    register
}