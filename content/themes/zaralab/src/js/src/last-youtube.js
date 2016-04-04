(function($) {
  var channelName = 'xzq70r4',
      pid,
      width = 560,
      height = 315,
      videoResults = 3;

  $(document).ready(function () {
    $.get(
      'https://www.googleapis.com/youtube/v3/channels', {
       part: 'contentDetails',
       forUsername: channelName,
       key: 'AIzaSyBGRXhWbIOEGtnLAnAGUM8lXxWegunJ0Cw'},
       function(data) {
         $.each(data.items , function(i , item) {
           pid = item.contentDetails.relatedPlaylists.uploads;
           getVideos(pid);
         });
       }
    );

    function getVideos(pid) {
      $.get(
        'https://www.googleapis.com/youtube/v3/playlistItems', {
        part: 'snippet',
        maxResults: videoResults,
        playlistId: pid,
        key: 'AIzaSyBGRXhWbIOEGtnLAnAGUM8lXxWegunJ0Cw'},
        function(data) {
          $.each(data.items , function(i , item) {
            var videoTitle = item.snippet.title;
            var videoId = item.snippet.resourceId.videoId;
            var output = '<li><iframe width="'+width+'" height="'+height+
                     '" src=\"//www.youtube.com/embed/'+videoId+
                     '\" allowfullscreen></iframe></li>';
            $('#results').append(output);
          });
        }
      );
    }
  });
}(jQuery));
