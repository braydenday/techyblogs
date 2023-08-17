const express = require('express');
const router = express.Router();

// uses user routes from api folder
const userRoutes = require("./api/userRoutes.js");
router.use("/api/users",userRoutes)

// will use blog routes from api folder

// will use comment routes from api folder