import {
  getLocalStorage,
  getOrigin,
  getReferrer,
  getSearch,
  parseSearchQueryToObject,
  setLocalStorage,
} from "utils";
import { handleType } from "utils/lib/BitouType";

import Tracer from "../tracer";

const BITOU_UTM_FIRST_ITEM = "bitou_utm_first_item";
const BITOU_UTM_LAST_ITEM = "bitou_utm_last_item";

const TOP_PRIORITY = 0;
const MIDDLE_PRIORITY = 1;
const LOW_PRIORITY = 2;

const DURATION_30 = 30 * 24 * 60 * 60 * 1000;

export default function (instance: Tracer, cb?: handleType) {
  const calculatePriority = (contents) => {
    // 三类优先级：0 高，中 1，2 低
    const { joinSource, utm_source, referrer } = contents;
    if (joinSource || utm_source) {
      contents.priority = TOP_PRIORITY;
      if (joinSource?.split("_").length > 0) {
        // 兼容百度的计算法则
        contents.utm_source = joinSource.split("_")?.[0];
        contents.utm_medium = joinSource.split("_")?.[1];
        contents.utm_term = joinSource.split("_")?.[2];
      }
    } else if (referrer) {
      contents.priority = MIDDLE_PRIORITY;
      contents.utm_source = referrer;
    } else {
      contents.priority = LOW_PRIORITY;
      contents.utm_source = "direct";
    }
  };

  const calculatePlatform = (contents) => {
    const referrer = getReferrer();
    if (contents?.joinSource) {
      contents.platform = "baidu";
    } else if (contents?.utm_source) {
      contents.platform = "google";
    } else if (referrer && !referrer.startsWith(getOrigin())) {
      // 我们认为是站内，或者direct 单页直接打开：
      contents.platform = "referrer";
      contents.referrer = referrer;
    } else {
      // 记录 referrer
      contents.platform = "direct";
    }
  };

  const saveFirstAttributionToStorage = (contents) => {
    // 首次归因
    const storedItemString = getLocalStorage(BITOU_UTM_FIRST_ITEM);

    if (!storedItemString) {
      setLocalStorage(BITOU_UTM_FIRST_ITEM, {
        ...contents,
        storedTime: Date.now(),
      });
      return;
    }

    try {
      const storedItem = JSON.parse(storedItemString);
      const currentTime = Date.now();

      if (!storedItem?.storedTime) {
        setLocalStorage(BITOU_UTM_FIRST_ITEM, {
          ...contents,
          storedTime: Date.now(),
        });
        return;
      }
      const diff = currentTime - storedItem?.storedTime;

      if (diff < DURATION_30) {
        // 依据优先级进行更新更新, 0 最高，对应付费utm 1 中间，对应 referrer 2 最低 对应直接访问
        const { priority } = storedItem;
        const { priority: newPriority } = contents;
        if (priority <= newPriority) {
          // 首次归因，维持原状
          return;
        } else {
          setLocalStorage(BITOU_UTM_FIRST_ITEM, {
            ...contents,
            storedTime: currentTime,
          });
        }
      } else {
        // 大于 30 的时候 前一条 首次归因 数据要失效，被直接替换掉
        setLocalStorage(BITOU_UTM_FIRST_ITEM, {
          ...contents,
          storedTime: currentTime,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const saveLastAttributionToStorage = (contents) => {
    const storedItemString = getLocalStorage(BITOU_UTM_LAST_ITEM);

    if (!storedItemString) {
      setLocalStorage(BITOU_UTM_LAST_ITEM, {
        ...contents,
        storedTime: Date.now(),
      });
      return;
    }

    try {
      const storedItem = JSON.parse(storedItemString);
      const currentTime = Date.now();

      if (!storedItem?.storedTime) {
        setLocalStorage(BITOU_UTM_LAST_ITEM, {
          ...contents,
          storedTime: Date.now(),
        });
        return;
      }
      const diff = currentTime - storedItem?.storedTime;

      if (diff < DURATION_30) {
        // 依据优先级进行更新更新, 0 最高，对应投放utm； 1 中间，对应 referrer； 2 最低 对应直接访问
        const { priority } = storedItem;
        const { priority: newPriority } = contents;
        if (priority < newPriority) {
          return;
        } else {
          setLocalStorage(BITOU_UTM_LAST_ITEM, {
            ...contents,
            storedTime: currentTime,
          });
        }
      } else {
        // 大于 30 的时候 前一条 末次归因 数据要失效，被直接替换掉
        setLocalStorage(BITOU_UTM_LAST_ITEM, {
          ...contents,
          storedTime: currentTime,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const channelHandler = () => {
    const search = getSearch();
    const contents = parseSearchQueryToObject(search);
    calculatePlatform(contents);
    calculatePriority(contents);
    saveFirstAttributionToStorage(contents);
    saveLastAttributionToStorage(contents);
  };

  window.addEventListener("load", channelHandler);
}
