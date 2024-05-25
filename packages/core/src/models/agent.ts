import { UserAgentInfo } from 'src/BitouTracerType';
import UA from 'ua-parser-js';
import { EE } from 'utils';
import { handleType } from 'utils/lib/BitouType';

import Tracer from '../tracer';

export default class UserAgent extends EE {
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

  private _collect(): UserAgentInfo {
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

  public get info(): UserAgentInfo {
    return this._collect();
  }

  private get browser(): UserAgentInfo["browser"] {
    return this.ua.getBrowser();
  }
  private get device(): UserAgentInfo["device"] {
    return this.ua.getDevice();
  }
  private get engine(): UserAgentInfo["engine"] {
    return this.ua.getEngine();
  }
  private get cpu(): UserAgentInfo["cpu"] {
    return this.ua.getCPU();
  }
  private get os(): UserAgentInfo["os"] {
    return this.ua.getOS();
  }
  private get useragent(): UserAgentInfo["useragent"] {
    return this.ua.getUA();
  }
  private static get screen(): UserAgentInfo["screen"] {
    return {
      width: screen.width,
      height: screen.height,
    };
  }
}
