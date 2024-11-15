const { Router } = require("express");
const indexRouter = Router();
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

indexRouter.post("/signup", userController.newUserCreate);
indexRouter.post('/login', userController.logIn);
//logout
indexRouter.get("/logout", (req, res, next) => {
    //finish on front end
    res.json("logged out")
});
indexRouter.get('/users', userController.getAllUsers);
indexRouter.get("/",verifyToken, function (req, res) {
    res.redirect("/posts");
})

module.exports = indexRouter;
