const { Router } = require("express");
const indexRouter = Router();
const userController = require("../controllers/userController");
const passport = require("passport");

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};

indexRouter.post("/signup", userController.newUserCreate);
indexRouter.post('/login',
    passport.authenticate('local', { failureRedirect: '/'}),
    function(req, res) {
      res.redirect('/');
});
//logout
indexRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
        return next(err);
        }
        res.redirect("/");
    });
});

indexRouter.get("/", function (req, res) {
    //temp
    console.log(req.user)
    res.json(req.user);
})


//login etc


module.exports = indexRouter;
