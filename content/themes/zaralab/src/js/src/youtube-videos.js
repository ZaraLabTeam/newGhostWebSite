(function($) {
  "use strict";
  var channelName = 'xzq70r4',
      videoResults = 3,
      gooleAppKey = 'AIzaSyBGRXhWbIOEGtnLAnAGUM8lXxWegunJ0Cw',
      pid = 'UUHDYUiamPhPN9lo_87ksx3w';

  $(document).ready(function () {
    //who-we-are section
    addListenerToWhoWeAreYouTubeLinks();

    //stream-player
    addListenerToStreamPlayerYouTubeLinks();

    //last-youtube-videos section
    getVideos(pid, videoResults, gooleAppKey).then(addLinksWithYouTubeData)
                        .then(addListenerToLastYouTubeLinks)
                        .then(toggleVideoModal);
  });

  function getVideos(pid, videoResults, gooleAppKey) {
    return $.get(
      'https://www.googleapis.com/youtube/v3/playlistItems', {
      part: 'snippet',
      maxResults: videoResults,
      playlistId: pid,
      key: gooleAppKey }
    );
  }

  function addLinksWithYouTubeData(data) {
      $.each(data.items , function(i , item) {
        //var videoTitle = item.snippet.title;
        var videoId = item.snippet.resourceId.videoId,
            urlYouTubeVideo = 'https://www.youtube.com/watch?v=' + videoId,
            urlYouTubeImg = 'https://i.ytimg.com/vi/' + videoId + '/sddefault.jpg',
            youTubeLinkTag = document.createElement('a');

        $(youTubeLinkTag).addClass('video-thumb js-trigger-modal play')
                         .attr('data-youtube-id', videoId)
                         .attr('href', urlYouTubeVideo)
                         .css('background-image', 'url('+urlYouTubeImg+')')
                         .appendTo($("#last-youtube-videos"));
      });
    }

  function addListenerToWhoWeAreYouTubeLinks () {
      $('a.who-we-are-video').on('click', setPlayerWithLinkData);
  }

  function addListenerToStreamPlayerYouTubeLinks () {
      $('a.stream-player').on('click', setPlayerWithLinkData);
  }

  function addListenerToLastYouTubeLinks () {
      $('a.video-thumb').on('click', setPlayerWithLinkData);
  }

  function setPlayerWithLinkData () {
    /*jshint validthis:true*/

    // Grab the video ID from the element clicked
    var id = $(this).attr('data-youtube-id');

    // Autoplay when the modal appears
    // Note: this is intetnionally disabled on most mobile devices
    // If critical on mobile, then we need to brainstorm a way, or not use YouTube?
    var autoplay = '?autoplay=1';

    // Don't show the 'Related Videos' when the video ends
    var related_no = '&rel=0';

    // String the ID and param variables together
    var src = '//www.youtube.com/embed/'+id+autoplay+related_no;

    // Set the source on the iframe template inside the video modal
    $("#youtube").attr('src', src);
    return false;
  }

  function toggleVideoModal() {

      // Open the Video Modal
      $(".js-trigger-modal").on("click", function(event){
          event.preventDefault();
          $("body").addClass("show-video-modal");
      });

      // Close and Reset the Video Modal
      $('body').on('click', '.close-video-modal, .video-modal .overlay', function(event) {
          event.preventDefault();

          $("body").removeClass("show-video-modal");

          // reset the source attribute for the iframe template - kills the video
      $("#youtube").attr('src', '');
      });
  }

}(jQuery));
