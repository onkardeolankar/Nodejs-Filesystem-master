const express=require('express');
const dotenv=require('dotenv');
const path=require('path');
const fs = require('fs');

const app=express();
dotenv.config();

const PORT=process.env.PORT || 3000;
const dir = path.resolve(path.join(__dirname, 'Files'));

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.get('/',(req,res,next)=>{
    res.send("hello world");
 });

app.get('/createfile',(req,res,next)=>{
    var today = new Date();
    var date = "Date-"+ today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = "Time-"+ today.getHours() + " hours " + today.getMinutes() + " minutes " + today.getSeconds() + " seconds";
    var date = date+' '+time;

    var filename=`${date}.txt`;
    const link = path.resolve(path.join(dir,filename));

    fs.writeFile(link,filename,(err) =>{
            console.log(err);
        });   
res.send(`${filename} created successfully`);
});

fs.access("./Files", function(error) {
    if (error) {
      console.log("Directory does not exist.")
    } else {
      console.log("Directory exists.")
    }
});

app.get("/getfile", (req, res) => {
    let files = fs.readdirSync("./Files");
    console.log(files);
    res.send(files);
});

app.listen(PORT,()=>{
  console.log("SERVER STARTED")
});