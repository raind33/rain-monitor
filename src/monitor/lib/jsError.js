import getLastEvent from "../utils/getLastEvent"
import track from '../utils/tracker'
export function injectJsError () {
  window.addEventListener('error', (e) => {
    // const lastEvent = getLastEvent()
    console.log(e);
    if(e.target && (e.target.src||e.target.href)) {
      track.send({
        kind: 'stability',
        type: 'error',
        errorType: 'resourceError',
        filename: e.target.src||e.target.href,
        tagName: e.target.tagName
        // selector: lastEvent ? get
      })
      return
    }
    track.send({
      kind: 'stability',
      type: 'error',
      errorType: 'jsError',
      message: e.message,
      filename: e.filename,
      position: `${e.lineno}:${e.colno}`,
      stack: e.error.stack,
      // selector: lastEvent ? get
    })
  }, true)

  window.addEventListener('unhandledrejection', (e) => {
    let message, filename, line, column, stack
    let reason = e.reason
    if(typeof reason === 'string') {
      message = reason
    } else if (typeof reason === 'object') {
      if(reason.stack) {
        const matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
        filename = matchResult[1]
        line = matchResult[2]
        column = matchResult[3]
      }
      message = reason.message
      stack = reason.stack
    }
    track.send( {
      kind: 'stability',
      type: 'error',
      errorType: 'promiseError',
      message,
      filename,
      position: `${line}:${column}`,
      stack
      // selector: lastEvent ? get
    })
  })
}