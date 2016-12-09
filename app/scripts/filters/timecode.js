(function() {
  function timecode(SongPlayer) {
    return function(seconds, type, song) {

      var songPlayer = SongPlayer;

      if (type == 'durationAlbum' && song) {
        return buzz.toTimer(song.duration);
      } else {
        if (!songPlayer.currentSong) {
          return '-:--';
        }
        var timer = buzz.toTimer(songPlayer.currentBuzzObject.getTime());

        return timer;
      }
    };
  }

  angular
    .module('blocJams')
    .filter('timecode', ['SongPlayer', timecode]);
})();
