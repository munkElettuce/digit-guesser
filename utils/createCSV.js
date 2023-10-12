

const fs = require('fs');

module.exports = function (filePath, imgName, prediction) {
  const data = [[imgName, prediction]];

  // Convert the data to a CSV-formatted string
  const csvData = data.map(row => row.join(',')).join('\n');

  // Append the CSV data to the file
  fs.appendFile(filePath, csvData + '\n', (err) => {
    if (err) {
      console.error('Error appending data to CSV file:', err);
    } else {
      console.log(`${imgName} created`);
    }
  });
};
