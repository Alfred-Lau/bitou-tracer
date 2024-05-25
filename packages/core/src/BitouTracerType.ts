declare global {
  interface Window {
    bitou_tracer: any;
  }
  interface Navigator {
    connection: any;
  }
}

declare namespace CORE {
  type BootstrapOptions = {
    // 属性
    threshold: number;

    //  事件
    //每次上报之前需要进行工作：比如采集一下当前的时刻信息
    beforeEachSendPV: (...args: any) => void;
    // 每次上报之后需要进行的工作：比如需要改变什么内存对象或者本地存储
    afterEachSendPV: (...args: any) => void;
  };
  // 插件入参参数类型
  type PluginOptions = {
    // 插件名称
    name: string;
    // 插件版本
    version: string;
  };
}

// 通用函数类型
export type handleType = (...args: any[]) => void;

type CommonResponseType = {
  success: boolean;
  data: any;
};

declare class Model {
  constructor();
  public get info(): Record<string, any>;
}

type Cookie = {
  expires: Date;
  security: boolean;
  domain: string;
  path: string;
  httponly: string;
  key: string;
  value: string;
};

type UsedCookie = Partial<Cookie>;

/**
 * 定义事件类型
 */

// 1. 被动事件类型
export const EVENT_ENTER = Symbol("EVENT_ENTER");
export const EVENT_LEAVE = Symbol("EVENT_LEAVE");
export const EVENT_SCROLL = Symbol("EVENT_SCROLL");
export const EVENT_UN_FOCUS = Symbol("EVENT_UN_FOCUS");

//2. 主动事件类型

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

type OS_TYPE = "darwin" | "win32";
type BROWSER_TYPE = "chrome" | "safari";

declare namespace Model {
  type UserAgentInfo = {
    browser: UAParser.IBrowser;
    device: UAParser.IDevice;
    engine: UAParser.IEngine;
    os: UAParser.IOS;
    cpu: UAParser.ICPU;
    screen: { width: number; height: number };
  } & { useragent: string };
}
