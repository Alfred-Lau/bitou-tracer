import {
  bindEvent,
  isEmptyObject,
  log,
  mergeOptions,
  uuid,
} from 'utils';

import Base from '../base';
import UserAgent from '../models/agent';
import click from '../plugins/click';
import error from '../plugins/error';
import input from '../plugins/input';
import performance from '../plugins/performance';
import spa from '../plugins/spa';
import utm from '../plugins/utm';
import { getNetworkSpeed } from '../utils/network';
import { getVersion } from '../utils/version';

const Model = Symbol("bitou_tracer#model");
const Plugin = Symbol("bitou_tracer#plugin");

type BasicOptionType = {
  version: string;
};

type FullOptionsType = Partial<CORE.BootstrapOptions> & BasicOptionType;

const defaultOptions: BasicOptionType = {
  version: getVersion(),
};
const defaultModels = [{ name: "agent", model: UserAgent }];
const defaultPlugins = [
  { name: "click", plugin: click },
  { name: "input", plugin: input },
  { name: "spa", plugin: spa },
  { name: "performance", plugin: performance },
  { name: "error", plugin: error },
  { name: "utm", plugin: utm },
];

export default class Tracer extends Base {
  private readonly options = defaultOptions as FullOptionsType;
  // 这行 crazy
  private [Model]: Record<string, any>[];
  private [Plugin]: Record<string, any>[];
  private tracerReady: boolean | null = null;
  private pluginReady: boolean | null = null;
  private modelReady: boolean | null = null;

  private TRACER_SESSION_ID: string;
  constructor(opts?: Partial<CORE.BootstrapOptions>) {
    super("");
    //此处初始化加载实体
    if (isEmptyObject(opts)) {
      this.options = mergeOptions(this.options, opts!) as FullOptionsType;
    }

    this[Model] = [];
    this[Plugin] = [];

    this.tracerReady = false;
    this.pluginReady = false;
    this.modelReady = false;

    this.TRACER_SESSION_ID = "tg_session_key";

    if (opts?.beforeEachSendPV) {
      this.beforeEachSendPV(opts.beforeEachSendPV);
    }

    if (opts?.afterEachSendPV) {
      this.afterEachSendPV(opts.afterEachSendPV);
    }
    Promise.resolve()
      .then(this.prepare.bind(this))
      .then(this.run.bind(this))
      .then(this.end.bind(this))
      .finally(() => {
        log.info("初始化结束", "");
      });
  }

  public mergePluginOptions(name: string, option: Partial<CORE.PluginOptions>) {
    log.info(option);
  }

  public addPlugin(plugin: handleType, option: Partial<CORE.PluginOptions>) {
    this.mergePluginOptions("", option);
    // push 一个函数或者类进去
    this[Plugin].push({ name: plugin.name, plugin });
  }

  public addModel(model: any) {
    // push 一个函数或者类进去
    this[Model].push({ name: model.name, model });
  }

  public addEventListener<T extends Window, K extends keyof WindowEventMap>(
    target: T,
    type: K,
    handler: (this: Window, ev: WindowEventMap[K]) => any
  ) {
    const responsiveEventHandle = function () {};
    bindEvent(target, type, handler);
  }

  // TODO: 生命周期的实现
  public call(this: Tracer, type: string, ...args: any) {
    console.log("type", type);
    // @ts-ignore
    this[type].apply(this, args);
  }

  // 基础事件簇
  public click(options: any) {
    return this.send("click", options);
  }

  public hover(options: any) {
    return this.send("click", options);
  }

  public scroll(options: any) {
    return this.send("click", options);
  }

  public async getNetworkSpeed() {
    return await getNetworkSpeed();
  }

  /**
   * 1. 检查环境;
   * 2. 初始化各类实体，插件列表
   */
  public async prepare() {
    try {
      this.http(
        {
          name: "http 模块检查成功",
        },
        {}
      );
    } catch (e) {
      log.error("check failed", "检查失败，不会启动实例");
    }

    // 初始化 session cookie id
    const key = this.TRACER_SESSION_ID;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, `${uuid()}_${new Date().getTime()}}`);
    }

    // 初始化业务逻辑
    const speed = await getNetworkSpeed();
    console.log("🚀 ~ Tracer ~ localStorage.setItem ~ speed:", speed, "KB");
    //  加载实体: 传参监视；默认 defaultModels 这个需要做处理
    for (const p of defaultModels) {
      const { model } = p;
      this.modelCount++;
      this.addModel(model);
    }

    //  加载插件  这个需要做处理
    for (const p of defaultPlugins) {
      const { name, plugin } = p;
      this.pluginCount++;
      this.addPlugin(plugin, { name });
    }
  }

  /**
   * 1. 依次启动插件，实体，实例化
   * 2. 插件都启动之后，
   * 3. 启动应用上报
   */
  public run(): void {
    // 1. 启动实体
    for (const m of this[Model]) {
      let index = 0;
      const { model, name } = m;
      const instance = new model(this, (info: any) => {
        console.info("回调函数被调用了", info);
      });
      this.set(this, `m_${name}`, instance);

      if (index++ === this.modelCount - 1) {
        this.modelReady = true;
      }
    }

    // 2. 启动插件
    for (const p of this[Plugin]) {
      let index = 0;
      const { name, plugin } = p;
      const instance = new plugin(this, () => {
        console.info(`插件的回调函数被调用了`);
      });
      this.set(this, `p_${name}`, instance);

      if (index++ === this.pluginCount - 1) {
        this.pluginReady = true;
      }
    }

    //  3. 首次上报
    this.send("connect");
  }

  public end() {
    this.tracerReady = true;
  }
}
