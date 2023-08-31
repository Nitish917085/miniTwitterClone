var jwt = require('jsonwebtoken');
const User = require("../model/User");
const multer = require('multer');
const Post = require('../model/Post');
const Comments = require('../model/Comments');

const userRegistration = async (req, res) => {
    try {
        if (await User.findOne({ userName: req.body.userName }))
            return res.status(201).json({ error: "This username already exist" })
        if (await User.findOne({ email: req.body.email }))
            return res.status(201).json({ error: "This email already registered" })

        const user = await User.create({
            userName: req.body.userName,
            nickName: req.body.nickName,
            email: req.body.email,
            password: req.body.password,
        })
        return res.status(200).json({ error: "You are registered successfully, Please login" })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName }, 'userName password nickName');
        if (!user)
            return res.status(201).json({ error: "Yor are not registered please Register YourSelf" });
        if (user.password != req.body.password)
            return res.status(201).json({ error: "Wrong credentials" })

        const token = jwt.sign({ userName: req.body.userName, password: req.body.password }, process.env.JWT_SECRET)
        return res.status(200).json({ userName: user.userName, nickName: user.nickName, token: token })

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const createPost = async (req, res) => {

    const newPost = await Post.create({
        title: req.body.title,
        image: req.body.imagePath,
        description: req.body.description,
        userName:req.body.userName,
        nickName:req.body.nickName
    });
    res.status(200).json({})

    const updateUserPosts = await User.findOneAndUpdate(
        { userName: req.body.userName },
        { $push: { posts: newPost._id } },
        { new: true }
    );
}

const deletePost = async (req, res) => {

    const deleteUserPosts = await User.findOneAndUpdate(
        { userName: req.body.userName },
        { $pull: { posts: req.body._id } },
        { new: true }
    );

    const deleteUserPostsFromPostSchema = await Post.findByIdAndDelete(req.body._id);
    if (deleteUserPosts)
        return res.status(200).json({})
    return res.status(201).json({})

}

const updatePost = async (req, res) => {

    console.log("upd",req.body)
    const { postId, title, imagePath, description } = req.body;

    const updatedBlog = await Post.findByIdAndUpdate(postId, { title, image: imagePath, description }, { new: true })
        
    res.status(200).json({ tiit: "hi" })
}

const getAllPost = async (req, res) => {

    const posts = await Post.find({})
    res.status(200).json(posts)

}

const followUnfollow= async(req,res)=>{

    console.log("follow",req.body)

    if(!req.body.isFollow){
        const user = await User.findOneAndUpdate(
            { userName: req.body.userName },
            { $push: { following: req.body.followingName } },
            { new: true }
        );
    
        const following = await User.findOneAndUpdate(
            { userName: req.body.followingName },
            { $push: { followers: req.body.userName} },
            { new: true }
        );

    }else{
        const user = await User.findOneAndUpdate(
            { userName: req.body.userName },
            { $pull: { following: req.body.followingName } },
            { new: true }
        );
    
        const following = await User.findOneAndUpdate(
            { userName: req.body.followingName },
            { $pull: { followers: req.body.userName} },
            { new: true }
        );
    }   
    return res.status(200).json({})
}

const followerFollowingList=async(req,res)=>{
    console.log("follwerFolloinf",req.body)
    const followersFollowings = await User.findOne({userName:req.body.userName},'followers following')
    return res.status(200).json(followersFollowings)
}

const getAllPostByUser = async (req, res) => {
    const posts = await User.findOne({ userName: req.body.userName }).populate('posts')
    res.status(200).json(posts)

}

const getPostIdDetails=async(req,res)=>{

    console.log("get",req.body)
    const post = await Post.findById(req.body.postId).populate('comments')

    return res.status(200).json(post)
}

const addComment =async (req,res)=>{

    console.log("cmre",req.body)
    const commentRes = await Comments.create({
        userName:req.body.userName,
        description:req.body.comment
    })

    const post = await Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { comments: commentRes._id} },
        { new: true }
    );

    const updatedPost = await Post.findById(req.body.postId).populate('comments')
    console.log("updpost",updatedPost)
    return res.status(200).json(updatedPost)
}
module.exports = {followUnfollow,addComment,followerFollowingList,getPostIdDetails, userRegistration, getAllPostByUser, userLogin, createPost, deletePost, updatePost, getAllPost };