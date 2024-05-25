import { log } from 'utils';

import Tracer from '../tracer';

  let dns = 0
  let tcp = 0
  let http = 0
  let dom = 0
  let load = 0

  let fp = 0; // first-paint
  let fcp = 0; // first-contentful-paint
  let lcp = 0; // largest-contentful-paint
  let ttfb = 0

  function callback(list, perf) {

    list.getEntries().forEach(timing => {
      if (timing.name === 'first-paint') {
        fp = timing.startTime;
      } else if (timing.name === 'first-contentful-paint') {
        fcp = timing.startTime;
      } else if (timing.entryType === 'largest-contentful-paint') {
        lcp = timing.startTime;
      } else if (timing.entryType === 'navigation') {
        ttfb = timing.responseStart
      }
      if (timing.entryType === 'navigation') {
        dns = timing.domainLookupEnd - timing.domainLookupStart;
        tcp = timing.connectEnd - timing.connectStart;
        http = timing.responseEnd - timing.requestStart;
        dom = timing.domComplete - timing.domInteractive;
        load = timing.loadEventEnd - timing.loadEventStart;
      }
    });
    // 有任何非空数据，即进行上报
    if (fp & fcp & lcp & ttfb) {
      sendPerformance({
        dns,
        tcp,
        http,
        dom,
        load,
        fp,
        fcp,
        lcp,
        ttfb
      })
    }

  }
  // 回调函数会被多次触发
  const observer = new PerformanceObserver(callback);
  observer.observe({
    // entryTypes: ['longtask', 'frame', 'navigation', 'resource', 'mark', 'measure', 'paint']
    entryTypes: ['longtask', 'navigation', 'paint', 'largest-contentful-paint']
  });

// 进行页面性能采集上报
function calcPagePerformance(this: any, e: Event): any {
  e.preventDefault();
  // @ts-ignore
  log.info(e.target!.tagName);
  // this.call('performance');
}

export default function (instance: Tracer, cb: handleType) {
  //1. 挂载相关绑定事件

  const fnWrapper = (e: Event) => {
    calcPagePerformance.call(instance, e);
  };
  instance.addEventListener(window, "load", fnWrapper);
  cb && cb();
}
