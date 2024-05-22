import { log } from 'utils';
import Tracer from '../tracer';

// 进行页面性能采集上报
function calcPagePerformance(this: any, e: Event): any {
  e.preventDefault();
  // @ts-ignore
  log.info(e.target!.tagName);
  this.call('performance');
}

export default function (instance: Tracer, cb: handleType) {
  //1. 挂载相关绑定事件

  const fnWrapper = (e: Event) => {
    calcPagePerformance.call(instance, e);
  };
  instance.addEventListener(window, 'load', fnWrapper);
  cb && cb();
}
