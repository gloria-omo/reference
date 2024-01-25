const express = require('express');
const router = express.Router();
const { newCommment, getComment, getAllComment, updateComment, deleteComment, getAllPostComment } = require('../controllers/commentController');



router.post('/newcomment', newCommment)
router.get('/getcomment/:id', getComment)
router.get('/getallcomment', getAllComment)
router.put('/updatecomment/:id', updateComment)
router.delete('/deletecomment/:postId/:commentId', deleteComment)
router.get('/getallpostcomment/:id', getAllPostComment)

module.exports = router