import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user_model";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "no-jwt-secret-key";

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;

        // Check if User Exists or Not
        const user = await User.findOne({email});
        if (!user) {
            res.status(400).json({message: "Invalid Credentials, Email Not Found"});
            return
        }

        // Validation Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({message: "Invalid Credentials, Incorrect Password"});
            return
        }

        // Generate JWT (JSON WEB TOKEN)
        const token = jwt.sign({
            id: user._id,
            email: user.email,
        }, JWT_SECRET_KEY, {
            expiresIn: "1d" 
        })
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        console.log("Signin Error:", error);
        res.status(500).json({message: "Internal Server Error"});
        return
    }
};

export const initiateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password, name} = req.body;
        
        // Check if user data / entry is exists
        const count = await User.countDocuments({});
        if (count > 0) {
            res.status(400).json({
                message: "Admin is already exists, We can only have one admin",
            })
            return
        } 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            name,
        })

        await newUser.save();
        res.status(201).json({message: "Admin Created Successfully"})
    } catch (error) {
        console.log("Initiate New Admin Error:", error);
        res.status(500).json({message: "Internal Server Error"});
        return
    }
}

 