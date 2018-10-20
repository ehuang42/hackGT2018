/*
- search for a playlist based on keyword
    get first track
    start users playlist
- button (next);
    skip payback to next track
    play track
*/

//require spotify api for javascript
//instantiate
var Spotify = require('spotify-web-api-js');
var s = new Spotify();

//instantiate wrapper
var spotifyApi = new SpotifyWebApi();

//request access token to utilize Spotify api

spotifyApi.setAccessToken('BQDQxohKtefRHe3ZFTpWnX4OEMWQDr84VdzOzSKbLA_3LHyd-4R46BhaxdnBxjcM5iVdnlRtEb_7NI5G1md4cAHeIzFrAwH4EbEZoBNEq7sWSN8ovugeiOaWX5qw1Ie0P3fZ-xfF0uFkvTJEqnUAs_iRKHwnF87ABtb94A&refresh_token=AQBWPuRFd6UaZsX787ToINcM1-wC8GqkvWPDCNOP135pK6OdhQERBY6WbWrCLXmaQOnNi4n3T9-FUjZx7TWNuMj7uM0DKmdoGKyZljAThNyaNcMc8lnG2My7pimt3ScWRCA7lw');

spotifyApi.setPromiseImplementation(Q);

var searchTerm = "red"

var playlist = spotifyApi.searchPlaylists('playlist:' + searchTerm)
  .then(function(data) {
    console.log('Search tracks by "Love" in the artist name', data);
  }, function(err) {
    console.error(err);
  });
