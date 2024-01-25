const express = require('express');
const router = express.Router();
const { createPost, getPost, getAllPost, updatePost, deletePost } = require('../controllers/blogController');



router.post('/createpost', createPost)
router.get('/getpost/:id', getPost)
router.get('/getallposts', getAllPost)
router.put('/updatepost/:id', updatePost)
router.delete('/deletepost/:id', deletePost)

module.exports = router