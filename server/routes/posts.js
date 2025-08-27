import { Router } from 'express';
import {
  getPostById,
  getPosts,
  createPost,
  updatePost,
  likePost,
  deletePost,
  getPostsBySearch,
  commentPost,
} from '../controllers/posts.js';
import auth from '../middleware/auth.js';
const router = Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/comment-post', commentPost);
export default router;
