const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");

// find all comments route
router.get("/", (req, res) => {
  Comment.findAll({ include: [User, Blog] })
    .then(dbComments => {
      res.json(dbComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});
// find one comment by id pk
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id, { include: [User, Blog] })
    .then(dbComment => {
      res.json(dbComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});

// create new comment post
router.post("/", (req, res) => {
  // if user is not logged in to create a blog post, throw error
  if (!req.session.user) {
    return res.status(401).json({ msg: "enter login info" })
  }
  Comment.create({
    body: req.body.body,
    userId: req.session.user.id,
    blogId: req.body.blogId
  })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});

// update comment
router.put("/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "enter login info" })
  }
  Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedComment => {
    res.json(updatedComment);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});

// delete comment
router.delete("/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "enter login info" })
  }
  Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(delComment => {
    res.json(delComment);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});

module.exports = router;