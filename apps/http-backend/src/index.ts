import  express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("hello from http-backend")
})

app.listen(3001);