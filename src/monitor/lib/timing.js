import onload from '../utils/onload'
import tracker from '../utils/tracker';
export default function timing() {
  let FMP, LCP
  new PerformanceObserver((entryList, observer) => {
    const perfEntries = entryList.getEntries()
    FMP = perfEntries[0]
    observer.disconnect() // 不再观察
  }).observe({ entryTypes: ['element'] }) // 观察页面中有意义的元素
  new PerformanceObserver((entryList, observer) => {
    const perfEntries = entryList.getEntries()
    LCP = perfEntries[0]
    observer.disconnect() // 不再观察
  }).observe({ entryTypes: ['largest-contentful-paint'] }) // 观察页面中最大的元素
  new PerformanceObserver((entryList, observer) => {
    const firstInput = entryList.getEntries()
    console.log('FID', firstInput);
    if(firstInput) {
      let inputDelay = firstInput.processingStart - firstInput.startTime
      const duration = firstInput.duration
      if(inputDelay > 0 ||  duration >0) {
        tracker.send({
          kind: 'experience',
          type: 'firstInputDelay',
          inputDelay, // 延迟时间
          duration, // 处理时间
          startTime: firstInput.startTime
        })
      }
    }
    observer.disconnect() // 不再观察
  }).observe({ type: 'first-input', buffered: true }) // 观察页面中最大的元素
  onload(function() {
    setTimeout(() => {
      console.dir(window.performance);
      const {
        fetchStart,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart,
        loadEventEnd
      } = performance.getEntriesByType('navigation')[0]
      tracker.send({
        kind: 'experience',
        type: 'timing',
        connectTime: connectEnd - connectStart, // 连接时间
        ttfbTime: responseStart - requestStart, // 首字节到达时间
        responseTime: responseEnd - responseStart, // 响应的读取时间
        domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
        timeToInteractive: domInteractive - fetchStart,// 首次可交互时间
        loadTime: loadEventStart - fetchStart // 完整的页面加载时间
      })
      let FP = performance.getEntriesByName('first-paint')[0]
      let FCP = performance.getEntriesByName('first-contentful-paint')[0]
      console.log('FP', FP);
      console.log('FCP', FCP);
      console.log('FMP', FMP);
      console.log('LCP', LCP);
      tracker.send({
        kind: 'experience',
        type: 'paint',
        FP: FP.startTime, 
        FCP: FCP.startTime,
        FMP: FMP.startTime, 
        LCP: LCP.startTime,
      })
    }, 3000);
  })
}