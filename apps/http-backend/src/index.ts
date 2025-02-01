import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { middleware } from "./middleware";

const app = express();

app.get("/", (req, res) => {
    res.send("hello from http-backend")
});

app.post("/signup", (req, res) => {
    

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