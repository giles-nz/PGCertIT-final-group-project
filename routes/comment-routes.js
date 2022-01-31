const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const commentDao = require("../modules/comment-dao.js");

router.post("/commentUpload", async function(req, res) {

    const message = req.body.content;
    console.log(message);
});

module.exports = router;