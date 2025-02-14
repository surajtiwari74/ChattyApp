const {Router} = require("express");
const { register, login, logout, getOtherUser } = require("../controller/user.controller");
const isAuthnticated = require("../middleware/isAuthnticated");

const userRouter = Router();


userRouter.post("/singup",register)
userRouter.post('/login',login)
userRouter.get('/logout',logout)
userRouter.use(isAuthnticated)
userRouter.get('/allUser',getOtherUser);



 module.exports = userRouter;