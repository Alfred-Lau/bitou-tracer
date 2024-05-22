type EventHandlerType = "scroll" | "click" | "hover" | string;

type SimpleEventPayloadType = {
  // 事件类型
  eventType: EventHandlerType;
  // utm 值 ‘a.b.c.d.pvid’
  utmCnt: string;
  // 点击类事件还是需要加上d 端值的比较方便
  utm_d: string;
  // 鼠标 x 值
  mx: number;
  // 鼠标 y 值
  my: number;
  // sdk 基础版本信息
  version: string;
  // pathname
  pathname: string;
  //url
  url: string;
  // 创建时间
  createTime: number;
  // 日志类型 2. 为自定义日志
  logType: number;
  //浏览器尺寸 '100*200'
  screen: string;
  [key: string]: any;
};
