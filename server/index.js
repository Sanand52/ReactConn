let express=require('express');
let mongoose=require('mongoose');
let cors=require('cors');
const studentRoute = require('./App/routes/web/studentRoute');
require('dotenv').config();

let app=express();

app.use(cors());
app.use(express.json());

app.use('/api/student',studentRoute);

//connect MongoDB
mongoose.connect(process.env.MONGODBURL).then(()=>{
    console.log('DB connected');
    app.listen(process.env.PORT||8000,()=>{ //http://localhost:8000
        console.log('Server is running');
    });
    }).catch((err)=>{
        console.log(err);
});      

