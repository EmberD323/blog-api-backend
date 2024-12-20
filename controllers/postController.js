const db = require("../prisma/queries.js");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


//post form validation and handling
const validatePost= [
    body("title").trim()
      .escape()
      .isLength({ min: 1, max: 50 }).withMessage(`Title must be between 1 and 50 characters.`),
    body("text").trim()
        .escape()
        .isLength({ min: 1 }).withMessage(`Text must contain text`),
];

async function allPostsGet (req, res) {
    const posts = await db.findAllPosts();
    res.json(posts);
}
newPostCreate = [
    validatePost,
    async function (req, res) {
        jwt.verify(req.token,'lemons',async (err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json(errors.array())
                }
                const user = authData.user;
                const {title,text,publish} = req.body
                await db.createPost(title,text,Boolean(publish),user.id)
                res.sendStatus(200);
            }
            
        })
    }
]

async function singlePostGet (req, res) {
    const postid = Number(req.params.postid);
    const post = await db.findPost(postid);

    if (post == null){
        return res.status(404).json({error:'Post does not exist'})
    }
    res.json(post);
}
postUpdate =[
    validatePost,
    async function (req, res) {
        jwt.verify(req.token,'lemons',async (err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                const postid = Number(req.params.postid);
                const post = await db.findPost(postid);
                if (post == null){
                    return res.status(400).json({error:'Post does not exist'})
                }
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json(errors.array())
                }
                let {title,text,publish} = req.body;
                if(publish == "true"){
                    publish = true;
                  }else{
                    publish = false;
                  }
                await db.udpatePost(title,text,publish,postid);
                res.sendStatus(200);
            }
        })
    }
]

async function postDelete (req, res) {
    jwt.verify(req.token,'lemons',async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            const postid = Number(req.params.postid);
            await db.deletePost(postid);
            res.sendStatus(200);
        }
    })
    
}


module.exports = {
    allPostsGet,
    newPostCreate,
    singlePostGet,
    postUpdate,
    postDelete
  
};