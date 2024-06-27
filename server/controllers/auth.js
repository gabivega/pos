import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// REGISTER CONTROLLER

export const register = async (req, res) => {
    try {
        const { email, password} = req.body
        console.log(req.body);
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new User({
            email,
            password: passwordHash
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        if (error.code == 11000) {    
            console.log(error);        
            res.status(409).json(error)
        }
        else {
        console.log(error);
        res.status(500).json({ error : error.message})}
    }
}

// LOGIN CONTROLLER
export const login = async (req,res) => {
    try {
        const {email,password} = req.body
        console.log("procesando acceso...");
        console.log(req.body);
        const user = await User.findOne( { email : email })
        if(!user) return res.status(400).json({ msg : "Mail no registrado"})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Credenciales invalidas"})

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        let userObject = user.toObject()
        delete userObject.password;
        console.log(user);
        res.status(200).json({ token, userObject})

    } catch (err) {
        res.status(500).json({ error: err})
    }
};
