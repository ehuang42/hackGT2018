var request, output;

var capture;
var w = 640, h = 480;

var loadFile = function(event) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
};

function setup() {
  capture = createCapture(VIDEO);
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();
}

function blobToBase64(blob, cb) {
  var reader = new window.FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function() {
    cb(reader.result);
  }
}

function canvasToBase64(canvas, cb) {
  canvas.toBlob(function(blob) {
    blobToBase64(blob, cb);
  }, 'image/jpeg');
}

function upload() {
    canvasToBase64(canvas, function(b64) {
      b64 = b64.replace('data:image/jpeg;base64,', ''); // remove content type
      request = {
        "requests":[
          {
            "image":{ "content": b64 },
            "features":[
              {
                // if you want to detect more faces, or detect something else, change this
                "type":"IMAGE_PROPERTIES",
                "maxResults":1
              }
            ]
          }
        ]
      };

      $.ajax({
        method: 'POST',
        url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCDe_xjTXtzPmjVHHvLNlzy0CE17cZQG60',
        contentType: 'application/json',
        data: JSON.stringify(request),
        processData: false,
        success: function(data){
          output = data;
          var properties = data.responses[0].imagePropertiesAnnotation;
          var colors = properties.dominantColors.colors;
          redInt = colors[0].color.red;
          greenInt = colors[0].color.green;
          blueInt = colors[0].color.blue;
          var resultStr = "";
          console.log(redInt);
          console.log(greenInt);
          console.log(blueInt);

          if (redInt < 40 && greenInt < 40 && blueInt < 40) {
              console.log("black");
              resultStr = "Metal";
          } else if (redInt > 180 && greenInt > 180 && blueInt > 180) {
              console.log("white");
              resultStr = "Opera";
          } else if (redInt > 100 && greenInt > 100 && blueInt > 100) {
              console.log("grey");
              resultStr = "Indie";
          } else if (redInt > 100 && greenInt > 100 && blueInt < 65) {
              console.log("yellow");
              resultStr = "Acoustic";
          } else if (redInt > 50 && greenInt > 15 && blueInt > 15) {
              console.log("brown");
              resultStr = "Folk";
          } else if (redInt > greenInt && redInt > blueInt) {
              console.log("red");
              resultStr = "Love";
          } else if (greenInt > redInt && greenInt > blueInt) {
              console.log("green");
              resultStr = "Nature";
          } else {
              console.log("blue");
              resultStr = "Sad";
          }

          var spotPlaylist = "";

          var urlMetal = "https://open.spotify.com/playlist/0TjXAODinvMXFRmAVQeglO"; //black
          var urlOpera = "https://open.spotify.com/playlist/5wnkBErltLPUs7VHqj0Hdv"; //white
          var urlIndie = "https://open.spotify.com/playlist/4nNtij7TufT5vtKea1474s"; //grey
          var urlAcountic = "https://open.spotify.com/playlist/07zHzal6IkvS9RjQcD3jhh"; //yellow
          var urlFolk = "https://open.spotify.com/playlist/3sXbU1Dt3o4vW82Oi3dCnh"; //brown
          var urlLove = "https://open.spotify.com/playlist/65Bj0aD7Wvr3StW4Ioeeas"; //red
          var urlNature = "https://open.spotify.com/playlist/28462St7wH9XZfSI7DtFln"; //green
          var urlSad = "https://open.spotify.com/playlist/2Ae1SrKcb3zr6y6bnCZGlM"; //blues

          if (resultStr == "Metal") {
              spotPlaylist = urlMetal;
          } else if (resultStr == "Opera") {
              spotPlaylist = urlOpera;
          } else if (resultStr == "Indie") {
              spotPlaylist = urlIndie;
          } else if (resultStr == "Acoustic") {
              spotPlaylist = urlAcountic;
          } else if (resultStr == "Folk") {
              spotPlaylist = urlSad;
          } else if (resultStr == "Love") {
              spotPlaylist = urlLove;
          } else if (resultStr == "Nature") {
              spotPlaylist = urlNature;
          } else if (resultStr == "Sad") {
              spotPlaylist = urlSad;
          }

          viewPlaylist = document.getElementById();
          viewPlaylist.src = spotPlaylist;

        }
      },
      error: function (data, textStatus, errorThrown) {
        console.log('error: ' + data);
      }
    })
  })
}

function draw() {
  // whatever you draw here will be uploaded to google when you call upload()
  image(capture, 0, 0, w, h);
}

function mousePressed() {
  upload();
}