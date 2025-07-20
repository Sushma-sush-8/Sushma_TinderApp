const express = require('express');

const app = express();
const User = require('./models/user');
const connectDB = require('./config/database');
const adminAuth  = require('./middlewares/auth');

//converets request which is in json format to js object and send it to request body
//if we dont user this req.body will be undefined
app.use(express.json()); //midleware
app.post("/signup", async (req,resp) =>{
    const user = new User(req.body);
    console.log(req.body);

    try{
        await user.save()
        resp.send("User added successfully");
    } catch(err) {
        resp.status(5400).send("Error saving user");
    }
})

connectDB().then(() =>{
    console.log("Database connected successfully");
    app.listen(3000, () =>{
        console.log("server is listening")
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


app.listen(3000, () =>{
    console.log("server is listening in 3000");
});