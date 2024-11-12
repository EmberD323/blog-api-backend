const { Router } = require("express");
const indexRouter = Router();
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");


indexRouter.post("/signup", userController.newUserCreate);
indexRouter.post('/login', userController.logIn);
//logout
indexRouter.get("/logout", (req, res, next) => {
    res.json("logged out")
});

indexRouter.get("/",verifyToken, function (req, res) {
    jwt.verify(req.token,'lemons',(err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json(authData)
        }
    })
    
})
//dont actually want to protect above. dont need to logged in.
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}
module.exports = indexRouter;
