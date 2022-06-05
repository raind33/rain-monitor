export default function onload(cb) {
  if(document.readyState) {
    cb()
  } else {

    window.addEventListener('load', cb)
  }
}