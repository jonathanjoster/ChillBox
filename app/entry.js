'use strict';
import $ from 'jquery';

/**
 * fetch data from DB, append new .music-wrapper asynchronously
 * データベースからデータを取得し、新しい.music-wrapperを非同期に追加する
 */
function showMore() {
  const showedCount = $('.border').data('showed');
  $('.border').data('showed', showedCount+1);

  $.post(`/?showed=${showedCount}`, musics => {
    if (musics.length === 0) {
      canScroll = false;
      return;
    }
    for (const music of musics) {
      let urlContent = 'URL';
      if (music.url.includes('youtube')) {
        urlContent = '<i class="fab fa-youtube">';
      } else if (music.url.includes('soundcloud')) {
        urlContent = '<i class="fab fa-soundcloud">';
      }

      let artist = '?'
      if (music.artist) {
        artist = music.artist;
      }
      
      let typeName = 'microphone-alt';
      if (music.type === 'instrument') {
        typeName = 'guitar';
      }

      let attribute = '-';
      if (music.attribute === 'comfortable') {
        attribute = $('<a href="/?search=1" onclick="sendPost(event, \'comfortable\')" class="comfortable">').text('comfortable');
      } else if (music.attribute === 'dark') {
        attribute = $('<a href="/?search=1" onclick="sendPost(event, \'dark\')" class="dark">').text('dark');
      }

      const m = {
        name: music.name,
        artist: artist,
        url: music.url,
        urlContent: urlContent,
        typeName: typeName,
        attribute: attribute
      }
      $('.list').append(createNewMusic(m));
    }
  })
}

/**
 * make new .music-wrapper from data
 * データから新しい.music-wrapperを作成する
 * @param {Object} music includes some data
 * @return {HTMLContent}
 */
function createNewMusic(music) {
  return $('<div class="music-wrapper rounded-pill text-center py-3 px-4 mt-3">', ).append(
    $('<div class="row">').append(
      $('<p class="col-12 col-sm-6 col-md-4 my-1">').append(
        $(`<a href="/music/${music.name}"></a>`).text(music.name)
      )
    ).append(
      $('<p class="col-6 col-md-2 my-1">').text(music.artist)
      )
    .append(
      $('<p class="col-6 col-sm-4 col-md-2 mb-0">').append(
        $(`<a href="${music.url}"></a>`).html(music.urlContent)
      )
    )
    .append(
      $('<p class="col-6 col-sm-4 col-md-2 mb-0">').append(
        $(`<i class="fas fa-${music.typeName}"></a>`)
      )
    )
    .append(
      $('<p class="col-6 col-sm-4 col-md-2 my-1">').append(
        music.attribute
      )
    )
  );
}

let canScroll = true;
$(document).scroll(() => {
  var target = $('.border').offset().top;
  var scroll = $(window).scrollTop();
  var height = $(window).height();

  // in accordance with scroll, show more contents
  if (scroll-200 > target-height && canScroll) {
    showMore();
  }
 });
