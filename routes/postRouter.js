
const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const verifyToken = require("../middleware/verifyToken");


postRouter.get("/", postController.allPostsGet);
postRouter.post("/",verifyToken, postController.newPostCreate);

postRouter.get("/:postid", postController.singlePostGet);
postRouter.put("/:postid",verifyToken, postController.postUpdate);
postRouter.delete("/:postid",verifyToken, postController.postDelete);

postRouter.get("/:postid/comments", commentController.allCommentsGet);
postRouter.post("/:postid/comments",verifyToken, commentController.newCommentCreate);

postRouter.get("/:postid/comments/:commentid", commentController.singleCommentGet);
postRouter.put("/:postid/comments/:commentid",verifyToken, commentController.commentUpdate);
postRouter.delete("/:postid/comments/:commentid",verifyToken, commentController.commentDelete);




module.exports = postRouter;
