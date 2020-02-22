# Telly! 📺📼

### A little app and js plugin using the Vimeo Player API to create a nonstop playlist of Vimeo Vids.

Telly was built to play dope Vimeo vids on the TV screens around the office... to inspire designers and stuff.

### Install

`npm i -D`

### Run

`gulp`

Fires up the app's Express server (currently via `gulp-live-server`) and opens your browser at [http://localhost:8000/](http://localhost:8000/).

### VimeoPlaylist.js

Made a plugin using the Vimeo stuff.
See `src/assets/js/components/VimeoPlaylist`

The plugin allows you to create a playlist of Vimeo Vid IDs, passed as an array to the plugin options or as a external data source (JSON file).


### Plugin Usage

*Markup*

```
<!-- Player -->
<div id="js-player"></div>

<!-- Playlist -->
<div class="js-playlist"></div>
```

*JS*

```
import VimeoPlaylist from './VimeoPlaylist.js'

let vids = new VimeoPlaylist('js-player', options).init()
```

*JS - External JSON File*
```
import VimeoPlaylist from './VimeoPlaylist.js'

/**
 * Init VimeoPlaylist class
 * Inside request of external data source
 */
const req = new Request('assets/data/playlist.json');

fetch(req)
  .then(response => response.json())
  .then(data => {
    let options = {
      playlist: data, // Hey data!
      muted: true,
      controls: true // etc...
    }
    let vids = new VimeoPlaylist('js-player', options).init()
})
```

*JSON - Example*

```
// Array of objects
[
  {
    "id": "288588748"
  },
  {
    "id": "328536852"
  },
  {
    "id": "281449879"
  }
  ....
```

*JS - Options*
```
VimeoPlaylist.options = {
  width: 1200,
  loop: false,
  title: false,
  muted: true,
  controls: true,
  autoplay: true,
  color:    '#7B8EF9',
  playlist: [
    {"id":"288588748"},
    {"id":"343513016"},
    {"id":"310394931"}
  ]
}
```

### ToDo

Make an admin page that just saves to a json file... Just simple node and Express stuff. Should be good enough for the intended purpose.
