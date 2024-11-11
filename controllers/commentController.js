const db = require("../prisma/queries.js");
const { body, validationResult } = require("express-validator");

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
        const userid=1;
        console.log(postid)
        const {text} = req.body
        console.log(req.body)
        await db.createComment(text,postid,userid);
        res.redirect("/posts/"+postid+"/comments")
    }
]

async function singleCommentGet (req, res) {
}
async function commentUpdate (req, res) {
}
async function commentDelete (req, res) {
}

module.exports = {
    allCommentsGet,
    newCommentCreate,
    singleCommentGet,
    commentUpdate,
    commentDelete
  
};