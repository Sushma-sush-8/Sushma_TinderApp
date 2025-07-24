const express = require("express");

const app = express();
const User = require("./models/user");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");


//converets request which is in json format to js object and send it to request body
//if we dont user this req.body will be undefined
app.use(express.json()); //midleware
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");


app.use("/", authRouter);
app.use("/", profileRouter);

app.get("/users", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (err) {
    res.status(404).send("Didn't find user");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});
    res.send(feed);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("server is listening");
    });
  })
  .catch((err) => {
    console.log("Database connection failed");
  });

// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req,res) =>{
//     res.send("all data sent");
// } )

// app.use("/admin", (req,res,next) =>{
//     console.log("admin is checking for auth");
//     const token = "abcv123";
//     const isAdminAuthenticated = token === "abcv123";
//     if(!isAdminAuthenticated){
//         res.status(401).send("Unauthorized");
//     } else {
//         next();
//     }
// });

// app.get("/admin/getUser",(req,res) =>{
//     res.send("sent all data");
// })

// app.use("/", (err,req,res) =>{
//     res.status(500).send("somenthing went wrong");
// })

// app.get("/user/:userId/:name/:password", (req, res) => {
//     console.log(req.params);
//     res.send({name:"sushma"});
// });

// app.listen(3000, () =>{
//     console.log("server is listening in 3000");
// });

const mangoose = require("mongoose");
