const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models/");
const bcrypt = require("bcrypt");

// get , post , put , delete functions will go here for the user
// find all users including their blogs and comments
router.get("/", (req, res) => {
    User.findAll({
        include: [Blog, Comment]
    })
        .then(dbUsers => {
            res.json(dbUsers);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", err });
        });
});

// logout route
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

// get by ID
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id, { include: [Blog, Comment] })
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", err });
        });
});

// sign up post route
router.post("/", (req, res) => {
    // run hook to hash and salt password
    User.create(req.body, { individualHooks: true })
        .then(newUser => {
            req.session.user = {
                id: newUser.id,
                username: newUser.username
            }
            res.json(newUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", err });
        });
});

// login post route
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(foundUser => {
        if (!foundUser) {
            return res.status(400).json({ msg: "incorrect login" })
        }
        // compares pw with the saved hash
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            // if the pw matches, creates session
            req.session.user = {
                id: foundUser.id,
                username: foundUser.username
            }
            return res.json(foundUser)
        } else {
            return res.status(400).json({ msg: "incorrect login" })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", err });
    });
});

// update user by id
router.put("/:id", (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        },
        individualHooks: true
    }).then(updatedUser => {
        res.json(updatedUser);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", err });
        });
});

// delete user by id
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(delUser => {
        res.json(delUser);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", err });
        });
});