"use strict";

function youtube_defer() {
  var iframe = document.querySelector('iframe');
  if (!iframe) { return; }
  var url = iframe.getAttribute('data-src');

  if (url.includes('youtube')) {
    var id = url.split('watch?v=')[1].split('&')[0];
    var embedUrl = 'https://www.youtube.com/embed/' + id;
    iframe.setAttribute('src', embedUrl);
  } else if (url.includes('soundcloud')) {
    var _embedUrl = 'https://w.soundcloud.com/player/?visual=true&url=' + url;
    iframe.setAttribute('src', _embedUrl);
  }
}

window.addEventListener('load', youtube_defer);