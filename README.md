# league

一个基于[react](https://facebook.github.io/react/index.html) + [redux](https://github.com/reactjs/redux)的移动端实践。
  
Node version 
------------

node >= 6.2.2

安装运行
-------

安装：

    npm install 

开发环境：

    npm start 

带有webpack-dev-server模式的开发环境：

    npm run start:serv

正式环境：

    npm run build
  
技术说明
-------

项目总体以react + redux为基础，其余一些技术细节说明如下。
  
## router
  使用[react-router](https://github.com/ReactTraining/react-router)。并且各个路由页面都采用异步路由(reducer也被异步)。打包时，每个页面都会单独打为一个chunk文件(每个页面单独引入的样式也会被打入各自的chunk文件)。使得在页面首次加载时不会加载过多的内容，提升加载速度。

## state
  store中的state采用immutable数据。并没有使用全面而庞大的[immutable.js](https://facebook.github.io/immutable-js/)，而是使用了精简的[seamless-immutable](https://github.com/rtfeldman/seamless-immutable)。使用seamless-immutable的好处是：
  1. size小，加载快；
  2. 原生接口，上手快；
  3. 原生数据类型，使得redux天然支持，不需要使用[redux-immutable](https://github.com/gajus/redux-immutable)之类的辅助工具；

使用seamless-immutable后，所有组件可以都继承自[PureComponent](https://facebook.github.io/react/docs/pure-render-mixin.html)(替代Component)。PureComponent实现了shouldComponentUpdate方法，以此可以提高渲染的性能。
  
## action & reducer
  使用了[redux-actions](https://github.com/acdlite/redux-actions)。redux-actions会以flux的推荐格式来包装数据，并且在reducer中避免了使用switch。
  
## async 
  异步逻辑使用中间件[redux-saga](https://github.com/yelouafi/redux-saga)。saga采用声明式指令处理异步逻辑，使用generator实现。具体使用可参考文档：http://yelouafi.github.io/redux-saga/.
  
## selector
  可选的selector。使用了[reselect](https://github.com/reactjs/reselect)模块。在mapStateToProps方法中使用selector，可以在每次render前避免不必要的state计算，以提高性能。
   
## css
  使用[css-module](https://github.com/css-modules/css-modules)。在webpack.config.js中配置了css-module。多个class的情况使用[classnames](https://github.com/JedWatson/classnames)处理。
  
## flexible
  使用了手淘的[lib-flexible](https://github.com/amfe/lib-flexible)方案来适配各种屏幕下的显示，并使用[px2rem](https://github.com/songsiqi/px2rem)来做单位转换。可以根据750的设计稿来实现，直接按设计稿的实际尺寸写px，px2rem会自动按比例转换为rem。
  
## eslint
  编码规范使用eslint控制。其他命名规则如下：
  1. 文件名、类名首字母大写，eg：Home；
  2. 目录名、变量名采用驼峰式，eg：myHome；
  3. css类名采用中划线'-'链接，eg：my-home；
  4.常量使用下划线'_'链接，eg：MY_HOME。



