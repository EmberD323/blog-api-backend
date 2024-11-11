const { Router } = require("express");
const indexRouter = Router();
const userController = require("../controllers/userController");

indexRouter.post("/signup", userController.newUserCreate);//done
//indexRouter.get("/login", userController.userGet);
indexRouter.get("/", function (req, res,next) {
    res.redirect("/posts");
})


//login etc


module.exports = indexRouter;
