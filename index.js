const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "gouriingale",
        content: "I love coding!",
    },
    {
        id: uuidv4(),
        username: "abcdef",
        content: "Hard work is important to achieve success!",
    },
    {
        id: uuidv4(),
        username: "shraddhakhapra",
        content: "I got selected for my first internship!",
    }
];

// Root Route
app.get("/", (req, res) => {
    res.send("Server working well!");
});

// Show All Posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

// New Post Form
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Create New Post
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4(); // Generate a unique ID
    posts.push({ id, username, content });
    res.redirect("/posts");
});

// Show a Single Post
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id); // Fixed ID comparison
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs", { post });
});

// Edit Post Form
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id); // Fixed ID comparison
    res.render("edit.ejs", { post }); // Ensure object is passed correctly
});

// Update Post
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id); // Fixed ID comparison
    post.content = newContent;
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let{id} = req.params;
    posts = posts.filter((p)=>p.id !== id);
    res.redirect("/posts");
});
// Start Server
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
