var fs = require('fs');
const axios = require('axios');

console.log("requires loaded");

// regex to find full sized urls for google images pages
var googleImageRegex = /\b(https:\/\/.*\.jpg)\b[^?\\]/gi
var imagePath = 'images';

var MoveImages = function(folder, commonfolder) {
    fs.readdir(`./${imagePath}/${folder}`, (err, files) => {
        var filesmoved = 0;
    
        files.forEach(function(file){
            fs.createReadStream(`./${imagePath}/${folder}/${file}`).pipe(fs.createWriteStream(`./${imagePath}/${commonfolder}/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}.jpg`));
            console.log(`moved: ${file} from ${folder} to ${commonfolder}`);
            filesmoved++;
        });

        console.log(`total moved: ${filesmoved}`);    

    });
};

var foldername = process.argv.slice(2)

MoveImages(foldername,'done');

//fs.createReadStream('test.log').pipe(fs.createWriteStream('newLog.log'));