const mongoose=require('mongoose');
var cors = require('cors')
const express=require('express');
const app=express();
const DB='mongodb+srv://ayush:govind@cluster0.uvvp0b8.mongodb.net/note?retryWrites=true&w=majority'


app.use(cors())

mongoose.connect(DB,{

}).then(()=>{
    console.log("connection success");
}).catch((err)=>console.log("no connection"))


const port = 5000

app.use(express.json())
app.use('/api/auth',require('./routes/auth'))

app.listen(port, () => {
    console.log("Example app listening on port ${port}")
})
