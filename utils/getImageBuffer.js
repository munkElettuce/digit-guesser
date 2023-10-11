module.exports=function(dataURL){
   // You may need to adjust this based on your form field name

  // Decode the Data URL and extract the image data (Base64)
  const matches = dataURL.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return res.status(400).json({ error: 'Invalid Data URL' });
  }

  const imageType = matches[1];
  const imageData = matches[2];
  const buffer = Buffer.from(imageData, 'base64');
  return buffer
}