import {
  isBrowser,
  log,
} from 'utils';

import Tracer from './tracer';

function bootstrap(options?: CORE.BootstrapOptions) {
  const opts = options;
  const tracer = new Tracer(opts);
  // 设置重复试探挂载逻辑
  if (document.getElementsByTagName("body").length > 0) {
    // body 已挂载
    if (!window.bitou_tracer) {
      window.bitou_tracer = tracer;
    }
  } else {
    setTimeout(bootstrap, options?.threshold);
  }
}

function testBeforeHook() {
  log.info("before 001");
  log.info("before 002");
}

function testAfterHook() {
  log.info("after 001");
  log.info("after 002");
}

if (isBrowser) {
  const oldOnError = window.onerror;
  window.onerror = function (e) {
    log.error("row", "sdk 发生了错误");
    oldOnError && oldOnError(e);
  };
  try {
    bootstrap({
      beforeEachSendPV: testBeforeHook,
      afterEachSendPV: testAfterHook,
      threshold: 3000,
    });
  } catch (e) {
    log.error("sdk 初始化发生了错误", e as string);
  }
}
// 针对浏览器环境，直接挂载，npm 模式下 只导出对应方法

export default bootstrap;
