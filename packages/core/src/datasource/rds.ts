import BaseDataSource from './base';

const REPORT_URL = "https://work.bitou.tech/api/log";

function xhr(data: string) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", REPORT_URL, true);
  xhr.send(JSON.stringify(data) as any);
}

function sendBeacon(data: string) {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(REPORT_URL, "");
  }
}

function httpRequest(data: any) {
  // if (navigator) {
  //   sendBeacon(body);
  // } else {
  //   xhr(body);
  // }
  // 优化后的代码,不使用navigator.sendBeacon，直接使用xhr
  xhr(data);
}

export default class RdsAdapter extends BaseDataSource {
  constructor() {
    super();
  }
  public send(data: any): void {
    httpRequest(data);
  }
}
