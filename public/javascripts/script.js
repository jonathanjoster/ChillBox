function youtube_defer() {
  const iframe = document.querySelector('iframe');
  const url = iframe.getAttribute('data-src');
  if (url) {
    const id = url.split('watch?v=')[1];
    const embedUrl = 'https://www.youtube.com/embed/' + id;
    iframe.setAttribute('src', embedUrl);
  }
}
window.addEventListener('load', youtube_defer);