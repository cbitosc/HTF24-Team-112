import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors'; 
import UserModel from "./models/user";
dotenv.config();
mongoose.connect(process.env.mongourl,(err)=>{
    if (err) throw err;
});
const jwtsecret=process.env.jsonwebtoken;
const app=express();
app.use(express.json())
app.use(cors({credentials:true,origin:process.env.client_url}));
app.get('/test',(req,res)=>{res.json("test ok")});

app.post('/register', async (req, res) => {
    const { username, password } = req.body; 
    try {
        const createdUser = await UserModel.create({ username, password });
        jwt.sign({ userId: createdUser._id }, jwtsecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json({
                _id:createdUser._id,
            };
        });
    } catch (err) {
        if (err) throw err;
        res.status(500).json('error');
    }
});

app.listen(5000);