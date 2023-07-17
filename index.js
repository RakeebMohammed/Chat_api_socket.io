const express=require('express')
const app=express()
const {Server}=require('socket.io')
const cors=require('cors')
require('dotenv').config()
const http=require('http')
app.use(cors())
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:'https://kirmaani.onrender.com',
   // origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})

  
io.on('connection',socket=>{
    console.log(`user is connected ${socket.id}`);
    socket.on('join_room',data=>{
        socket.join(data)
        console.log(`user with ${socket.id}joined  room :${data}` );
    })
    socket.on('send_message',data=>{
        console.log(data);
     socket.to(data.room).emit('recieve_message',data)
     
    })
    socket.on('disconnect',()=>{
        console.log('user is disconnectes'+socket.id);
       
    })
  
})
server.listen(process.env.PORT || 3002 ,()=>console.log('socket port is connected'+process.env.PORT))
