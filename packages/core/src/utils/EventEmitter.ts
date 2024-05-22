/**
 * 浏览器运行时使用的事件机制;原生的  nodejs 的 events 也可以使用，events 是一种软件设计模式，不涉及服务端相关概念绑定
 */

export enum EventType {
  START,
  OFFLINE,
}

export type EventTypeMap = keyof typeof EventType;
class EventEmitter {
  private readonly listeners: Map<EventTypeMap, handleType[]>;
  constructor() {
    // 事件监听收集器
    this.listeners = new Map();
  }
  /**
   * 监听事件
   * @param type
   * @param fn
   */
  public on(this: EventEmitter, type: EventTypeMap, fn: handleType) {
    if (!this.listeners.has(type) || !this.listeners.get(type)) {
      this.listeners.set(type, []);
    }

    const handlers = [...this.listeners.get(type)!, fn];
    this.listeners.set(type, handlers);
  }

  /**
   * 触发事件
   * @param type
   */
  public emit(type: EventTypeMap) {}

  /**
   * 移除事件
   * @param type
   * @param fn
   */
  public off(type: EventTypeMap, fn: handleType) {}
}

export default EventEmitter;
