/* 
1. Use the inquirer npm package to get user input.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
        message: "Enter the URL: ",
        name: "URL"
    },
  ])
  .then((answers) => {
    const URL = answers.URL;
    var qr_svg = qr.image(URL);
    qr_svg.pipe(fs.createWriteStream("qr.png"));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

// 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
// var qr = require("qr-image");

// var qr_svg = qr.image(`${userURL}`, { type: "svg" });
// qr_svg.pipe(require("fs").createWriteStream("qr.svg"));
// // 3. Create a txt file to save the user input using the native fs node module.

// const fs = require("fs");
// fs.writeFile("message.txt", `${userURL}`, (err) => {
//   if (err) throw err;
//   console.log(userURL);
// });
