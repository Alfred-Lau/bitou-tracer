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

export function getNetworkSpeed() {
  // const connection = navigator.connection;
  // if (connection && connection.downlink) {
  //   // 以兆位每秒为单位
  //   return connection.downlink;
  // }

  //   兼容 downlink 不存在的情况
  const timers = 5;
  const imgUrl =
    "https://portal.volccdn.com/obj/volcfe/logo/appbar_logo_dark.2.svg";

  const speedArr = [];

  for (let i = 0; i < timers; i++) {
    speedArr.push(getSpeedWithAjax(imgUrl));
  }

  return Promise.all(speedArr).then((res: any) => {
    return res.reduce((a: any, b: any) => a + b, 0) / speedArr.length;
  });
}
