// html elements from ID using query selector
var existingBlogs = document.querySelector("#existingblogs")
var createNew = document.querySelector("#createNew")
var newPost = document.querySelector("#newpost")
var newBlog = document.querySelector('#newBlog')

// hide create new blog section
function hideCreateNew() {
    createNew.hidden = true;
}
hideCreateNew();

// submit new post listener
newPost.addEventListener("submit", event => {
    event.preventDefault()
    console.log('click')
    existingBlogs.hidden = true;
    newPost.hidden = true;
    createNew.hidden = false;
});

// submit new blog listener
newBlog.addEventListener("submit", event => {
    var title = document.querySelector("#title").value;
    var content = document.querySelector("#content").value
    event.preventDefault()
    console.log('done!')
    if (!title || !content) {
        alert('error - enter title and text')
        return;
    }
    const blogObj = {
        title: title,
        content: content,
    }
    fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify(blogObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            createNew.setAttribute("hidden", "false")
            location.reload()
        } else {
            alert("error")
        }
    })
})