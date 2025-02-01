import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema, SignInUserSchema, CreateRoomSchema} from "@repo/common/types";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello from http-backend")
});

app.post("/signup", (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            msg: "Incorrect format",
            data: data.error
        });
        return;
    }
    res.json({
        email: data.data.email,
        username: data.data.username,
        password: data.data.password
    })

});
app.post("/signin", (req, res) => {

    const userId = 1;
    const token = jwt.sign({
        userId
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