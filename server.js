require("dotenv").config(); // using .env file
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const get = require("./router/get");
const post = require("./router/post");
const form = require("./router/form")
const authorization = require("./router/authorization");
const property = require('./router/property_tax')
const PORT = process.env.PORT|| 3000;
const app = express();

// mongoconnect(process.env.MONGOID) // MAKING CONECTION WITH THE DATA BASE

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Route Definitions
app.use("/submit", post);
 // This will handle all routes

app.use("/auth", authorization); // This is for Sign up and Sign in
app.use("/property",property);
app.use("/form",form);

app.use("/", express.static(path.join(__dirname, "public/home")));
app.use("/",get);



app.all("*",(req,res)=>{
  res.status(404).sendFile(path.join(__dirname, "public", "404", "index.html"));
})
//connection mongo db
mongoose
  .connect(process.env.MONGOID)
  .then(() => console.log("Mongo db conected"))
  .catch((err) => console.log(` error : ${err}`));

app.listen(PORT, () => {
  console.log(`The Server is Running in http://localhost:${PORT}/`);
});
