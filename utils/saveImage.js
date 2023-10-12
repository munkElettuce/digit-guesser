const fs=require("fs").promises;
const sharp=require("sharp");

module.exports=async function imageToTensor(imageBuffer,width,height,path){
    try {
        // Read and decode the image using sharp
        
        const decodedImage = await sharp(imageBuffer)
          .resize(width,height)
          .toColorspace('b-w')
          .flatten()// Resize the image as needed
          .toBuffer();
        sharp(decodedImage).toFile(path,(err, info) => {
          if (err) {
            console.error(err);
          }} )
        return true
      } catch (error) {
        console.error('Error converting image to tensor:', error);
        return false;
      }
}