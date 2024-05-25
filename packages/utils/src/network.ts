const BITOU_NETWORK_SPEED = "bitou_network_speed";

function getSpeedWithAjax(url: string) {
  return new Promise((resolve, reject) => {
    let start = new Date().getTime();

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      let end = new Date().getTime();
      if (xhr.readyState == 4) {
        const file = new Blob([xhr.response]);
        const size = (file.size / 1000) as number;
        const speed = (size * 1000) / (end - start);
        resolve(speed);
      }
    };
    xhr.send(null);
  });
}

/**
 *获取网络速度
 *
 * @export
 * @param {boolean} [fresh=false] 是否需要重新获取
 * @return {*}
 */
export function getNetworkSpeed(fresh: boolean = false) {
  // const connection = navigator.connection;
  // if (connection && connection.downlink) {
  //   // 以兆位每秒为单位
  //   return connection.downlink;
  // }

  if (!fresh) {
    // TODO: 网速不需要每次都计算，可以缓存一下,存在localStorage中
    const speed = localStorage.getItem(BITOU_NETWORK_SPEED);
    if (speed) {
      return Promise.resolve(parseFloat(speed));
    }
  }

  //   兼容 downlink 不存在的情况
  const timers = 5;
  const imgUrl =
    "https://portal.volccdn.com/obj/volcfe/logo/appbar_logo_dark.2.svg";

  const speedArr = [];

  for (let i = 0; i < timers; i++) {
    speedArr.push(getSpeedWithAjax(imgUrl));
  }

  return Promise.all(speedArr).then((res: any) => {
    const ret = res.reduce((a: any, b: any) => a + b, 0) / speedArr.length;
    // TODO: 网速不需要每次都计算，可以缓存一下
    localStorage.setItem(BITOU_NETWORK_SPEED, JSON.stringify(ret));
    return ret;
  });
}
