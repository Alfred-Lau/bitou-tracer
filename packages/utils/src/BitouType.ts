// 通用函数类型
export type handleType = (...args: any[]) => void;

export type CommonResponseType = {
  success: boolean;
  data: any;
};

export type Cookie = {
  expires: Date;
  security: boolean;
  domain: string;
  path: string;
  httponly: string;
  key: string;
  value: string;
};

export type UsedCookie = Partial<Cookie>;

/**
 * 定义事件类型
 */

// 1. 被动事件类型
export const EVENT_ENTER = Symbol("EVENT_ENTER");
export const EVENT_LEAVE = Symbol("EVENT_LEAVE");
export const EVENT_SCROLL = Symbol("EVENT_SCROLL");
export const EVENT_UN_FOCUS = Symbol("EVENT_UN_FOCUS");

//2. 主动事件类型

export type EventHandlerType = "scroll" | "click" | "hover" | string;

export type SimpleEventPayloadType = {
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

export type OS_TYPE = "darwin" | "win32";
export type BROWSER_TYPE = "chrome" | "safari";

export enum EventType {
  START,
  OFFLINE,
}

export type EventTypeMap = keyof typeof EventType;
