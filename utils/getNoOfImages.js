
// const fs = require('fs');
// const path = require('path');

// function countImagesInDirectory(directoryPath) {
//   // Array of valid image file extensions
//   const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];

//   // Initialize a variable to count the number of images
//   let imageCount = 0;

//   // Read the files in the directory
//   const files = fs.readdirSync(directoryPath);
//   files.forEach((file) => {
//     const ext = path.extname(file).toLowerCase();
//     if (imageExtensions.includes(ext)) {
//       imageCount++;
//     }
//   });

//   return imageCount;
// }

// module.exports=countImagesInDirectory

const readdirp = require('readdirp');
const path = require('path');

async function countImagesInDirectory(directoryPath) {
  // Array of valid image file extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];

  // Initialize a variable to count the number of images
  let imageCount = 0;

  for await (const entry of readdirp(directoryPath, { fileFilter: ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.bmp', '*.svg', '*.webp'] })) {
    imageCount++;
  }

  return imageCount;
}

module.exports = countImagesInDirectory;
