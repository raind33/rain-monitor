let lastEvent

['click', 'touchstart','mousedown','keydown','mouseover'].forEach(type => {
  document.addEventListener(type, (e) => {
    lastEvent = e
  }, {
    passive: true,
    capture: true
  })
})

export default () => {
  return lastEvent
}