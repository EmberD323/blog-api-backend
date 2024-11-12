const { Router } = require("express");
const indexRouter = Router();
const userController = require("../controllers/userController");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

indexRouter.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
indexRouter.use(passport.session());
//on auth

indexRouter.post("/signup", userController.newUserCreate);//done
indexRouter.get("/login", userController.userGet);
indexRouter.get("/", function (req, res,next) {
    res.redirect("/posts");
})


//login etc


module.exports = indexRouter;
