const Post = require("../models/Post");
const User = require("../models/User");

//Insert DATA
exports.createPost = async(req, res) => {
    const post = new Post({
        createBy: req.body.createdBy,
        message: req.body.message,
        comments: req.body.comments
    })
    try {
        const postsave = await post.save();
        res.json(postsave)
    } catch (error) {
        console.log(error);
    }
}

//Get DATA
exports.getPosts = async(req, res) => {
    try {
        const posts = await Post.find().populate("users").exec((err, posts) =>{
            if (err) throw err;
        
            var getUser = [];
            posts.forEach(function(post) {
                post.users.forEach(function(user) {
                    getUser.push(user.name);
                });
            });
        
            res.send(getUser); 
        });
        res.json(posts);
    } catch (error) {
        res.send("error response".error);
    }
}

//Update DATA
exports.updatePost = async(req, res) => {
    const postUpdate = await Post.findOneAndUpdate(req.params.id, req.body, { new: true })
    res.json(postUpdate);
}

//Delete DATA
exports.deletePost = async(req, res) => {
    try {
        const postDelete = await Post.findByIdAndRemove(req.params.id)
        res.json(postDelete)
    } catch (error) {
        console.log(error);
    }
}