const express = require("express")
const { connection } = require("./db")
const { userRoute } = require("./Routes/user.route")
const  jwt = require('jsonwebtoken');
const { auth } = require("./middleware/auth");
const { notesRouter } = require("./Routes/notes.routes");
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

app.use("/users" , userRoute)

 
 
//protected routes
app.use(auth)

app.use("/notes" , notesRouter)

app.listen(8080, async()=> {
    try {
        await connection 
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log("server running");
})