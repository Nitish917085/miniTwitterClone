const { userRegistration, userLogin, createPost, updatePost, deletePost, getAllPost, getAllPostByUser, followUnfollow, followerFollowingList, getPostIdDetails, addComment } = require("../controllers/user");
const router = require("express").Router();
const multer =require('multer');
const { verifyTokenAutoLogin, verifyToken } = require("../middleware/tokenAuth");

const storage = multer.diskStorage({
    destination: 'uploads/', 
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post('/userRegistration',userRegistration)
router.post('/userLogin',verifyTokenAutoLogin, userLogin)

router.post('/createPost',upload.single('image'),verifyToken,createPost)
router.post('/updatePost',upload.single('image'),verifyToken,updatePost)
router.post('/deletePost',verifyToken,deletePost)
router.post('/getAllPost',verifyToken,getAllPost)
router.post('/getAllPostByUser',verifyToken,getAllPostByUser)
router.post('/followUnfollow',followUnfollow)
router.post('/getFollowerFollowingList',followerFollowingList)
router.post('/getPostDetails',getPostIdDetails)
router.post('/addComment',addComment)


module.exports = router;
