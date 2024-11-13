const db = require("../prisma/queries.js");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


//comment form validation and handling
const validateComment= [
    body("text").trim()
        .escape()
        .isLength({ min: 1, max: 1000 }).withMessage(`Text must be between 1 and 1000 characters.`),
];
async function allCommentsGet (req, res) {
    const postid = Number(req.params.postid);
    const post = await db.findPost(postid);
    if (post == null){
        return res.status(404).json({error:'Post does not exist'})
    }
    const comments = await db.findAllComments(postid);
    res.json(comments);
}
newCommentCreate = [
    validateComment,
    async function  (req, res) {
        jwt.verify(req.token,'lemons',async (err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                const postid = Number(req.params.postid);
                const post = await db.findPost(postid);
                if (post == null){
                    return res.status(404).json({error:'Post does not exist'})
                }
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json(errors.array())
                }
                //temp todo:update
                const user = authData.user;
                const {text} = req.body
                await db.createComment(text,postid,user.id);
                res.sendStatus(200);
            }
        })
    }
]
async function singleCommentGet (req, res) {
    const postid = Number(req.params.postid);
    const post = await db.findPost(postid);
    if (post == null){
        return res.status(404).json({error:'Post does not exist'})
    }
    const commentid = Number(req.params.commentid);
    const comment = await db.findComment(commentid,postid);
    if (comment == null){
        return res.status(404).json({error:'Comment does not exist'})
    }
    res.json(comment);

}
commentUpdate =[
    validateComment,
    async function (req, res) {
        jwt.verify(req.token,'lemons',async (err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                const postid = Number(req.params.postid);
                const post = await db.findPost(postid);
                if (post == null){
                    return res.status(404).json({error:'Post does not exist'})
                }
                const commentid = Number(req.params.commentid);
                const comment = await db.findComment(commentid,postid);
                if (comment == null){
                    return res.status(404).json({error:'Comment does not exist'})
                }
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json(errors.array())
                }
                const {text} = req.body;
                await db.udpateComment(text,commentid);
                res.sendStatus(200);    
            }
        })
        
    }
]
async function commentDelete (req, res) {
    jwt.verify(req.token,'lemons',async (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            const postid = Number(req.params.postid);
            const post = await db.findPost(postid);
            if (post == null){
                return res.status(404).json({error:'Post does not exist'})
            }
            const commentid = Number(req.params.commentid);
            const comment = await db.findComment(commentid,postid);
            if (comment == null){
                return res.status(404).json({error:'Comment does not exist'})
            }
            await db.deleteComment(commentid);
            res.sendStatus(200);  
        }
    })
    
}

module.exports = {
    allCommentsGet,
    newCommentCreate,
    singleCommentGet,
    commentUpdate,
    commentDelete
  
};