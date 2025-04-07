/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

// NPM package that allows us to get input from the user
import inquirer from "inquirer";

// NPM package that generate QR images as a png that can
// be saved into the local file systems
import qr from "qr-image";

import fs from 'fs';

// 1. Use the inquirer npm package to get user input.
inquirer
  .prompt([
    {
        "message" : "Enter a valid url here:",
        "type": "input",
        "name": "URL"
    }
])
  .then((answers) => {
    // answers is the array that contains the link(s) that the user submitted
    console.log('answers = ', answers);
    let url = answers.URL;
    // 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
    let qrImage = qr.image(url, {type: 'png'});
    qrImage.pipe(fs.createWriteStream(`qr_img.png`));

    // 3. Create a txt file to save the user input using the native fs node module.
    fs.writeFile('url.txt', answers.URL, (err) => {
        if(err){
            console.log(`fs.writeFile(): The following error occured:\n${err}`);
            return;
        } 
        console.log('.txt file was successfully created.');
    })
    

  })
  .catch((error) => {
    console.log(`The following error occured:\n${error}`);
  });
