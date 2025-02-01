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
    const user = await prismaClient.user.findFirst({
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
app.post("/room", middleware,async (req, res) => {
    try {

        const parseData = CreateRoomSchema.safeParse(req.body);
        if(!parseData.success){
            res.json({
                msg: "Incorrect format",
                data: parseData.error
            });
            return;
        }
        //@ts-ignore
        const userId = req.userId;

        const room = await prismaClient.room.create({
            data: {
                slug: parseData.data.name,
                adminId: userId
            }
        })
        
        res.status(200).json({
            roomId: room.id
        })
    } catch(error) {
        res.status(500).json({
            msg: "Internal sever error"
        })
    }
});

app.listen(3001);