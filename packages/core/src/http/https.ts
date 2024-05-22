// 1. 图片接口上传；2. sendBeacon接口上传

const REPORT_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.baidu.com'
    : 'http://localhost:4000';

function xhr(data: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', REPORT_URL, true);
  xhr.send();
}

function sendBeacon(data: string) {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(REPORT_URL, '');
  }
}

export default function httpRequest(data) {
  const body = normalizeBody(data);
  if (navigator) {
    sendBeacon(body);
  } else {
    xhr(body);
  }
}
function normalizeBody(data: Record<string, any>) {
  return encodeURIComponent(data.join(';'));
}
