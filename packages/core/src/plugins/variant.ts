import { log } from 'utils';
import Tracer from '../tracer';

// TODO：AB 实验模块
export default function (instance: Tracer, cb: handleType) {
  cb && cb();
}
