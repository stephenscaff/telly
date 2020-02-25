"use strict"

import VimeoPlaylist from './vimeo-playlist.js'

/**
 * init VimeoPlaylist class
 * Inside request of external data source
 */
const req = new Request('assets/data/playlist.json');

fetch(req)
  .then(response => response.json())
  .then(data => {
    let options = {
      playlist: data,
      hasPlaylist: true,
      playlistOutput: '#js-playlist',
      muted:    true,
      controls: true,
      fullScreenToggle: true,
      color: "#7B8EF9"
    }
    let vids = new VimeoPlaylist('js-player', options).init()
})
