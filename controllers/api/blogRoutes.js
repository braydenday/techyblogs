const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");

// find all blogs route
router.get("/", (req, res) => {
  Blog.findAll({ include: [User, Comment] })
    .then(dbBlogs => {
      res.json(dbBlogs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});
// find one blog by id pk
router.get("/:id", (req, res) => {
  Blog.findByPk(req.params.id, { include: [User, Comment] })
    .then(dbBlog => {
      res.json(dbBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});

// create new blog post
router.post("/", (req, res) => {
  // if user is not logged in to create a blog post, throw error
  if (!req.session.user) {
    return res.status(401).json({ msg: "enter login info" })
  }
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.session.user.id
  })
    .then(newBlog => {
      res.json(newBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});

// update blog post
router.put("/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "enter login info" })
  }
  Blog.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedBlog => {
    res.json(updatedBlog);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});

// delete blog post
router.delete("/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "enter login info" })
  }
  Blog.destroy({
    where: {
      id: req.params.id
    }
  }).then(delBlog => {
    res.json(delBlog);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});


module.exports = router;