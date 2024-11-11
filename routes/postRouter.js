//GET,POST,UPDATE,DELETE
// GET /posts 
//GET /posts/:postid
//GET /posts/:postid/comments
// GET /posts/:postid/comments/:commentid
const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

postRouter.get("/", postController.allPostsGet);//done
postRouter.post("/", postController.newPostCreate);//done

postRouter.get("/:postid", postController.singlePostGet);//done
postRouter.put("/:postid", postController.postUpdate);
postRouter.delete("/:postid", postController.postDelete);

postRouter.get("/:postid/comments", commentController.allCommentsGet);
postRouter.post("/:postid/comments", commentController.newCommentCreate);

postRouter.get("/:postid/comments/:commentid", commentController.singleCommentGet);
postRouter.put("/:postid/:commentid", commentController.commentUpdate);
postRouter.delete("/:postid/:commentid", commentController.commentDelete);




module.exports = postRouter;
