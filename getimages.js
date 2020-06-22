var fs = require('fs');
const axios = require('axios');

console.log("requires loaded");

// regex to find full sized urls for google images pages
var googleImageRegex = /\b(https:\/\/.*\.jpg)\b[^?\\]/gi
var imagePath = 'images';

var GetGoogleImages = async function(query, location) {
  console.log("starting: GetGoogleImages()");
  try {
    var body = await getGoogleImagePage(query);
    var valid = filterLinks(body);
    await downloadValidImages(valid, location);
  } catch (err) {
    console.log('failure: ', err);
  } 
  return;  
}

getGoogleImagePage = async function(query) {
  try {
    const response = await axios({
        url:`https://www.google.com/search?q=${query}&sxsrf=ALeKk00zCALvxWY2ucji1pZ3tZj7s4Uzpw:1592675739014&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi9gKq9-5DqAhUQSjABHYdLCuwQ_AUoAXoECA0QAw&biw=1920&bih=969`,
        method: 'get',
        // fake the user agent to trick google images
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' },
    });

    fs.writeFile('body.html', response.data, function (err) {
      if (err) return console.log(err);
      console.log('body written');
    });

    return response.data;
  } catch (err) {
      console.log('error on getting image urls: ', err);
      throw err;
  } 
}

downloadImage = async function(url, path) {  
  try{
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })

    const writer = fs.createWriteStream(path);      
    response.data.pipe(writer);      

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  }catch(error){
    console.log(`ERROR: ${url} ${error}`);  
    return;    
  }
}

downloadValidImages = async function(validLinks, folder){
  var count = 1;  

  if (!fs.existsSync(`${imagePath}/${folder}`)){
    fs.mkdirSync(`${imagePath}/${folder}`);
  }

  fs.readdir(`./${imagePath}/${folder}`, (err, files) => {
    count = files.length + count;
    validLinks.forEach(async function(link){
      try{
        var res = await downloadImage(link, `${imagePath}/${folder}/image${count++}.jpg`);
      }catch(err){
        console.log(`ERROR: link ${link} error: ${err}`)
      }
    });
  });


  return;
}

filterLinks = function(body){
  var links = body.match(googleImageRegex);
  var filtered = [];
  if(links){
    links.forEach(function(link){
      // trim leftover quote from regex ? 
      link = link.split('"')[0]

      //filter out non-working urls with forward slash
      if(link.indexOf("\\")==-1){
        console.log(`link: ${link}`);    
        filtered.push(link);
      }
    })    

    console.log(`MATCHES: ${links.length} VALID: ${filtered.length}`);
  }else{
    console.log("NO MATCHES FOUND");
  }

  return filtered;
}


var searchterm = process.argv.slice(2)

console.log(searchterm.join('+'));
GetGoogleImages(searchterm.join('+'), searchterm.join(''));


// (\bimgres.* data-navigation\b)
// https://www.google.com/search?q=person+with+masks+coronavirus&sxsrf=ALeKk00zCALvxWY2ucji1pZ3tZj7s4Uzpw:1592675739014&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi9gKq9-5DqAhUQSjABHYdLCuwQ_AUoAXoECA0QAw&biw=1920&bih=969