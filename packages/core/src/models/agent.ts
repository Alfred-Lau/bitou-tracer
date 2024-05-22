import UA from "ua-parser-js";
import Tracer from "../tracer";
import EventEmitter from "../utils/EventEmitter";

export default class UserAgent extends EventEmitter implements Model {
  private ua: UA;
  private tracer: Tracer;
  public cb: handleType | undefined;
  constructor(ins: Tracer, cb?: handleType) {
    super();
    this.tracer = ins;
    this.cb = cb;
    this.ua = new UA();
    this.cb && this.cb(this);
  }

  private _collect(): Model.UserAgentInfo {
    const browser = this.browser;
    const device = this.device;
    const engine = this.engine;
    const os = this.os;
    const cpu = this.cpu;
    const useragent = this.useragent;
    const screen = UserAgent.screen;
    return {
      browser,
      device,
      engine,
      os,
      cpu,
      useragent,
      screen,
    };
  }

  public get info(): Model.UserAgentInfo {
    return this._collect();
  }

  private get browser(): Model.UserAgentInfo["browser"] {
    return this.ua.getBrowser();
  }
  private get device(): Model.UserAgentInfo["device"] {
    return this.ua.getDevice();
  }
  private get engine(): Model.UserAgentInfo["engine"] {
    return this.ua.getEngine();
  }
  private get cpu(): Model.UserAgentInfo["cpu"] {
    return this.ua.getCPU();
  }
  private get os(): Model.UserAgentInfo["os"] {
    return this.ua.getOS();
  }
  private get useragent(): Model.UserAgentInfo["useragent"] {
    return this.ua.getUA();
  }
  private static get screen(): Model.UserAgentInfo["screen"] {
    return {
      width: screen.width,
      height: screen.height,
    };
  }
}
