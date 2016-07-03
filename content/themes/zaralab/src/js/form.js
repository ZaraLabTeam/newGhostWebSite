/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(t):this[e]=t()}("domready",function(){var e=[],t,n=document,r=n.documentElement.doScroll,i="DOMContentLoaded",s=(r?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return s||n.addEventListener(i,t=function(){n.removeEventListener(i,t),s=1;while(t=e.shift())t()}),function(t){s?t():e.push(t)}})


/*
	Copyright (c) 2014 Odamae by Phantoms
	see: http://odamae.io
		 http://phantomus.com
*/

var vCaptcha = null;
var apiPath = 'https://odamae.io/api';
var contentPath = "https://odamae.io/form";

function getApiPath(url) {
	return apiPath + url;
}

function getContentPath(url) {
	return contentPath + url;
}

function odamaeExecuteAfterLoad(callback) {
	setTimeout(function() {
		var captcha = vCaptcha.data('captcha');
		if (!captcha.isLoading()) {
			callback();
		} else {
			odamaeExecuteAfterLoad(callback);
		}
	}, 50);
}

/*** execute failed ***/
function errorExecuting() {
	$('.visualCaptcha').prepend('<div class="visualCaptchaStatus error">Error occured while executing your request. Please try again.</div>');
}

/*** invlid captcha was sent, return code '3' ***/
function invalidCaptcha() {
	$('.visualCaptcha').prepend('<div class="visualCaptchaStatus error">Invalid option selected. Please try again.</div>');
}

/*** required fields are missing (contact, message, apiKey), return code '1' ***/
function missingFields() {
	$('.visualCaptcha').prepend('<div class="visualCaptchaStatus error">Please fill in all of the information on the form and try again.</div>');
}

/*** no captcha was selected ***/
function mustSelect() {
	$('.visualCaptcha').prepend('<div class="visualCaptchaStatus error">Please select option below to submit form.</div>');
}

/*** invalid api key specified, return code '2' ***/
function apiKeyInvalid() {
	$('.visualCaptcha').prepend('<div class="visualCaptchaStatus error">Odamae user not found. Please check your api key.</div>');
}

/*** unknown error,  return code '9' ***/
function unknownError() {
	$('.visualCaptcha').prepend('<div class="visualCaptchaStatus error">Service currently unavailable. Please try again later.</div>');
}


function odamaeSubmit(b) {

	$('.visualCaptchaStatus').remove();
	var captcha = vCaptcha.data('captcha');
	var sel = captcha.getCaptchaData();
	if (!sel || !sel.valid) {
		if (window.invalidInput) {
			return window.invalidInput();
		} else {
			return mustSelect();
		}
	}

	var data = {};
	data[sel.name] = sel.value;
	data['apiKey'] = 'odamae.io_c65182077331d9b05106acd6017dd27d_4a4a';

	$('.odamae-input, .odamae-textarea').each(function(i,v) {
		data[$(v).attr('id')] = ($(v).val() || $(v).text());
	});

	if (window.odamaeValidateInput && !window.odamaeValidateInput(data)) {
		return false;
	}

	if (window.odamaeBeforeLoad) {
		window.odamaeBeforeLoad();
	} else {
		$(b).val('Please wait...');
	}

	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: getApiPath('/contact/light/do') + '?oid=' + window.odamaeCaptchaId,
        data: data,
        success: function (e) {
			captcha.refresh();

			if (window.odamaeComplete) {
				return odamaeExecuteAfterLoad(function() {
					window.odamaeComplete(e);
				});
			}

			$(b).val('Send message');
            if (e == '1') {
                odamaeExecuteAfterLoad(missingFields);
			} else if (e == '2') {
				odamaeExecuteAfterLoad(apiKeyInvalid);
			} else if (e == '3') {
				odamaeExecuteAfterLoad(invalidCaptcha);
			} else if (e == '9') {
				odamaeExecuteAfterLoad(unknownError);
			} else if (e == '0') {
				sent(b);
            } else {
				odamaeExecuteAfterLoad(function() {
					$('.visualCaptcha').prepend('<div class="visualCaptchaStatus error">' + e + '</div>');
				});
			}
        },
		error: function(r) {
			captcha.refresh();
			if (window.odamaeError) {
				return window.odamaeError(e);
			} else {
				$(b).val('Send message');
				if (r.responseText && isNaN(parseInt(r.responseText))) {
					odamaeExecuteAfterLoad(function() {
						$('.visualCaptcha').prepend('<div class="visualCaptchaStatus error">' + r.responseText + '</div>');
					});
				} else {
					odamaeExecuteAfterLoad(errorExecuting);
				}
			}
		}
    });
}

