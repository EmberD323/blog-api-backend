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
postRouter.put("/:postid", postController.postUpdate);//done
postRouter.delete("/:postid", postController.postDelete);//done

postRouter.get("/:postid/comments", commentController.allCommentsGet);//done
postRouter.post("/:postid/comments", commentController.newCommentCreate);//done

postRouter.get("/:postid/comments/:commentid", commentController.singleCommentGet);//done
postRouter.put("/:postid/comments/:commentid", commentController.commentUpdate);//done
postRouter.delete("/:postid/comments/:commentid", commentController.commentDelete);//done




module.exports = postRouter;
