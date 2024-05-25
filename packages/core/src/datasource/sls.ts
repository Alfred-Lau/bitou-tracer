import SLS from '@aliyun-sls/web-track-browser';

import BaseDataSource from './base';

const opts = {
  host: "cn-beijing.log.aliyuncs.com", // 所在地域的服务入口。例如cn-hangzhou.log.aliyuncs.com
  project: "maidian-demo", // Project名称。
  logstore: "maidan-log-store", // Logstore名称。
  time: 10, // 发送日志的时间间隔，默认是10秒。
  count: 10, // 发送日志的数量大小，默认是10条。
  topic: "bitou", // 自定义日志主题。
  source: "source",
  tags: {
    tags: "tags",
  },
};

export default class SlsAdapter extends BaseDataSource {
  private tracker: SLS;
  constructor() {
    super();
    this.tracker = new SLS(opts);
  }
  public send(data: any): void {
    this.tracker.send(data);
  }
}
