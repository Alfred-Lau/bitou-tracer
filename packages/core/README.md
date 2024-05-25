# how to start using

if(window.bitou_tracer){
bitou_tracer.run()
}

## 架构设计

- base 基类提供
  - beforeSend 等之类的 生命周期钩子
  - 还有基础的上报能力；
- tracer 类进行
  - 更高层次的便捷的业务封装
  - 暴露通用的对外接口实现
  - 在这一层实现插件机制？
