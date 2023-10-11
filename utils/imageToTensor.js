const tf=require("@tensorflow/tfjs-node");
const fs=require("fs").promises;
const sharp=require("sharp");

module.exports=async function imageToTensor(imgPath,width,height){
    try {
        // Read and decode the image using sharp
        const imageBuffer = await fs.readFile(imgPath);
        const decodedImage = await sharp(imageBuffer)
          .resize(width,height)
          .toColorspace('b-w') // Resize the image as needed
          .toBuffer();
    
        // Convert the decoded image to a tensor
        const tensor = tf.node.decodeImage(decodedImage);
        
        return tensor;
      } catch (error) {
        console.error('Error converting image to tensor:', error);
        return null;
      }
}