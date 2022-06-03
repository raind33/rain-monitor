const  Parser = require('ua-parser-js');
class SendTracker{
  constructor() {
    this.url = ''
    this.xhr = new XMLHttpRequest()
  }
  send(data = {}) {
    const log = {...getExtraData(), ...data}
    console.log(log);
  }
}
function getExtraData() {
  return {
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent: new Parser().getResult()
  }
}
export default new SendTracker()