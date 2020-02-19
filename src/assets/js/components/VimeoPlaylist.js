import Player from '@vimeo/player';

/**
 * ViemoPlaylist
 * Class for interacting with the Vimeo API
 * to create a continous playlist of vids
 * @class
 * @requires @vimeo/player
 * @param {html element id} el - player element passed to Vimeo's imported Player class.
 * @param {object} options - plugin options for api and playlist ids
 */
function VimeoPlaylist(el, options) {
  options = options || {};
  Object.assign(this, VimeoPlaylist.options, options);

  this.currentVidIdx = 0
  this.vidCount = this.playlist.length,
    this.wrapperEl = el;

  this.player = new Player(el, {
    id: this.playlist[this.currentVidIdx].id,
    width: this.width,
    title: this.title,
    muted: this.muted,
    controls: this.controls,
    autoplay: this.autoplay
  });

  console.log(this.player)
}

/**
 * VimeoPlaylist Methods
 */
VimeoPlaylist.prototype = {
  constructor : VimeoPlaylist,

  /**
   * Begin sequence and onEnd listeners
   */
  init() {

    // Autoplay
    this.settings()
    this.listeners()
    this.player['play']()
   },

   settings() {
     this.player.setVolume(0);
     this.player.setAutopause(false)
   },

   /**
    * Listeners
    */
   listeners() {

     // Click Enter to go Fullscreen
     // Nah, this is fake, vimeo fullscreen is not the browser fullscreen
     // document.addEventListener("keypress", (e)=> {
     //   if (e.keyCode === 13) {
     //     this.toggleFullscreen();
     //   }
     // }, false);

     // Progress on Video End
     this.onEnd()
   },


  /**
   * LoadVid
   * Helper to load vimeo vids by their ID
   * @param {string} id - vimeo video id
   */
  loadVid(id) {
    this.player.loadVideo(id)
    setTimeout(() => {
        //this.player['play']()
      }, 100)
  },

  /**
   * OnEnd
   * Listens for when a vid ends.
   */
  onEnd() {
    this.player.on('ended', () =>  {
      this.next()
    });
  },

  /**
   * Next
   * Tracks current video index and progress to next.
   */
  next() {
    console.log('next vid')
    this.currentVidIdx++;
    if (this.currentVidIdx < this.vidCount){
      this.currentVidIdx+1;
    } else {
      this.currentVidIdx = 0;
    }
    this.loadVid(this.playlist[this.currentVidIdx])
  },


  /**
   * Prev
   * Not in use yet, but we may want an actual playlist at some point
   * Or, at least the ability to go forward and backward.
   */
  prev() {},

  /**
   * Toggle Fullscreen
   * This is bs. Looks like vimeo uses a different
   * fullscreen than native requestFullscreen.
   * Leaving here until I figure that out.
   */
  toggleFullscreen() {
    let vidWrapper = this.wrapperEl
    if (!document.vidWrapper) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}

/**
 * VimeoPlaylist Options
 * Default options
 */
VimeoPlaylist.options = {
  width: 1200,
  loop: false,
  title: false,
  muted: true,
  controls: true,
  autoplay: true,
  playlist: [
    {"id":"229056408"},
    {"id":"271357892"},
    {"id":"271354428"}
  ]
}

//let vids = new VimeoPlaylist('js-player').init()
export default VimeoPlaylist
