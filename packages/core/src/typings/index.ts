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
type handleType = (...args: any[]) => void;

type CommonResponseType = {
  success: boolean;
  data: any;
};

declare class BaseClass {
  constructor(name?: string);
  public pluginCount: number;
  public modelCount: number;
  // 生命周期/发送请求之前调用
  public beforeEachSendPV(fn: handleType): void;
  // 生命周期/发送请求之后调用
  public afterEachSendPV(fn: handleType): void;

  // 上报相关逻辑: 重载接口
  public send(eventName: string): void;
  public send(eventName: string, payload: any): void;
}

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
