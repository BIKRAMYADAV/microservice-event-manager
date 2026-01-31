const bcrypt = require('bcrypt')
const User = require('../models/User')

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