function audioLoad(){
  var songs = [
    "snowdin.mp3",
    "snowy.mp3",
    "grinch.mp3",
    "joy_world.mp3"
  ];
    var randomIndex = Math.floor(Math.random() * songs.length);
    var song = songs[randomIndex];
    var audio = document.getElementById("audio");
    var source = document.getElementById("src");
    source.src = song;
    audio.load();

}
