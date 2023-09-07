const express = require('express');
const router = express.Router();

// will use blog routes from api folder
const blogRoutes = require("./api/blogRoutes");
router.use("/api/blogs", blogRoutes)

// uses user routes from api folder
const userRoutes = require("./api/userRoutes.js");
router.use("/api/users", userRoutes)

// will use comment routes from api folder
const commentRoutes = require("./api/commentRoutes");
router.use("/api/comments", commentRoutes)

const frontEnd = require("./frontendRoutes");
router.use("/", frontEnd)

router.get("/showsessions", (req, res) => {
    res.json(req.session)
})

module.exports = router;