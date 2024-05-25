import RdsAdapter from './rds';
import SlsAdapter from './sls';

export type DataSourceType = "sls" | "rds" | "unknown";

export default class DataSource {
  private type: DataSourceType;
  private source: any;
  constructor(type: DataSourceType) {
    this.type = type;
    this.source = this.initial(type);
  }

  protected initial(type: DataSourceType) {
    switch (type) {
      case "sls":
        console.log("使用sls 日志上报");
        return new SlsAdapter();
      case "rds":
        return new RdsAdapter();
      default:
        throw new Error("Unknown data source type");
    }
  }

  public send(data: any) {
    // 调用对应的数据源发送数据
    this.source.send(data);
  }
}
