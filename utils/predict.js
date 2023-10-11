const tf = require("@tensorflow/tfjs-node"); 
const getNum=require("./getNum");

const predict=async(modelPath,imageTensor,imageName=null)=>{
    const model = await tf.loadLayersModel(modelPath)

    let predictions=await model.predict(imageTensor)
    predictions= predictions.arraySync();//array contains probability of digits
    predictions=predictions[0];//it is a rank 2 tensor so converting it to an array

    let result=await getNum(predictions)
    
    if(imageName){
        console.log(`for ${imageName} --> prediction: ${result.digit}`)
    }
    return result
}

module.exports=predict