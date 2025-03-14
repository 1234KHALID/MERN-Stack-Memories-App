import { Router } from "express";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";
const router = Router();

router.get('/:id', getPost);
router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
export default router;
