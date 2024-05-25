export type UserAgentInfo = {
  browser: UAParser.IBrowser;
  device: UAParser.IDevice;
  engine: UAParser.IEngine;
  os: UAParser.IOS;
  cpu: UAParser.ICPU;
  screen: { width: number; height: number };
} & { useragent: string };

export type BootstrapOptions = {
  // 属性
  threshold: number;

  //  事件
  //每次上报之前需要进行工作：比如采集一下当前的时刻信息
  beforeEachSendPV: (...args: any) => void;
  // 每次上报之后需要进行的工作：比如需要改变什么内存对象或者本地存储
  afterEachSendPV: (...args: any) => void;
};

// 插件入参参数类型
export type PluginOptions = {
  // 插件名称
  name: string;
  // 插件版本
  version: string;
};

declare global {
  interface Window {
    bitou_tracer: any;
  }
  interface Navigator {
    connection: any;
  }
}

declare class Model {
  constructor();
  public get info(): Record<string, any>;
}
