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
