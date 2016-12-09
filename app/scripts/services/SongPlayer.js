(function() {

  function SongPlayer($rootScope, Fixtures) {

    /**
    * @desc SongPlayer object we are going to use for play and pause methods
    * @type {Object}
    */
    var SongPlayer = {};

    /**
    * @desc currentAlbum is an object that stores the current album we are listening to
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /**
     * @desc Buzz object audio file
     * @type {Object}
    */
    var currentBuzzObject = null;

    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong(song);
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
    };


    /**
    * @function Gets the song index specified
    * @return index
    **/
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @desc Current song object being used
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;

    /**
    * @desc Holds the current volume of the track
    */
    SongPlayer.volume = null;

    /**
    * @function playSong
    * @desc Sets sound to play through users speakers and sets song.playing to true
    * @type {Object}
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      SongPlayer.currentSong.playing = true;
    };

    /**
    * @function stopSong
    * @desc Stops sound from playing through users speakers and set song.playing to null
    * @type {Object}
    **/
    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    };

    /**
    * @function Sets current time of audio
    *
    **/
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    /**
    * @function Sets the current volume of the song
    **/
    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
      }
    }

    /**
    * @function songPlayer.play
    * @desc This is the main function we call to play the song
    * @type {Object}
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /**
    * @function This is the main function we call to pause the song
    * @desc
    * @type {Object}
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function this function goes to the previous song
    * @return none
    **/
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function this function goes to the next song
    * @return none
    **/
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      if (currentSongIndex >= currentAlbum.songs.length) {
          currentSongIndex = 0;
      }
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
