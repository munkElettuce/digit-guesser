const tf = require("@tensorflow/tfjs-node"); 

const predict=async(modelPath,image)=>{
    const model = await tf.loadLayersModel(modelPath)

    const predictions=model.predict(image)
    return predictions.arraySync()
}

module.exports=predict