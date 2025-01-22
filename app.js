const path = require('path');
const express = require('express');
const app=express();

const http = require('http');
const socketio=require('socket.io');
const { log } = require('console');

const server=http.createServer(app);
const io=socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("received-location", {id: socket.id, ...data});
    });
    socket.on("disconnect", function(){
        io.emit("user-disconnectd", socket.id);
    });
    console.log("connected");
});

app.get("/", function(req,res){
    res.render('index');
});

server.listen(3000);