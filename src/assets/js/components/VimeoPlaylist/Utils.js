const Utils = (() => {
  return {


  /**
    * Fetch Data helper
    * @param {string || Request} url
    */
    fetchData(url) {
      return fetch(url)
        .then(res => {
          return res.json()
        })
        .then(json => {
          return json
        })
         .catch(ex => console.log('failed', ex))
    },

  /**
    * Create Fragment
    * Creates a document fragment from string of
    * html dom nodes without page reflow
    * @param {string} htmlStr
    * @param {string} tag - html tag
    * @param {string} className - element class name
    */
   createFrag(htmlStr, tag, className){
     let docFrag = document.createDocumentFragment()
     let fragDiv = document.createElement(tag)
     fragDiv.className += className

     fragDiv.innerHTML = htmlStr;
     docFrag.appendChild(fragDiv);

     return fragDiv
   },

   /**
    * String to MMSS time
    * Parses a string of secs into MMSS format
    * HHMMSS Probs isn't needed for this.
    */
   strToMMSS(str) {
      let secs = parseInt(str, 10)
      let hours   = Math.floor(secs / 3600)
      let minutes = Math.floor(secs / 60)
      let seconds = secs - (minutes * 60)
      if (minutes < 10) {minutes = "0"+minutes}
      if (seconds < 10) {seconds = "0"+seconds}

      return  minutes + ':' + seconds;
    }
  }
})()

export default Utils
