const express = require("express");
const route = express.Router();
const { postComment, getComment, addLike, getUser ,deleted} = require("./controller");

route.post("/comments", postComment);
route.get("/comments", getComment);
route.patch("/comments/:id/like", addLike);
route.delete("/comments",deleted)

route.get("/user", getUser);

module.exports = route;
