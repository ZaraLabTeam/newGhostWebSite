var channels_name='ZaraLab',
    channels_title='ZaraLab',
    apikey='AIzaSyCj2GrDSBy6ISeGg3aWUM4mn3izlA1wgt0',
    pid = 'UUDllkYLP6M2_zP3lzDeB5dg',
    chid = { kind: "youtube#video", videoId: "nxWDQdY-6tU" },
    nekpag = '';


youtube_video_list(pid, apikey, nekpag, channels_title, chid, channels_name);

function youtube_video_list(f, g, h, j, k, l) {
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + f + '&key=' + g + '&pageToken=' + h,
        dataType: 'json'
    }).done(function(c) {
        var d = '';
        d += '<div class="zaralab-vid-top"><span class="zaralab-nav-title">' +
                     j + 
            '</span><br>' + 
            '<span class="zaralab-vid-by">by <a href="https://www.youtube.com/channel/UCDllkYLP6M2_zP3lzDeB5dg" target="_BLANK">' +
                     l +
             '</a></span><hr>' +

             '<i class="fa fa-fast-backward zaralab_vid_prev" title="Previous videos"></i> ' +
             '<i class="fa fa-fast-forward zaralab_vid_next" title="Next videos"></i></div><div class="zaralab-vid-bottom">';
        $.each(c.items, function(i, a) {
            var b = c.items[i].snippet.resourceId.videoId;
            getwaktu(b, i, g);
            d += '<div class="zaralab-play" data-vvv="' + b + '"><div class="zaralab_youtube_thumb">' +
                    '<img src="' + c.items[i].snippet.thumbnails.default.url + '" alt="ibacor">' +
                        '<span class="zaralab-vid-tm' + i + '"></span></div>' +

                 c.items[i].snippet.title + '</div>';
        });
        d += '</div>';
        $('.zaralab_youtube_channels').html(d);
        if (c.prevPageToken == null) {
            var e = $(".zaralab-play").attr("data-vvv");
            youtube_det(e, k, l, g);
        }
        if (c.prevPageToken != null) {
            $('.zaralab_vid_prev').click(function() {
                var a = c.prevPageToken;
                youtube_video_list(f, g, a, j, k, l);
                return false;
            });
        }
        $('.zaralab_vid_next').click(function() {
            var a = c.nextPageToken;
            youtube_video_list(f, g, a, j, k, l);
            return false;
        });
        $(".zaralab-play").each(function() {
            $(this).click(function() {
                var a = $(this).attr("data-vvv");
                $('div').removeClass('zaralab-vid-active');
                $(this).addClass('zaralab-vid-active');
                youtube_det(a, k, l, g);
                return false;
            });
        });
    });
}

function youtube_det(c, d, e, g) {
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/videos?id=' + c + '&key=' + g + '&part=snippet,statistics',
        dataType: 'json'
    }).done(function(a) {
        //TODO youtube img to local 
        var b = '',
            viewc = a.items[0].statistics.viewCount,
            likc = a.items[0].statistics.likeCount,
            likd = a.items[0].statistics.dislikeCount,
            category = '',
            judul = a.items[0].snippet.localized.title,
            desc = a.items[0].snippet.localized.description;

        b += '<iframe src="http://www.youtube.com/embed/' + c + '" allowfullscreen="" frameborder="0" class="zaralab-vid-iframe"></iframe>' +
             '<div class="zaralab-vid-box"><h1>' +
                                                    judul +
                                              '</h1><hr>' +
                '<div class="zaralab-vid-box-user">' +
                    '<a href="https://www.youtube.com/channel/UCDllkYLP6M2_zP3lzDeB5dg" target="_BLANK">' +
                    '<span id="zaralab-user-img">' +
                                '<img alt="ZaraLab" src="https://yt3.ggpht.com/-eynbD2HOz-U/AAAAAAAAAAI/AAAAAAAAAAA/F3EQXNTsAf0/s88-c-k-no-rj-c0xffffff/photo.jpg" height="48" width="48">'+
                    '</span> <span class="zaralab-uploader">' +
                        a.items[0].snippet.channelTitle + 
                    '</span></a><h4 class="pull-right"> ' +
                                 addCommas(viewc) +
                                '</h4></div></div>'+
                        '<div class="zaralab-vid-box">' +
                            '<i class="fa fa-clock-o"> <span>' +
                                    _timeSince(new Date(a.items[0].snippet.publishedAt).getTime()) + 
                            '</span></i>' +
                            '<i class="fa fa-thumbs-down pull-right"> ' +
                                addCommas(likd) +
                            '</i><i class="fa fa-thumbs-up pull-right"> ' +
                                addCommas(likc) + 
                            '</i><hr>' +
                                 urlify(desc).replace(/\n/g, '<br>') +
            '<br></div>';

        $('.zaralab_vid_play').html(b);
    })
}

function getwaktu(c, i, g) {
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/videos?id=' + c + '&key=' + g + '&part=contentDetails',
        dataType: 'json'
    }).done(function(a) {
        var b = a.items[0].contentDetails.duration,
            dataw = '',
            menit = '',
            detik = '';
		if(b.match(/M/g)){
            dataw = b.split('M');
            menit = dataw[0].replace('PT','');
			if(dataw[1] != ''){
				detik = dataw[1].replace('S','');
			}else{
				detik = '00';
			}
		}else{
            dataw = b.split('PT');
			menit = '00';
			detik = dataw[1].replace('S','');
		}
        $('.zaralab-vid-tm' + i).html(menit + ':' + detik);
    });
}

function urlify(b) {
    var c = /(https?:\/\/[^\s]+)/g;
    return b.replace(c, function(a) {
        return '<a href="' + a + '" rel="nofollow" target="_BLANK">' + a + '</a>';
    });
}


function _timeSince(a) {
    var s = Math.floor((new Date() - a) / 1000),
        i = Math.floor(s / 31536000);
    if (i > 1) {
        return i + ' years ago';
    }
    i = Math.floor(s / 2592000);
    if (i > 1) {
        return i + ' months ago';
    }
    i = Math.floor(s / 86400);
    if (i > 1) {
        return i + ' days ago';
    }
    i = Math.floor(s / 3600);
    if (i > 1) {
        return i + ' hours ago';
    }
    i = Math.floor(s / 60);
    if (i > 1) {
        return i + ' minutes ago';
    }
    return Math.floor(s) + ' seconds ago';
}

function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
