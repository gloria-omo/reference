const blogModel = require('../models/blogModel')
const commentModel = require('../models/commentModel')

exports.createPost = async (req, res) =>{
    try{
      const {title, content } = req.body

        const post = await blogModel.create({
            title,
            content
        })

        if(!post){
            return res.status(403).json({
                message: `Error creating post`
            })
        }

        res.status(201).json({
            message: `You have successfully created a post`,
            data: post
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getPost = async (req, res) =>{
    try{
        const id = req.params.id

        const blog = await blogModel.findById(id).populate('comments');

        if(!blog){
            return res.status(404).json({
                message: `Post with this ID not found`
            })
        }
        res.status(200).json({
            message: `Post fetched successfully`,
            data: blog
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getAllPost = async (req, res) =>{
    try{
        const blog = await blogModel.find().populate('comments');

        if(blog.length === 0){
            return res.status(404).json({
                message: `There are no Posts present here`
            })
        }
        res.status(200).json({
            message: `Posts fetched successfully. There are ${blog.length} posts here`,
            data: blog
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

exports.updatePost = async (req, res) =>{
    try{
        const id = req.params.id

        const {title, content} = req.body

        const update = await blogModel.findByIdAndUpdate(id, {
            title, content
        }, {new: true}).populate('comments')

        if(!update){
            return res.status(404).json({
                message: `Post not found`
            })
        }
        res.status(200).json({
            message: `Post updated successfully`,
            data: update
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}



exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        // Find all comments related to the post
        const commentsToDelete = await commentModel.find({ post: postId });

        // Delete all related comments
        await commentModel.deleteMany({ post: postId });

        // Delete the post
        const deletedBlog = await blogModel.findByIdAndDelete(postId);

        if (!deletedBlog) {
            return res.status(404).json({
                message: `Post ID not found to be deleted`
            });
        }

        res.status(200).json({
            message: `Post and associated comments deleted successfully`,
            data: {
                deletedBlog,
                deletedComments: commentsToDelete,
            }
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
