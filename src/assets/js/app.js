import Utils from './components/Utils.js'
import VimeoPlaylist from './components/VimeoPlaylist.js'
const req = new Request('assets/data/playlist.json');

fetch(req)
  .then(response => response.json())
  .then(data => {
    let options = {
      playlist: data,
      muted: true,
      controls: true
    }
    let vids = new VimeoPlaylist('js-player', options).init()
})
