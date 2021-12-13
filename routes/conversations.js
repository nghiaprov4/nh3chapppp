const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

router.post("/", async(req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const conversations = await Conversation.findById(req.params.id);
        // if (Conversation.userId === req.body.userId) {
        await Conversation.deleteOne();
        //     res.status(200).json("the post has been deleted");
        // } else {
        //     res.status(403).json("you can delete only your post");
        // }
    } catch (err) {
        res.status(500).json(err);
    }
});
//get conv of a user

router.get("/:userId", async(req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async(req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;