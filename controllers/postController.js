const db = require("../prisma/queries.js");
const { body, validationResult } = require("express-validator");

//sign up validation and handling
const validatePost= [
    body("title").trim()
      .escape()
      .isLength({ min: 1, max: 50 }).withMessage(`Title must be between 1 and 50 characters.`),
    body("text").trim()
        .escape()
        .isLength({ min: 1 }).withMessage(`Text must contain text`),
];
async function allPostsGet (req, res) {
    const posts = await db.findAllPosts(req.params.folderName,req.user);
    res.json(posts);
}

newPostCreate = [
    validatePost,
    async function newPostCreate (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        //temp
        const userid=1;
        const {title,text} = req.body
        await db.createPost(title,text,userid)
        res.redirect("/posts")
    }
]
async function singlePostGet (req, res) {
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