function sent(b) {
	var $b = $(b);
	var bc = $b.css('background-color'), val = $b.val();
	$b.addClass('success').val('Message sent');
	$('.odamae-input, .odamae-textarea').val('');
	setTimeout(function() {
		$b.removeClass('success').val(val);
	}, 3000);
}

domready(function () {

	/*! visualCaptcha - v0.0.5 - 2014-03-13
	* http://visualcaptcha.net
	* Copyright (c) 2014 emotionLoop; Licensed MIT */

	/**
	 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
	 * Available via the MIT or new BSD license.
	 * see: http://github.com/jrburke/almond for details
	 */

	(function(e,t){typeof define=="function"&&define.amd? define(["jquery"],t): t(e.jQuery)})(this,function(e){var t,n,r;(function(e){function i(e, t){return w.call(e,t)}function s(e, t){var n,r,i,s,o,u,a,f,l,c,h,p=t&&t.split("/"),d=y.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=e.split("/"),o=e.length-1,y.nodeIdCompat&&S.test(e[o])&&(e[o]=e[o].replace(S,"")),e=p.concat(e);for(l=0; l<e.length; l+=1){h=e[l];if(h===".")e.splice(l,1),l-=1;else if(h===".."){if(l===1&&(e[2]===".."||e[0]===".."))break;l>0&&(e.splice(l-1,2),l-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(l=n.length;l>0;l-=1){r=n.slice(0,l).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,u=l;break}}}if(s)break;!a&&v&&v[r]&&(a=v[r],f=l)}!s&&a&&(s=a,u=f),s&&(n.splice(0,u,s),e=n.join("/"))}return e}function o(t,n){return function(){return p.apply(e,E.call(arguments,0).concat([t,n]))}}function u(e){return function(t){return s(t,e)}}function a(e){return function(t){m[e]=t}}function f(t){if(i(g,t)){var n=g[t];delete g[t],b[t]=!0,h.apply(e,n)}if(!i(m,t)&&!i(b,t))throw new Error("No "+t);return m[t]}function l(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function c(e){return function(){return y&&y.config&&y.config[e]||{}}}var h,p,d,v,m={},g={},y={},b={},w=Object.prototype.hasOwnProperty,E=[].slice,S=/\.js$/;d=function(e,t){var n,r=l(e),i=r[0];return e=r[1],i&&(i=s(i,t),n=f(i)),i?n&&n.normalize?e=n.normalize(e,u(t)):e=s(e,t):(e=s(e,t),r=l(e),i=r[0],e=r[1],i&&(n=f(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},v={require:function(e){return o(e)},exports:function(e){var t=m[e];return typeof t!="undefined"?t:m[e]={}},module:function(e){return{id:e,uri:"",exports:m[e],config:c(e)}}},h=function(t,n,r,s){var u,l,c,h,p,y=[],w=typeof r,E;s=s||t;if(w==="undefined"||w==="function"){n=!n.length&&r.length?["require","exports","module"]:n;for(p=0;p<n.length;p+=1){h=d(n[p],s),l=h.f;if(l==="require")y[p]=v.require(t);else if(l==="exports")y[p]=v.exports(t),E=!0;else if(l==="module")u=y[p]=v.module(t);else if(i(m,l)||i(g,l)||i(b,l))y[p]=f(l);else{if(!h.p)throw new Error(t+" missing "+l);h.p.load(h.n,o(s,!0),a(l),{}),y[p]=m[l]}}c=r?r.apply(m[t],y):undefined;if(t)if(u&&u.exports!==e&&u.exports!==m[t])m[t]=u.exports;else if(c!==e||!E)m[t]=c}else t&&(m[t]=r)},t=n=p=function(t,n,r,i,s){if(typeof t=="string")return v[t]?v[t](n):f(d(t,n).f);if(!t.splice){y=t,y.deps&&p(y.deps,y.callback);if(!n)return;n.splice?(t=n,n=r,r=null):t=e}return n=n||function(){},typeof r=="function"&&(r=i,i=s),i?h(e,t,n,r):setTimeout(function(){h(e,t,n,r)},4),p},p.config=function(e){return p(e)},t._defined=m,r=function(e,t,n){t.splice||(n=t,t=[]),!i(m,e)&&!i(g,e)&&(g[e]=[e,t,n])},r.amd={jQuery:!0}})(),r("almond",function(){}),r("visualcaptcha/core",[],function(){var e,t,n,r,i,s,o,u;return e=function(e,t,n){return n=n||[],e.namespace&&e.namespace.length>0&&n.push(e.namespaceFieldName+"="+e.namespace),n.push(e.randomParam+"="+e.randomNonce),n.push("oid="+(window.odamaeCaptchaId?window.odamaeCaptchaId:"none")),t+"?"+n.join("&")},t=function(e){var t=this,r;e.applyRandomNonce(),e.isLoading=!0,r=n(e),e.callbacks.loading&&e.callbacks.loading(t),e.request(r,function(n){n.audioFieldName&&(e.audioFieldName=n.audioFieldName),n.imageFieldName&&(e.imageFieldName=n.imageFieldName),n.imageName&&(e.imageName=n.imageName),n.values&&(e.imageValues=n.values),e.isLoading=!1,e.hasLoaded=!0,e.callbacks.loaded&&e.callbacks.loaded(t)})},n=function(t){var n=t.url+t.routes.start+"/"+t.numberOfImages;return e(t,n)},r=function(t,n){var r="",i=[];return n<0||n>=t.numberOfImages?r:(this.isRetina()&&i.push("retina=1"),r=t.url+t.routes.image+"/"+n,e(t,r,i))},i=function(t,n){var r=t.url+t.routes.audio;return n&&(r+="/ogg"),e(t,r)},s=function(e,t){return t>=0&&t<e.numberOfImages?e.imageValues[t]:""},o=function(){return window.devicePixelRatio!==undefined&&window.devicePixelRatio>1},u=function(){var e,t=!1;try{e=document.createElement("audio"),e.canPlayType&&(t=!0)}catch(n){}return t},function(e){var n,a,f,l,c,h,p,d,v,m,g,y,b;return a=function(){return t.call(this,e)},f=function(){return e.isLoading},l=function(){return e.hasLoaded},c=function(){return e.imageValues.length},h=function(){return e.imageName},p=function(t){return s.call(this,e,t)},d=function(t){return r.call(this,e,t)},v=function(t){return i.call(this,e,t)},m=function(){return e.imageFieldName},g=function(){return e.audioFieldName},y=function(){return e.namespace},b=function(){return e.namespaceFieldName},n={refresh:a,isLoading:f,hasLoaded:l,numberOfImages:c,imageName:h,imageValue:p,imageUrl:d,audioUrl:v,imageFieldName:m,audioFieldName:g,namespace:y,namespaceFieldName:b,isRetina:o,supportsAudio:u},e.autoRefresh&&n.refresh(),n}}),r("visualcaptcha/xhr-request",[],function(){var e=window.XMLHttpRequest;return function(t,n){var r=new e;r.open("GET",t,!0),r.onreadystatechange=function(){var e;if(r.readyState!==4||r.status!==200)return;e=JSON.parse(r.responseText);if(e.odamaeCaptchaId){window.odamaeCaptchaId=e.odamaeCaptchaId}n(e)},r.send()}}),r("visualcaptcha/config",["visualcaptcha/xhr-request"],function(e){return function(t){var n=[];var r={request:e,url:n.join("/").slice(0,-1),namespace:"",namespaceFieldName:"namespace",routes:{start:"/start",image:"/image",audio:"/audio"},isLoading:!1,hasLoaded:!1,autoRefresh:!0,numberOfImages:6,randomNonce:"",randomParam:"r",audioFieldName:"",imageFieldName:"",imageName:"",imageValues:[],callbacks:{}};return r.applyRandomNonce=function(){return r.randomNonce=Math.random().toString(36).substring(2)},t.request&&(r.request=t.request),t.url&&(r.url=t.url),t.namespace&&(r.namespace=t.namespace),t.namespaceFieldName&&(r.namespaceFieldName=t.namespaceFieldName),typeof t.autoRefresh!="undefined"&&(r.autoRefresh=t.autoRefresh),t.numberOfImages&&(r.numberOfImages=t.numberOfImages),t.routes&&(t.routes.start&&(r.routes.start=t.routes.start),t.routes.image&&(r.routes.image=t.routes.image),t.routes.audio&&(r.routes.audio=t.routes.audio)),t.randomParam&&(r.randomParam=t.randomParam),t.callbacks&&(t.callbacks.loading&&(r.callbacks.loading=t.callbacks.loading),t.callbacks.loaded&&(r.callbacks.loaded=t.callbacks.loaded)),r}}),r("visualcaptcha",["require","visualcaptcha/core","visualcaptcha/config"],function(e){var t=e("visualcaptcha/core"),n=e("visualcaptcha/config");return function(e){return e=e||{},t(n(e))}}),r("visualcaptcha/templates",[],function(){var e,t,n,r,i,s,o;return e=function(e,t){for(var n in t)e=e.replace(new RegExp("{"+n+"}","g"),t[n]);return e},t=function(t,n,r){var i,s,o,u;return i='<div class="visualCaptcha-accessibility-button"><img src="'+getContentPath("/")+'{path}accessibility{retinaExtra}.png" title="{accessibilityTitle}" alt="{accessibilityAlt}" /></div>',s='<div class="visualCaptcha-refresh-button"><img src="'+getContentPath("/")+'{path}refresh{retinaExtra}.png" title="{refreshTitle}" alt="{refreshAlt}" /></div>',o='<div class="visualCaptcha-button-group">'+s+(t.supportsAudio()?i:"")+"</div>",u={path:r||"",refreshTitle:n.refreshTitle,refreshAlt:n.refreshAlt,accessibilityTitle:n.accessibilityTitle,accessibilityAlt:n.accessibilityAlt,retinaExtra:t.isRetina()?"@2x":""},e(o,u)},n=function(t,n){var r,i;return t.supportsAudio()?(r='<div class="visualCaptcha-accessibility-wrapper visualCaptcha-hide"><div class="accessibility-description">{accessibilityDescription}</div><audio preload="preload"><source src="{audioURL}" type="audio/ogg" /><source src="{audioURL}" type="audio/mpeg" /></audio></div>',i={accessibilityDescription:n.accessibilityDescription,audioURL:t.audioUrl(),audioFieldName:t.audioFieldName()},e(r,i)):""},r=function(t,n){var r="",i,s;for(var o=0,u=t.numberOfImages();o<u;o++)i='<div class="img"><img src="{imageUrl}" id="visualCaptcha-img-{i}" data-index="{i}" alt="" title="" /></div>',s={imageUrl:t.imageUrl(o),i:o},r+=e(i,s);return i='<p class="visualCaptcha-explanation">{explanation}</p><div class="visualCaptcha-possibilities">{images}</div>',s={imageFieldName:t.imageFieldName(),explanation:n.explanation.replace(/ANSWER/,t.imageName()),images:r},e(i,s)},i=function(t){var n,r;return n='<input class="form-control audioField" type="text" name="{audioFieldName}" value="" autocomplete="off" />',r={audioFieldName:t.audioFieldName()},e(n,r)},s=function(t,n){var r,i;return r='<input class="form-control imageField" type="hidden" name="{imageFieldName}" value="{value}" readonly="readonly" />',i={imageFieldName:t.imageFieldName(),value:t.imageValue(n)},e(r,i)},o=function(t){var n,r,i=t.namespace();return!i||i.length===0?"":(n='<input type="hidden" name="{fieldName}" value="{value}" />',r={fieldName:t.namespaceFieldName(),value:i},e(n,r))},{buttons:t,accessibility:n,images:r,audioInput:i,imageInput:s,namespaceInput:o}}),r("visualcaptcha/language",[],function(){return{accessibilityAlt:"Sound icon",accessibilityTitle:"Accessibility option: listen to a question and answer it!",accessibilityDescription:"Type below the <strong>answer</strong> to what you hear. Numbers or words:",explanation:"Click or touch the <strong>ANSWER</strong>",refreshAlt:"Refresh/reload icon",refreshTitle:"Refresh/reload: get new images and accessibility option!"}}),r("visualcaptcha.jquery",["jquery","visualcaptcha","visualcaptcha/templates","visualcaptcha/language"],function(e,t,n,r){var i,s,o,u,a,f,l;i=function(t,n){e.get(t,n,"json")},s=function(){},o=function(e,t,r){var i;i=n.namespaceInput(r)+n.accessibility(r,e.language)+n.images(r,e.language)+n.buttons(r,e.language,e.imgPath),t.html(i)},u=function(){var t=e(this).closest(".visualCaptcha"),r=t.find(".visualCaptcha-accessibility-wrapper"),i=t.find(".visualCaptcha-possibilities"),s=t.find(".visualCaptcha-explanation"),o=r.find("audio"),u;r.hasClass("visualCaptcha-hide")?(i.toggleClass("visualCaptcha-hide"),s.toggleClass("visualCaptcha-hide"),i.find(".img").removeClass("visualCaptcha-selected"),s.find("input").val(""),u=n.audioInput(t.data("captcha")),e(u).insertBefore(o),r.toggleClass("visualCaptcha-hide"),o[0].load(),o[0].play()):(o[0].pause(),r.toggleClass("visualCaptcha-hide"),r.find("input").remove(),s.toggleClass("visualCaptcha-hide"),i.toggleClass("visualCaptcha-hide"))},a=function(){var t=e(this),r=t.closest(".visualCaptcha"),i=r.find(".visualCaptcha-possibilities"),s=r.find(".visualCaptcha-explanation"),o,u,a;u=s.find("input"),u&&(u.remove(),i.find(".img").removeClass("visualCaptcha-selected")),t.addClass("visualCaptcha-selected"),o=t.find("img").data("index"),a=n.imageInput(r.data("captcha"),o),s.append(e(a))},f=function(){var t=e(this).closest(".visualCaptcha");t.data("captcha").refresh()},l=function(e){var t=e.find(".imageField"),n=e.find(".audioField"),r=!!t.val()||!!n.val();return r?{valid:r,name:t.val()?t.attr("name"):n.attr("name"),value:t.val()?t.val():n.val()}:{valid:r}},e.fn.visualCaptcha=function(n){var c;return c=e.extend({imgPath:"/",language:r,captcha:{request:i}},n),this.addClass("visualCaptcha").on("click",".visualCaptcha-accessibility-button",u).on("click",".visualCaptcha-refresh-button",f).on("click",".visualCaptcha-possibilities .img",a),this.each(function(){var n=e(this),r,i;i=e.extend(c.captcha,{callbacks:{loading:s.bind(null,c,n),loaded:o.bind(null,c,n)}}),typeof n.data("namespace")!="undefined"&&(i.namespace=n.data("namespace")),r=t(i),r.getCaptchaData=l.bind(null,n),n.data("captcha",r)})}}),r("jquery",function(){return e}),n("visualcaptcha.jquery")});

  //comment this for load our css
	// var loadCss = $('#odamae-use-css').val();
  //
	// if (!loadCss || (loadCss && loadCss == 'true')) {
  //
	// 	function cssLoaded(data) {
	// 		$("head").append("<style>" + data + "</style>");
	// 		$('#odamae-contact-form').fadeIn();
	// 	}
  //
	// 	$.ajax({
  //           url: getContentPath('/css/dark-style.css'),
  //           dataType:"text/css",
  //           success:function(data){
	// 			cssLoaded(data);
  //           },
	// 		error: function(r,ts,er) {
	// 			if (r.status === 304 || r.status === 200) {
	// 				cssLoaded(r.responseText);
	// 			} else {
	// 				alert('There was an error loading contact form. ' + er);
	// 			}
	// 		}
  //       });
	// } else {
	// 	$('#odamae-contact-form').fadeIn();
	// }

  $('#odamae-contact-form').fadeIn();

	$('#odamae-contact-form').submit(function(e){
		 e.preventDefault();
		 return false;
	});

	var apiKey = 'odamae.io_c65182077331d9b05106acd6017dd27d_4a4a';
	//console.log(apiKey);
	vCaptcha = $( '.visual-captcha' ).visualCaptcha({
		imgPath: 'images/',
		captcha: {
			numberOfImages: 5,
			routes: {
				start: getApiPath('/captcha/light/start'),
				image: getApiPath('/captcha/light/image'),
				audio: getApiPath('/captcha/light/audio')
			}
		}
	});


});
