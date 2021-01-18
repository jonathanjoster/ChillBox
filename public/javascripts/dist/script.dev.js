"use strict";

function youtube_defer() {
  var iframe = document.querySelector('iframe');
  var url = iframe.getAttribute('data-src');

  if (url) {
    var id = url.split('watch?v=')[1];
    var embedUrl = 'https://www.youtube.com/embed/' + id;
    iframe.setAttribute('src', embedUrl);
  }
}

window.addEventListener('load', youtube_defer);