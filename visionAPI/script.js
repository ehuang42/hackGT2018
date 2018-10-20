// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file
  client
  .imageProperties('./resources/red_pic.jpg')
  .then(results => {
    const properties = results[0].imagePropertiesAnnotation;
    const colors = properties.dominantColors.colors;
    redInt = colors[0].color.red;
    greenInt = colors[0].color.green;
    blueInt = colors[0].color.blue;
    /*
    console.log(redInt);
    console.log(greenInt);
    console.log(blueInt);
     */
    if (redInt < 20 && greenInt < 20 && blueInt < 20) {
        console.log("black");
    } else if (redInt > 180 && greenInt > 180 && blueInt > 180) {
        console.log("white");
    } else if (redInt > 100 && greenInt > 100 && blueInt > 100) {
        console.log("grey");
    } else if (redInt > 100 && greenInt > 100 && blueInt <65) {
        console.log("yellow");
    } else if (redInt > 50 && greenInt > 15 && blueInt <20) {
        console.log("brown");
    } else if (redInt > greenInt && redInt > blueInt) {
        console.log("red");
    } else if (greenInt > redInt && greenInt > blueInt) {
        console.log("green");
    } else {
        console.log("blue");
    }
    //colors.forEach(color => console.log(color));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

