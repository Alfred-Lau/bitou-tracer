/**
 * 请实现
 * 采集模块依赖的基类代码【1. 生命周期的机制实现；2. 插件机制的实现；3.】
 */
import {
  debounceFn,
  defineProperty,
  isFunction,
  log,
  noop,
} from 'utils';

import http from '../http';
import Tracer from '../tracer';
import { getNetworkSpeed } from '../utils/network';

export type SendOptionType = {
  env: string;
  uid: string;
  throughAPI: boolean;
};

export default class Base implements BaseClass {
  public http: (...args: any[]) => void;
  public beforeEachSendPVEvents: handleType[] = [];
  public afterEachSendPVEvents: handleType[] = [];
  public pluginCount: number = 0;
  public modelCount: number = 0;
  public eventsCache: {};
  constructor(public name: string) {
    Base.time_start();
    this.http = http;
    //各类事件的缓存
    this.eventsCache = {};
    Base.time_end();
  }

  private static time_start() {
    log.timeStart();
  }

  private static time_end() {
    log.timeEnd();
  }

  // 事件周期的回调
  public beforeEachSendPV(fn = noop) {
    if (!isFunction(fn)) {
      log.error("注册的事件只能是函数", "");
      return;
    }
    this.beforeEachSendPVEvents.push(fn);
  }
  public afterEachSendPV(fn = noop) {
    if (!isFunction(fn)) {
      log.error("注册的事件只能是函数", "");
      return;
    }
    this.afterEachSendPVEvents.push(fn);
  }

  /**
   * 通用的挂载方法
   * @param host 需要被挂载对象的 宿主对象
   * @param key 需要被挂载的 key
   * @param ctx 需要挂载 key 的描述对象
   */
  public set(host: Tracer, key: string, ctx: any) {
    defineProperty<typeof host>(host, key, {
      value: ctx,
    });
  }

  protected async collectBaseInfo() {
    const network = await getNetworkSpeed();
    console.log("🚀 ~ Base ~ collectBaseInfo ~ network:", network);
    const baseInfo = {
      network,
    };

    return baseInfo;
  }

  // 基础上报的实现
  public async send(eventName: string, options?: SendOptionType) {
    this.beforeEachSendPVEvents.map((ev) => {
      ev && ev();
    });

    const baseInfo = await this.collectBaseInfo();

    const payload: Partial<SimpleEventPayloadType> = {
      eventType: eventName,
      ...baseInfo,
    };

    // 防抖处理
    const debouncedFn = debounceFn(this.http);

    (debouncedFn as any)({ ...payload, ...options });

    Promise.resolve().finally(() => {
      this.afterEachSendPVEvents.map((ev) => {
        ev && ev();
      });
    });
  }
}
