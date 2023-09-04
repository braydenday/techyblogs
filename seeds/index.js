const sequelize = require("../config/connection")
const {User,Blog,Comment} = require("../models")

const users = [
    {
        username: "brayden",
        password: "pw1"
    },
    {
        username: "austin",
        password: "pw2"
    },
    {
        username: "jason",
        password: "pw3"
    },

]

const blogs = [
    {
        title: "My first post",
        content: "I learned how to code a frontend",
        userId: 1
    },
    {
        title: "My second post",
        content: "I learned how to code a backend",
        userId: 1
    },
    {
        title: "Austin's first post",
        content: "hello everyone",
        userId: 2
    },
    {
        title: "Jason's first post",
        content: "hi guys",
        userId: 3
    },
]

const comments = [
    {
        body: "its great knowledge to have!",
        blogId: 1,
        userId: 1
    },
    {
        body: "sure is!",
        blogId: 3,
        userId: 2
    },
    {
        body: "welcome!",
        blogId: 4,
        userId: 1
    },
    {
        body: "Also, really great knowledge to have!",
        blogId: 2,
        userId: 3
    },

]

const plantSeeds = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

plantSeeds()