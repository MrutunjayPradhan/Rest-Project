//server part
const express = require("express");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
const path = require("path");
const app = express();

app.set("view engine", "ejs")
app.set("views", path.join((__dirname, "./views")));

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))

app.listen(port, () => {
    console.log("listening to port 8080");
})

//creating the array which will store all our posts

let posts = [
    {
        id: uuidv4(),
        name: "Adi",
        username: "adi",
        content: "Hi i am adi this is my first post "
    },
    {
        id: uuidv4(),
        name: "AppnaCollege",
        username: "appnacollege",
        content: "we are going to lunch our new batch soon "
    },
    {
        id: uuidv4(),
        name: "Rahul",
        username: "rahulkl",
        content: "All the best team india "
    }
]
// Sending response for the posts page
app.get("/posts", (req, res) => {
    res.render("home", { posts });
})

//This is the user interface for Create new post
app.get("/posts/new", (req, res) => {
    res.render("make.ejs");
})

// Adding the new post to the array and redirect to the posts page
app.post("/posts/new", (req, res) => {
    let { name, username, content } = req.body;
    post = {
        id: uuidv4(),
        name,
        username,
        content

    }
    posts.push(post);
    res.redirect("/posts");
})


// Creating the page to view the post in detailed manner 
app.get("/posts/:id", (req, res) => {

    //getting id from the request
    let { id } = req.params;
    // console.log(id);

    // finding the post by id
    let post = posts.find((po) => id === po.id)
    // console.log(post);

    res.render("postview", { post });

})

//New Rout for edit post content

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    // finding the post by id
    let post = posts.find((po) => id === po.id);
    res.render("edit.ejs", { post })

})


// Edit content partially by sending patch request
app.patch("/posts/:id", (req, res) => {
    // deconstructing the the id from the request
    let { id } = req.params;
    // getting the edited content 
    let Ncontent = req.body.content;
    // getting the post from id
    let post = posts.find((po) => id === po.id);
    // replacing content to new content 
    post.content = Ncontent;
    res.redirect("/posts");

})


app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id != p.id);
    res.redirect("/posts");
})