
const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

postRouter.get("/", postController.allPostsGet);
postRouter.post("/", postController.newPostCreate);

postRouter.get("/:postid", postController.singlePostGet);
postRouter.put("/:postid", postController.postUpdate);
postRouter.delete("/:postid", postController.postDelete);

postRouter.get("/:postid/comments", commentController.allCommentsGet);
postRouter.post("/:postid/comments", commentController.newCommentCreate);

postRouter.get("/:postid/comments/:commentid", commentController.singleCommentGet);
postRouter.put("/:postid/comments/:commentid", commentController.commentUpdate);
postRouter.delete("/:postid/comments/:commentid", commentController.commentDelete);




module.exports = postRouter;
