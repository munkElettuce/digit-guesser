const express = require("express");
const app = express();
const path = require("path");

const getDigit=require("./utils/getNum")
const predict=require("./utils/predict");
const imageToTensor=require("./utils/imageToTensor");
const { get } = require("http");
// const { tensor } = require("@tensorflow/tfjs");


const modelPath="file://models/tfjs_model/model.json";
const imgPath="/test/5.jpg"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render("test");
});

app.listen("8080", () => {
    console.log("Server listening on port 8080");
});

const temp=async()=>{
    let tensor=await imageToTensor("D:/UNIVERSITY WORKS/DL/project/test/trainingSet/1/img_2.jpg",28,28)
    tensor=tensor.expandDims(0);
    
   let predictions= await predict(modelPath,tensor)
   predictions=predictions[0]
   console.log(predictions)
   const result=getDigit(predictions);
   console.log(`digit: ${(await result).digit}\nprobability:${(await result).probability}`)
}

temp()