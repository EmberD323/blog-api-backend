
const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const verifyToken = require("../middleware/verifyToken");


postRouter.get("/", postController.allPostsGet);
postRouter.post("/",verifyToken, postController.newPostCreate);//protect -done - checked

postRouter.get("/:postid", postController.singlePostGet);
postRouter.put("/:postid",verifyToken, postController.postUpdate);//protect - done -checked
postRouter.delete("/:postid",verifyToken, postController.postDelete);//protect -done

postRouter.get("/:postid/comments", commentController.allCommentsGet);
postRouter.post("/:postid/comments",verifyToken, commentController.newCommentCreate);//protect -done - checked

postRouter.get("/:postid/comments/:commentid", commentController.singleCommentGet);
postRouter.put("/:postid/comments/:commentid",verifyToken, commentController.commentUpdate);//protect - done -checked
postRouter.delete("/:postid/comments/:commentid",verifyToken, commentController.commentDelete);//protect -done -checked




module.exports = postRouter;
