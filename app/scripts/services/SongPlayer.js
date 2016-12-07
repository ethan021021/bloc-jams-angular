(function() {

  function SongPlayer() {

    /**
    * @desc SongPlayer object we are going to use for play and pause methods
    * @type {Object}
    */
    var SongPlayer = {};

    /**
    * @desc Current song object being used
    * @type {Object}
    */
    var currentSong = null;

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
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };

    /**
    * @function playSong
    * @desc Sets sound to play through users speakers and sets song.playing to true
    * @type {Object}
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function songPlayer.play
    * @desc This is the main function we call to play the song
    * @type {Object}
    */
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };

    /**
    * @function This is the main function we call to pause the song
    * @desc
    * @type {Object}
    */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
