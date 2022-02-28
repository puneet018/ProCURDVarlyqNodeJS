const express = require("express");
const { cookie } = require("express/lib/response");
const router = express.Router();
const PostsController = require("../controllers/Posts");
const UserController = require("../controllers/Users");
const jwt = require("jsonwebtoken");

router.get('/', (req, res) => {
    res.send("hello Bharat")
})

//for loggedIn Operation
router.post('/users/login', UserController.loginUser);

//for Users CURD Operations
router.post('/users/create', UserController.createUser);
router.get('/users', UserController.getUsers);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

//for Posts CURD Operations
router.post('/posts/create', PostsController.createPost);
router.get('/posts', verifyToken, PostsController.getPosts);
router.put('/posts/:id', PostsController.updatePost);
router.delete('/posts/:id', PostsController.deletePost);

function verifyToken(req,res,next){
    var cookieToken = req.cookies.token;
     try{
        //const token = req.headers['x-access-token']
        const decoded = jwt.verify(cookieToken,process.env.JWT_ACCESS_SECRET)
        req.useData = decoded;
        next();
    }catch(error){
        console.log(error)
        return res.status(401).json({status:false,message:'Session is Expired',data:error})
    }
}

module.exports = router;