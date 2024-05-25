import BaseDataSource from './base';

export default class RdsAdapter extends BaseDataSource {
  private tracker: any;
  constructor() {
    super();
    // new api
    // this.tracker = new SLS(opts);
  }
  public send(data: any): void {
    // this.tracker.send(data);
  }
}
