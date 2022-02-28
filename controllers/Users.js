require('dotenv').config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Insert User DATA
exports.createUser = async(req, res) => {
   // console.log(req.body);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: await bcrypt.hash(req.body.password,8)
    })
    try {
        const userSave = await user.save();
        res.json(userSave)
    } catch (error) {
        console.log(error);
    }
}

//Get Users DATA
exports.getUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.send("error response".error);
    }
}

//Update User DATA
exports.updateUser = async(req, res) => {
    const userUpdate = await User.findOneAndUpdate(req.params.id, req.body, { new: true })
    res.json(userUpdate);
}

//Delete DATA
exports.deleteUser = async(req, res) => {
    try {
        const userDelete = await User.findByIdAndRemove(req.params.id)
        res.json(userDelete)
    } catch (error) {
        console.log(error);
    }
}

exports.loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body
        const user = await User.findOne({email})

        if(!user){
            return res.json({status:'error',error:'wrong Email & Password'})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(passwordCompare){
             // Cookies that have been signed
            const token = jwt.sign(
                {sub:user.email},
                process.env.JWT_ACCESS_SECRET,{ expiresIn:process.env.JWT_ACCESS_TIME}
            )
            res.cookie('token',token);         
            return res.json({user,token:token})

        }else{
            return res.json({ststus:'error',error:'Check the password again'})
        }
    }catch(error){
        console.log(error);
    }
}