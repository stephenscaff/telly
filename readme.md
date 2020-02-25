# Telly! 📼→📺

### A little app and js plugin using the Vimeo Player API to create a nonstop playlist of Vimeo Vids.

Telly was built to play dope Vimeo vids on the TV screens around the office... to inspire designers and stuff. The plugin can also be found in it' own repo: [vimeo-playlists.js](https://github.com/stephenscaff/vimeo-playlists)

### Install

`npm i -D`

### Run

`gulp`

Fires up the app's Express server (currently via `gulp-live-server`) and opens your browser at [http://localhost:8000/](http://localhost:8000/).

### VimeoPlaylist.js

Made a plugin using the Vimeo stuff.
See `src/assets/js/components/VimeoPlaylist`

Or, the separate repo [vimeo-playlists.js](https://github.com/stephenscaff/vimeo-playlists)

The plugin allows you to create a playlist of Vimeo Vids by passing vimeo ids to the plugin's `playlist` options.


## Plugin Usage

*Markup*

```
<!-- Player (main video embed)-->
<div id="js-player"></div>

<!-- Playlist (list of vids) -->
<div id="js-playlist"></div>
```

#### JS - Init Example with `playlist`

```
import VimeoPlaylist from './vimeo-playlist.js' (or whatever you add)

/**
 * Options
 * Internal playlist as array of objects { "id" : <vimeoid> }
 */
VimeoPlaylist.options = {
  width: 1200,
  muted: true,
  controls: true,
  autoplay: true,
  color: '#7B8EF9',
  fullscreenToggle: true,
  playlistOutput: '#js-playlist',
  playlist: [
    { "id": "288588748" },
    { "id": "328536852" },
    { "id": "281449879" }
  ]
}

let vids = new VimeoPlaylist('js-player', options).init()
```

#### JS Options - External JSON File
```
import VimeoPlaylist from './vimeo-playlist.js'

/**
 * Init VimeoPlaylist class
 * Inside request of external data source
 */
const req = new Request('assets/data/playlist.json') // external json of playlist

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

#### JSON File Example

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


## Options

| Option | Type | Description | Default |
| --- | --- | --- | --- |
| `hasPlaylist` | Boolean |  Make false if you need endless vids, but not playlist ui | `true` |
| `playlistOutput` | string | id or class to output playlist | `#js-playlist` |
| `playlist` | Array of Objects | playlist as array of objects { "id" : <vimeoid> } | `[]` |
| `width` | Number | Video width in px | `900` |
| `title` | Boolean | Show video title | `false` |
| `muted` | Boolean | Mute vids | `false` |
| `controls` | Boolean | Show player controls | `true` |
| `autoplay` | Boolean | Autoplay vids (required for continuous playlist vids) | `true` |
| `fullScreenToggle` | Boolean | Clicking  `Enter` triggers fullscreen vid | `false` |
| `color` | String (3 or 6 digit hex value) | Player ui color | `#7B8EF9` |


### ToDo

Make an admin page that just saves to a json file... Just simple node and Express stuff. Should be good enough for the intended purpose.
