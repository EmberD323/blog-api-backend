const { Router } = require("express");
const indexRouter = Router();
const userController = require("../controllers/userController");


indexRouter.post("/signup", userController.newUserCreate);
indexRouter.post('/login', userController.logIn);
//logout
indexRouter.get("/logout", (req, res, next) => {
    res.json("logged out")
});

indexRouter.get("/", function (req, res) {
    res.json("home")
})

module.exports = indexRouter;
