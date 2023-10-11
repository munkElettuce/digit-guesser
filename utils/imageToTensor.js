const tf=require("@tensorflow/tfjs-node");
const fs=require("fs").promises;
const sharp=require("sharp");

module.exports=async function imageToTensor(imageBuffer,width,height){
    try {
        // Read and decode the image using sharp
        
        const decodedImage = await sharp(imageBuffer)
          .resize(width,height)
          .toColorspace('b-w')
          .flatten()// Resize the image as needed
          .toBuffer();
        sharp(decodedImage).toFile("D:\\UNIVERSITY_WORKS\\DL\\project\\test\\drawingSamples\\test.jpg",(err, info) => {
          if (err) {
            console.error(err);
          }} )
        const tensor = tf.node.decodeImage(decodedImage);
        
        return tensor;
      } catch (error) {
        console.error('Error converting image to tensor:', error);
        return null;
      }
}