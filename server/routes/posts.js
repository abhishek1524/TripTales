import express from 'express';
import { getPostsBySearch, getPosts, getPost, createPost,updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();//setting up router

//start adding routes

router.get('/search',getPostsBySearch); 
router.get('/:id', getPost);
router.get('/',getPosts);       // https://localhost:5000/posts (/posts come here from index.js where we connect it with our application through express.)
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
export default router;


