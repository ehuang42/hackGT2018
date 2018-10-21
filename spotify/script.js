/*
- search for a playlist based on keyword
    get first track
    start users playlist
- button (next);
    skip payback to next track
    play track
*/


var Spotify = require('spotify-web-api-js');
var s = new Spotify();

//instantiate wrapper
var spotifyApi = new SpotifyWebApi();

//request access token to utilize Spotify api
spotifyApi.setAccessToken('BQBOpc05Dh3jvVZG9aBQ8U6koV0fAt8F4XVbonODDCuQa-q6qu7tVW5yjZm9ZxBfhvX69S4bvZU-3LcCbPmqNqe_B87MhaHB3exGubs6g82JmhxeU6jSd9GQt43gGskyMFkg-Di9HMZxduzpD1kKLKUAuql3rUY2r9GZvQ&refresh_token=AQC5ZdvjwRkTCHGy0vA1NmmFBC4H6ToSDLsNB1ibcZcH4svq68j6878gG0h4HWPVo_yIwfsp-STZjudo17ijakNu8Ty3bLCE7plDX8eGxVx0qbScFyJ0GfJ5QWJoTlpAhpVuIg');

//api methods return promise objects
spotifyApi.setPromiseImplementation(Q);

var resulturl = "red"

//matchPlaylist is a promise object
//On success: the response body contains an array of artist objects, simplified
// album objects, and/or track objects wrapped in a paging object in JSON.
//https://developer.spotify.com/documentation/web-api/reference/search/search/
/*
var matchPlaylist = spotifyApi.searchPlaylists('playlist:' + searchTerm)
  .then(function(data) {
    console.log('Success: search tracks by "Love" in the artist name');
    var playlist = data;
  }, function(err) {
    console.error(err);
  });
*/

//put result string into an array
var songinArray = ----;


songInput = {
  "uris": songinArray,
  "offset": {
    "position": 0
  },
  "position_ms": 0
}

var deviceobj = spotifyApi.getMyDevices(function(console.log('Got DeviceID'))

var deviceId = deviceobj['devices'][0]['id']

spotifyApi.play(songinArray, function(console.log('Song played')))







