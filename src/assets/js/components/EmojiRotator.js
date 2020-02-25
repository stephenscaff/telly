/**
 * Emojis Roator
 * Just For Fun
 */
const EmojiRotator = (() => {
  const el = document.querySelector('.js-emoji')
  const emojis = ["📺","📼", "📷", "📸", "🦄", "💾", "🍜", "🥡"]
  //const emojis = ["😀", "😮",  "😬", "😁", "😐", "😑"]
  const time = 310

  setInterval(_=>{
    el.innerHTML =[
      ...emojis
    ][new Date%emojis.length]
  }, time)
})()

export default EmojiRotator
