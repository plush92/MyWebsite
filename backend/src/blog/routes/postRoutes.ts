import { Router } from 'express';
import * as postController from '../controllers/postController';

const router = Router();

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById); // optional: get a single post
router.put('/:id', postController.updatePost);  // optional: update a post
router.delete('/:id', postController.deletePost); // optional: delete a post

export default router;