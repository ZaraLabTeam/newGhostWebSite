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

        var videoId = item.snippet.resourceId.videoId,
            videoTitle = item.snippet.title,
            urlYouTubeVideo = 'https://www.youtube.com/watch?v=' + videoId,
            urlYouTubeImg = 'https://i.ytimg.com/vi/' + videoId + '/sddefault.jpg',
            youTubeModule = document.createElement('div'),
            youTubeLink = document.createElement('a'),
            youTubeTitle = document.createElement('h3');

        $(youTubeLink).addClass('last-youtube-video-thumb js-trigger-modal play')
                      .attr('data-youtube-id', videoId)
                      .attr('href', urlYouTubeVideo)
                      .css('background-image', 'url('+urlYouTubeImg+')');

        $(youTubeTitle).addClass('title').text(videoTitle);

        $(youTubeModule).addClass('youtube-module')
                        .append(youTubeLink)
                        .append(youTubeTitle)
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
      $('a.last-youtube-video-thumb').on('click', setPlayerWithLinkData);
  }

  function setPlayerWithLinkData () {
    /*jshint validthis:true*/
    var iframe = '<iframe id="youtube" width="100%" height="100%" src="//www.youtube.com/embed/'+
                  $(this).attr('data-youtube-id')+
                  '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';

    $('#video-modal-content').append(iframe);
    return false;
  }

  function toggleVideoModal() {

      // Open the Video Modal
      $(".js-trigger-modal").on("click", function(event){
          event.preventDefault();
          $("body").addClass("show-video-modal");
      });

      // Close and Reset the Video Modal
      $('#close-video').on('click', function(event) {
        console.log('click');
          event.preventDefault();

          $("body").removeClass("show-video-modal");
          $('#youtube').remove();
      });
  }

}(jQuery));
