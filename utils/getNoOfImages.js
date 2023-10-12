
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

const fs = require('fs');
const path = require('path');

function countImagesInDirectory(directoryPath) {
  // Array of valid image file extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];

  // Initialize a variable to count the number of images
  let imageCount = 0;

  // Create a generator function to iterate over the files in the directory
  function* generateFiles(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
      yield path.join(directoryPath, file);
    }
  }

  // Iterate over the files in the generator function and count the number of images
  for (const file of generateFiles(directoryPath)) {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext)) {
      imageCount++;
    }
  }

  return imageCount;
}

module.exports=countImagesInDirectory;
