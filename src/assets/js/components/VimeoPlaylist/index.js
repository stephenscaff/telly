import VimeoPlaylist from './VimeoPlaylist.js'

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
      muted:    true,
      controls: true
    }
    let vids = new VimeoPlaylist('js-player', options).init()
})
