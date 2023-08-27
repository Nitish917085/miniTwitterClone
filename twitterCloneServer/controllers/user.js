var jwt = require('jsonwebtoken');
const User = require("../model/User");


const userRegistration = async (req, res) => {
    try {
        if (await User.findOne({ userName: req.body.userName }))
            return res.status(201).json({ error: "This username already exist" })
        if (await User.findOne({ email: req.body.email }))
            return res.status(201).json({ error: "This email already registered" })

        const user = await User.create({
            userName: req.body.userName,
            nickName:req.body.nickName,
            email:req.body.email,
            password: req.body.password,
        })
       return res.status(200).json({error:"You are registered successfully, Please login"})
    } catch (err) {
       return res.status(500).json({ error: err })
    }
}

const userLogin = async(req,res)=>{
    try {
        const user = await User.findOne({userName:req.body.userName},'userName password nickName');
        if(!user) 
           return res.status(201).json({ error: "Yor are not registered please Register YourSelf" });
        if(user.password != req.body.password)
          return res.status(201).json({error:"Wrong credentials"}) 

        const token= jwt.sign({userName:req.body.userName,password:req.body.password},process.env.JWT_SECRET)    

        return res.status(200).json({userName:user.userName,nickName:user.nickName,token:token})        
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


 
module.exports = {userRegistration,userLogin};