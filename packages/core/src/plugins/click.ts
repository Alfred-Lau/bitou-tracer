import { log } from 'utils';
import Tracer from '../tracer';

function handlePageClick(this: any, e: MouseEvent): any {
  e.preventDefault();
  // @ts-ignore
  log.info(e.target!.tagName);
  this.call('click');
}

export default function (instance: Tracer, cb: handleType) {
  //1. 挂载相关绑定事件

  const fnWrapper = (e: MouseEvent) => {
    handlePageClick.call(instance, e);
  };
  instance.addEventListener(window, 'click', fnWrapper);
  cb && cb();
}
