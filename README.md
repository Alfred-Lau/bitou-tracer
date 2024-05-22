# README

- workspaces 是需要在 pnpm install 的时候安装的

## how to start

1. pnpm install
2. pnpm start
3. open examples/basic/index.html

## 系统设计

release 1.0 具备的能力

- 上报接口 和 sls 的 sdk 集成
- 直接挂载 版本的信息
- 匿名用户生成 uuid
- sendBeacon 高级支持 & img 初级支持
- 业务用户信息函数传入支持
- 通用错误支持
- 采集的数据维度
  - ua 等设备信息
  - 地理位置，是不是要结合 nginx ？
  - 点击位置
  - location 相关信息
  - utm 相关系统设计
  - cookie 相关信息
  - 通用函数
  - dom 节点相关操作
  - 把采集的实体进行了抽象 【userAgent】
  - tracer 实现挂载超时重试，简易 的生命周期

0216：

- 描述功能
  - 挂载一个全功能的采集实例用来 支持业务方的主动调用
    - api 设计：出参，入参，
  - 默认的被动埋点，需要支持的初始化参数
  - 点击事件的上报
  - 进入和离开事件的上报
- 设计数据结构
- 设计插件机制，分包
  - core 提供基本的基类 和最基础的采集插件；使用的方式是插件实现加载
- 补充测试用例

0218:

- 描述主动功能，拆解任务
  - base 基类提供
    - beforeSend 等之类的 生命周期钩子
    - 还有基础的上报能力；
  - tracer 类进行
    - 更高层次的便捷的业务封装
    - 暴露通用的对外接口实现
    - 在这一层实现插件机制？
- 异常判断很重要
- 设计模式很重要
- 抽离和重构很重要

  "build": "pnpm -C ./packages/core build & pnpm -C ./packages/utils build & pnpm -C ./packages/shared build",
  "start": "pnpm -C ./packages/core dev & pnpm -C ./packages/utils dev & pnpm -C ./packages/shared dev",
