# miniprogram

## 目录结构
```
├─api ------------------------------ // 接口封装
│ └─lib ---------------------------- // api库
├─behaviors ------------------------ // 公用逻辑模块
├─components ----------------------- // 自定义组件
│ ├─painter ------------------------ // 分享图插件
│ │ └─lib 
│ └─parser ------------------------- // 富文本插件
│   ├─libs 
│   └─trees 
├─constant ------------------------- // 常量
├─images --------------------------- // 静态资源
├─pages ---------------------------- // 页面
│ └─index -------------------------- // 首页
├─style ---------------------------- // 样式库
├─template ------------------------- // 自定义模版
├─utils ---------------------------- // 工具封装
│ └─lib ---------------------------- // 工具库
└─wxs 
```

## 功能点&BUG
- 基础库 2.10.2 版本起，异步 API 支持 callback & promise 两种调用方式
- 使用 this.route 来获取当前页面路径，填在分享路径理面
- 上拉加载需要加锁lock优化

## 参考文档
- [使用 Component 构造器构造页面](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)
- [behaviors](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html)
- [模板](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/template.html)
- [WXS](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/)
- [小程序扩展组件库](https://developers.weixin.qq.com/miniprogram/dev/extended/component-plus/)
- [WeUI组件库](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/)
- [分享图插件 Painter](https://github.com/Kujiale-Mobile/Painter)
- [富文本插件 Parser](https://github.com/jin-yufeng/Parser)
- [Fly.js](https://github.com/wendux/fly)
- [qs](https://github.com/ljharb/qs)
- [Moment.js](http://momentjs.cn/)