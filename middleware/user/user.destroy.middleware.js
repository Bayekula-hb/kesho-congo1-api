const express = require("express");

const userDestroyMiddleware = express();

userDestroyMiddleware.use((req, res, next) => {
    const {id_user} = req.params;

    res.status(200).json({message : "nice user delete"})
});
module.exports = userDestroyMiddleware;