import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema, SignInUserSchema, CreateRoomSchema} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello from http-backend")
});

app.post("/signup", async (req, res) => {
    try {
        const parseData = CreateUserSchema.safeParse(req.body);
        if(!parseData.success){
            res.json({
                msg: "Incorrect format",
                data: parseData.error
            });
            return;
        }
    
        const user = await prismaClient.user.create({
            data: {
                email: parseData.data.email,
                password: parseData.data.password,
                name: parseData.data.username
            }
        })
        res.json({
            user
        })
    } catch(error){
        res.status(500).json({
            msg: "Internal sever error"
        })
    }

});
app.post("/signin", async (req, res) => {

    const parseData = SignInUserSchema.safeParse(req.body);
    if(!parseData.success){
        res.json({
            msg: "Incorrect format",
            data: parseData.error
        });
        return;
    }
    const user = await prismaClient.user.findUnique({
        where: {
            email: parseData.data.email,
            password: parseData.data.password
        }
    })
    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET)
    res.json({
        token: token
    })
});
app.post("/room", middleware,(req, res) => {


    res.json({
        roomId: "020"
    })
});

app.listen(3001);