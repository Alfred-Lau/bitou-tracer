const ERROR_TIMEOUT = "timeout";

export const ERROR_MAP = {
  [ERROR_TIMEOUT]: "ERROR_TIMEOUT",
};

/**
 * 通用错误信息提示函数
 * @param type 错误类型
 * @param msg 自定义信息
 */
export function error(type: string, msg: string) {
  console.log(`%c ${type}, %c ${msg}`, "color: #fdfdfd", "color:red");
}

export function info(msg: string | number | object, ...rest: any[]) {
  if (typeof msg === "object") {
    console.dir(msg);
  } else {
    const str = [msg + "", ...rest].join(" ");
    console.log(
      `%c ${str}`,
      "color: #333;background-color:#999;line-height:12px;font-size:12px;padding:2px;"
    );
  }
}

export function timeStart() {
  console.time();
}

export function timeEnd() {
  console.timeEnd();
}
