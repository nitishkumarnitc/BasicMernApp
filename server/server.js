const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const log=require("./logger");
const socketIo = require("socket.io");
const http = require('http');
const ProfileVisitorService=require('./service/ProfileVisitor')

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => log.info("MongoDB successfully connected"))
  .catch(err => log.error(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

// our server instance
const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', socket => {
    socket.on("profileViewed",({roomId,emailId})=>{
        ProfileVisitorService.addUser({profile_id:roomId,email_id:emailId,socket_id:socket.id}).then(result=>{
            ProfileVisitorService.noOfVisitors(roomId).then(noOfVisitors=>{
                io.emit(roomId,noOfVisitors)
            })
        })
    })

    socket.on('disconnect', async() => {
        try{
            const roomId=await ProfileVisitorService.getProfileIdBySocketId(socket.id);
            log.info("disconnect room id "+roomId)
            await ProfileVisitorService.removeUser(socket.id);
            const noOfVisitors= await ProfileVisitorService.noOfVisitors(roomId)
            io.emit(roomId,noOfVisitors)
        }catch (e) {
            log.error(e)
        }
    })

})



const port = process.env.PORT || 5000;

server.listen(port, () => log.info(`Server up and running on port ${port} !`));
