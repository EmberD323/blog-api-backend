const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", function (req, res,next) {
    res.send("Hi");
    next()
})



module.exports = indexRouter;
