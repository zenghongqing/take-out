# take-out
基于koa2+mongoose+vue+vuex+axios+sass的仿外卖平台
运行基本步骤：

1. 进入server目录， npm install 安装依赖

2. 通过node app.js 或者 supervisor app.js 开启后台服务

3. 进入 take-out目录, nom install 安装依赖

4. 通过nom run dev 运行

5. 再进行nom run build打包

本项目的后台由nodejs+mongoose+koa2+jwt实现注册登录功能，使用http模块调用新浪的接口实现定位到当前城市的功能;其余通过读取mock静态数据数传到前端。前端则由vue框架主导，css样式则用sass，部分图片则用ali-fonts以及icomoon字体实现，后续在加PWA，webpack4.0等新功能，后台nodejs部分也可以继续深化。接下来具体总结下：
后台：
使用koa2框架，较express框架更加简洁，且大量使用es6语法，数据库采用mongodb的一个库mongoose，原因是他遵循的是一种, 模板式方法, 能够对你输入的数据进行自动处理，登录验证使用的是jwt，JWT实际上就是一个字符串，它由三部分组成：头部、载荷与签名。
使用token来鉴权具有以下两点优势：
1. 服务端不需要请求DB来获取用户信息，因为用户信息已经存在token里面。
2. token鉴权的方式对移动端和PC端同样适用，服务端不需要维护两套鉴权机制。
jwt的基本过程是:
1：客户端通过用户名和密码登录 
2：服务器验证用户名和密码，若通过，生成token返回给客户端。 
3：客户端收到token后以后每次请求的时候都带上这个token，相当于一个令牌，表示我有权限访问了 
4：服务器接收（通常在拦截器中实现）到该token，然后验证该token的合法性（为什么能验证下面说）。若该token合法，则通过请求，若token不合法或者过期，返回请求失败。

前端：
- **Flex** 布局主要采用嵌套 Flex 布局
- **Vue**：构建用户界面的 MVVM 框架，核心是响应的数据绑定和组系统件
- **vue-router**：为单页面应用提供的路由系统，项目上线前使用了路由懒加载技术，来异步加载路由优化性能
- **vuex**：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
- **axios**：服务端通讯。基于 `Promise` 的网络请求插件
- **vue-lazyload**：第三方图片懒加载库，优化页面加载速度
- **better-scroll**：iscroll 的优化版，使移动端滑动体验更加流畅
- **Mint UI**：一套基于 Vue 2.0 的移动端组件库，出自饿了么前端
- **Sass(Scss)**：css 预编译处理器
- **ES6**：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用
- **Moment.js**：日期时间格式化插件
【自动化构建及其他工具】
- **vue-cli**：Vue 脚手架工具，快速初始化项目代码
- **ESLint**：代码风格检查工具，规范代码书写
- **pm2**：一个带有负载均衡功能的Node应用的进程管理器，此项目用于在阿里云服务器启动服务
主要功能：
首页、商家模块、发现、订单、我的
难点：
1. css 解决移动端1px问题
2. 滚动效果采用better-scroll实现了横向滚动和纵向滚动效果
3. 购物车动画效果则采用vue中的过渡动画：
<transition
  v-on:before-enter="beforeDrop"
  v-on:enter="dropping"
  v-on:after-enter="afterDrop"
>
  <!-- ... -->
</transition>中的js钩子配合css3中的transform实现
收获：
对于vue中的组件复用，以及v-lazy还有keep-alive动态组件加载等更加熟悉，性能优化也可以做的更好。
