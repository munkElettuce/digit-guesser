const express = require("express");
const app = express();
const path = require("path");
const ejsMate=require("ejs-mate")
const getDigit=require("./utils/getNum")
const predict=require("./utils/predict");
const imageToTensor=require("./utils/imageToTensor");
const tf=require("@tensorflow/tfjs-node")
const methodOvveride=require("method-override")
const getImageBuffer=require("./utils/getImageBuffer")

//creating dataset
const countImages=require("./utils/getNoOfImages");
const saveImage=require("./utils/saveImage");
const createCSV=require("./utils/createCSV")

// const datasetPath="D:\\UNIVERSITY_WORKS\\DL\\project\\data\\images";
const datasetPath="./data/images"
const modelPath="file://models/json/model.json";



app.use(express.urlencoded({extended:true}))
app.use(express.json());
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

app.get("/create",(req,res)=>{
    res.render("new")
})


app.post("/create-dataset",async(req,res)=>{

    const {image,number}=req.body;
    const csvPath="./data/csv/own-mnist.csv"
    const imageCount=await countImages(datasetPath);//for indexing the dataset imgs
    let img=`${datasetPath}/img_${imageCount}.jpg`
    console.log(`no of images: ${imageCount}`)
    const imageBuffer=getImageBuffer(image)
    const isSaved=saveImage(imageBuffer,50,50,img);


    const isCreated=createCSV(csvPath,`img_${imageCount}.jpg`,number)
    if(isSaved && isCreated){
        res.json("DONEEe")
    }else{
        res.json("OOPSIES")
    }
})

app.listen("8080", () => {
    console.log("Server listening on port 8080");
});

