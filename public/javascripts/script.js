function youtube_defer() {
  const iframe = document.querySelector('iframe');
  const url = iframe.getAttribute('data-src');
  if (url.includes('youtube')) {
    const id = url.split('watch?v=')[1];
    const embedUrl = 'https://www.youtube.com/embed/' + id;
    iframe.setAttribute('src', embedUrl);
  } else if (url.includes('soundcloud')) {
    const embedUrl = 'https://w.soundcloud.com/player/?visual=true&url=' + url;
    iframe.setAttribute('src', embedUrl);
  }
}
window.addEventListener('load', youtube_defer);