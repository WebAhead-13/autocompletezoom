const express = require("express");
const cookieParser=require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET =process.env.SECRET;

const server = express();

server.use(cookieParser());
server.use(express.urlencoded());


server.listen(3000,()=>{
    console.log("Server listening on http:localhost:3000");
})

server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

server.use((req, res, next) => {
  const token = req.cookies.user;
  console.log(token)
  if (token) {
    const user = jwt.verify(token, SECRET);
    req.user = user;
  }
  next();
});

function checkAuth(req, res, next) {
  const user = req.user;
  if (!user) {
    res.status(401).send(`
      <h1>Please log in to view this page</h1>
      <a href="/log-in">Log in</a>
    `);
  } else {
    next();
  }
}

server.get("/",(req,res) =>{
    const user=req.user;
    console.log(user)
    if (user) { 
        // res.send(`<h1>Hello ${user.email}</h1><a href="/log-out">Log out</a>`);
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <link rel="stylesheet" href="styleHome.css">
        
        </head>
        <body>
          <div class="topnav">
            <a class="active" href="/">Home</a>
            <a href="/search">Search</a>
            <h3 style="display:inline; color:#04AA6D; margin-left:600px; margin-top:10px;">You Are Connected as: ${user.email} </h3>
            <a href="/log-out">Log out</a>


          </div>
          
          
        </body>
        </html>`);
      } else {
        // res.send(`<h1>Hello world</h1><a href="/log-in">Log in</a>`);
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <link rel="stylesheet" href="styleHome.css">
        
        </head>
        <body>
          <div class="topnav">
            <a class="active" href="/">Home</a>
            <a href="/search">Search</a>
            <a href="/log-in">Log in</a>
          </div>
          
        </body>
        </html>`);
      }
})

server.get("/log-in", (req, res) => {
    res.send(`
      <h1>Log in</h1>
      <form action="/log-in" method="POST">
        <label for="email">Email</email>
        <input type="email" id="email" name="email">
      </form>
    `);
  });

  server.post("/log-in", (req, res) => {
    const email = req.body.email;
    const token = jwt.sign({ email }, SECRET);
    res.cookie("user", token, { maxAge: 600000 });
      res.redirect("/");

  })

  server.get("/search",checkAuth, (req, res) => {
    // add if.. else to check cookies AUTH
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="styleSearch.css">
    </head>
    <body>
        
    <h2>Autocomplete</h2>
    
    <p>Start typing:</p>
    
    <form autocomplete="off" action="/action_page.php">
      <div class="autocomplete" style="width:300px;">
        <input id="myInput" type="text" name="myCountry" placeholder="Country">
      </div>
      <input type="submit">
    </form>
    </body>
    </html>
  `);
    
  })

  server.get("/log-out",(req,res)=> { 
    res.clearCookie("user")
    res.redirect("/")

})

  server.use(express.static("public1"));



  

