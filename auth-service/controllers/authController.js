const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name, email, hashedPassword, role
        })

        res.status(201).json({
            message: "new user registered successfully"
        })
    } catch (error){
        console.log("error in auth", error);
        res.status(500).json({
            error: "There was a server error in auth services"
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({
            email
        })
        if(!user){
            return res.status(400).json({
                message : "The user does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.hashPassword);
        if(!isMatch){
            return res.status(400).json({
                message: "invalid credentials"
            })
        }
        const token = jwt.sign({
            id:user._id,
            role: user.role 
        }, JWTSECRET, {
            expiresIn: '1h'
        })
        res.status(200).json({
            message: "login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    }catch(error){
        console.log('There was an error in login service'),
        res.status(500).json({
            error: "There was a server error in login service"
        })
    }
}