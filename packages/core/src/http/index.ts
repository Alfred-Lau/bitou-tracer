import { isBrowser, cookie, log } from 'utils';
import { ALiYunSLSAddress, CSRF_AUTHORIZATION_KEY } from 'utils';
import tracker from '../sls';

const _csrf_authentication =
  cookie.getCookie(CSRF_AUTHORIZATION_KEY) || 'OY3i2d-Dp9C2wGe14EslzT61';

function genImgUrl(url: string, data: any) {
  const formatted = JSON.stringify(data);
  return `${url}${formatted}&_csrf=${_csrf_authentication}`;
}

function basicHttp(url: string, data: any) {
  const img = document?.createElement('img');
  img.src = genImgUrl(url, data);
  img.style.display = 'none';
  document.body.appendChild(img);
}

export default function (
  data: SimpleEventPayloadType,
  throughAPI: boolean = false // 默认使用日志上传
) {
  try {
    if (!throughAPI) {
      tracker.send(data);
      return;
    } else {
      if (isBrowser) {
        if (navigator.sendBeacon) {
          // sendBeacon 支持
          return navigator.sendBeacon(ALiYunSLSAddress, JSON.stringify(data));
        } else {
          return basicHttp(
            `${ALiYunSLSAddress}&_csrf=${_csrf_authentication}`,
            data
          );
        }
      }
    }
  } catch (e) {
    log.error('http 模块发生了错误', 'http');
  }
}
