import { handleType } from 'utils/lib/BitouType';

import Tracer from '../tracer';

// TODO: implement hotjar plugin 热力图
export default function (instance: Tracer, cb: handleType) {
  cb && cb();
}
