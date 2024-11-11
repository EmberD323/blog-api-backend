const db = require("../prisma/queries.js");
const { body, validationResult } = require("express-validator");

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
    async function newPostCreate (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        //temp todo:update
        const userid=1;
        const {title,text} = req.body
        await db.createPost(title,text,userid)
        res.redirect("/posts")
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
async function postUpdate (req, res) {
}
async function postDelete (req, res) {
}


module.exports = {
    allPostsGet,
    newPostCreate,
    singlePostGet,
    postUpdate,
    postDelete
  
};