const User = require("./User"); // error on this line???
const Blog = require("./Blog");
const Comment = require("./Comment");

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {
    User,
    Blog,
    Comment
}