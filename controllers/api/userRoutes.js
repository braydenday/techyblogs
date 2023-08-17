const express = require("express");
const router = express.Router();
const {User, Blog, Comment} = require("../../models/");
const bcrypt  = require("bcrypt");

// get , post , put , delete functions will go here for the user