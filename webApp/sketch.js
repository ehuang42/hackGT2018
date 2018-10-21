var request, output;
var capture;
var w = 640, h = 480;

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
          r0 = colors[0].color.red;
          g0 = colors[0].color.green;
          b0 = colors[0].color.blue;
          var resultStr = "";

          console.log(r0);
          console.log(g0);
          console.log(b0);

          r1 = colors[1].color.red;
          g1 = colors[1].color.green;
          b1 = colors[1].color.blue;

          r2 = colors[2].color.red;
          g2 = colors[2].color.green;
          b2 = colors[2].color.blue;

          document.getElementById("dominant_id").style.backgroundColor = 'rgb(' + [r0,g0,b0].join(',') + ')';
          document.getElementById("secondary_id").style.backgroundColor = 'rgb(' + [r1,g1,b1].join(',') + ')';
          document.getElementById("tertiary_id").style.backgroundColor = 'rgb(' + [r2,g2,b2].join(',') + ')';

          if (r0 < 40 && g0 < 40 && b0 < 40) {
              console.log("black");
              document.body.style.backgroundColor = '#424747';
              document.style.getElementById("h2").style.backgroundColor = '#fbfcfc';
              document.style.getElementById("h2").style.color = "white";
              resultStr = "Metal";
          } else if (r0 > 180 && g0 > 180 && b0 > 180) {
              console.log("white");
              document.body.style.backgroundColor = '#eaeaea';
              resultStr = "Opera";
          } else if (r0 > 100 && g0 > 100 && b0 > 100) {
              console.log("grey");
              document.body.style.backgroundColor = '#c0bfc0';
              document.getElementById("h2").style.backgroundColor = '#f8fafa';
              resultStr = "Hip-Hop";
          } else if (r0 > 100 && g0 > 100 && b0 < 65) {
              console.log("yellow");
              document.body.style.backgroundColor = '#fcaf6d';
              document.getElementById('h2').style.backgroundColor = '#fe8500';
              resultStr = "Pop";
          } else if (r0 > 50 && g0 > 15 && b0 > 15) {
              console.log("brown");
              document.body.style.backgroundColor = '#3a201b';
              resultStr = "Folk";
          } else if (r0 > g0 && r0 > b0) {
              console.log("red");
              document.body.style.backgroundColor = "red";
              resultStr = "Love";
          } else if (g0 > r0 && g0 > b0) {
              console.log("green");
              document.body.style.backgroundColor = "green";
              resultStr = "Nature";
          } else {
              console.log("blue");
              document.body.style.backgroundColor = "blue";
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

var http = new XMLHttpRequest();

http.onreadystatechange = function() {
  if(http.readyState == 4 && http.status == 200) {
    var palette = JSON.parse(http.responseText).result;
  }
}

http.open("POST", url, true);
http.send(JSON.stringify(data));

function draw() {
  // whatever you draw here will be uploaded to google when you call upload()
  image(capture, 0, 0, w, h);
}

function mousePressed() {
  upload();
}