const express = require("express");
const { PostModel } = require("../models/posts");
const { authenticator } = require("../middleware/authentication")



const postRoute = express.Router();
postRoute.use(express.json());



postRoute.get("/", async (req, res) => {
    try {
        let data = await PostModel.find();
        res.send(data);
    } catch (error) {
        res.send({ "message": "error while getting posts" });
    }
})


postRoute.post("/add", async (req, res) => {
    let new_data = req.body;
    try {
        let data = new PostModel(new_data);
        await data.save();
        res.send(data);
    } catch (error) {
        res.send({ "message": "error while posting your post" });
    }
})

postRoute.patch("/update", async (req, res) => {
    let { _id } = req.body;
    let new_data = req.body;
    try {
        let data = new PostModel.findByIdAndUpdate({ "_id": _id }, new_data);
        res.send({ "message": "Post Updated" });
    } catch (error) {
        res.send({ "message": "error while updating your post" });
    }
})
postRoute.delete("/delete", async (req, res) => {
    let { _id } = req.body;
    try {
        let data = new PostModel.findByIdAndDelete({ "_id": _id });
        res.send({ "message": "post deleted" });
    } catch (error) {
        res.send({ "message": "error while deleting your post" });
    }
})


module.exports = { postRoute }