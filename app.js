const express = require("express");
const app = express();
const path = require("path");
const multer = require('multer');
const ejsMate=require("ejs-mate")
const getDigit=require("./utils/getNum")
const predict=require("./utils/predict");
const imageToTensor=require("./utils/imageToTensor");
const { get } = require("http");
const { tensor } = require("@tensorflow/tfjs");
const tf=require("@tensorflow/tfjs-node")

const getImageBuffer=require("./utils/getImageBuffer")

const modelPath="file://models/json/model.json";



app.use(express.urlencoded({extended:true}))
app.use(express.json());
// app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")))

app.engine('ejs',ejsMate);

app.set("view engine",'ejs');
app.set('views',path.join(__dirname,'views'))



app.get("/", (req, res) => {
    res.render("index");
});

app.post("/fetch-digit",async(req,res)=>{
    const imageData=req.body.image
    const imageBuffer=getImageBuffer(imageData)
    let imageTensor=await imageToTensor(imageBuffer,28,28)
    imageTensor=imageTensor.expandDims(0)
    const predictions=await predict(modelPath,imageTensor)

    res.json(JSON.stringify(predictions))
})

app.listen("8080", () => {
    console.log("Server listening on port 8080");
});

