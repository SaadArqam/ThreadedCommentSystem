const express = require("express");
const route = express.Router();
const { postComment, getComment, addLike, getUser ,deleted} = require("./controller");

// Routes
route.post("/comments", postComment);       // post main comment or reply
route.get("/comments", getComment);         // get all comments
route.patch("/comments/:id/like", addLike); // like a comment
route.delete("/comments",deleted)

// User
route.get("/user", getUser); // returns the hardcoded user info

module.exports = route;
