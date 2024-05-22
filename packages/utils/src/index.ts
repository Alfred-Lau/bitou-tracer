import { v4 as uuidv4 } from 'uuid';
export const isBrowser = typeof window !== 'undefined';
export const noop = () => {};
export const isFunction = (fn: any): fn is Function => {
  return typeof fn === 'function';
};

export const mergeOptions = (target: object, dest: object) => {
  return Object.assign(target, dest);
};

export type NullOrUndefinedType = null | undefined;

export const isEmptyObject = (obj: object | NullOrUndefinedType): boolean => {
  if (!obj) return false;
  return Object.keys(obj).length === 0;
};

export const defineProperty = <T>(
  host: T,
  key: string,
  prop: PropertyDescriptor & ThisType<T>
) => {
  Object.defineProperty(host, key, prop);
};

export const bindEvent = <T extends Window, K extends keyof WindowEventMap>(
  target: T,
  type: K,
  handler: (this: Window, ev: WindowEventMap[K]) => any
) => {
  target.addEventListener(type, handler);
};
/**
 * 防抖函数，只执行最后一次
 * @param fn 防抖函数
 * @param wait 防抖间隔时间
 * @param isImmediate 是否立即执行
 */
export const debounceFn = (
  fn: (...args: any) => any,
  wait: number = 200,
  isImmediate: boolean = false
) => {
  let timer: any;

  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }

    if (isImmediate && !timer) {
      fn.apply(this, args);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};

/**
 * 获取鼠标位置
 * @param e
 */
export const getMousePosition = (e: MouseEvent): { x: number; y: number } => {
  return {
    x: e.screenX,
    y: e.screenY,
  };
};

export const uuid = () => {
  return uuidv4();
};

export * as log from './log';
export * as cookie from './cookie';
export * from './constant';
