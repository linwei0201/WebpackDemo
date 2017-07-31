## webpack使用指南

### 配置文件
#### 1. es2015模块支持
ES6的import和export，webpack是支持的，但是其他ES6的功能，需要安装babel解析器来解析。
System.import
#### 2. 配置文件
webpack会默认使用名为webpack.config.js的配置文件，也可以在命令行中通过--config来传递参数，表名配置文件的文件名。一般我们为了区分环境，会拆分成3类配置文件
- 开发环境config.dev.js，一般配合webpack-dev-server使用
- 测试环境config.test.js
- 生产环境config.prod.js

##### 2.1 Entry
入口有多种写法，以下一一介绍
###### - 单入口
**语法**
```js
entry: string | Object
```

**webpack.config.js**
```js
module.exports = {
	entry: "pages/aaa.js"
}
```
等同于

```js
module.exports = {
	entry: { 
		"main": "pages/aaa.js"
	}
}
```

###### - 多入口
**语法**
```js
entry: {[entryChunkName: string]: string|Array<string>} | Array<string>
```

**webpack.config.js**

```js
module.exports = {
	entry: {
		app: 'src/pages/app.js',
		vendor: 'src/vendors.js'
	}
}
```

> **当你向 entry 传入一个数组时会发生什么？**
向 entry 属性传入「文件路径(file path)数组」将创建“多个主入口(multi-main entry)”。在你想要多个依赖文件一起注入，并且将它们的依赖导向(graph)到一个“chunk”时，传入数组的方式就很有用。

##### 2.2 Output

output用来配置webpack编译后的文件的写入规则，**就算有多个entry配置，output配置也只有一个**。

**基本用法**

```js
module.exports = {
	output: {
		filename: 'bundle.js',   //用于输出文件的文件名
		path: '/dist/assets'     //目标输出目录 path 的绝对路径
	}
}
```


**多入口输出配置**
如果配置了多入口，输出应该有标识符来区别
```js
	module.exports = {
		entry: {
			app: 'src/pages/app.js',
			vendor: 'src/pages/vendor.js'
		},
		output: {
			filename: '[name].js',
			path: __dirname + '/dist'
		}
	}
```

编译后生成
- ./dist/app.js
- ./dist/vendor.js

**publicPath**
项目访问静态资源的前缀，如果不使用cdn，可忽略，默认使用相对路径。如果使用cdn，可在pulicPath配置成cdn路径

```js
module.exports = {
	output: {
		publicPath: 'http://cdn.example.com/assets/[hash]/'
	}
}
```

> 如果编译时不知道js的运行环境，可以在入口js中获取当前js的域名，并赋值给__webpack_public_path__

##### 2.3 Loader

由于webpack只能识别.js文件，所以其他格式的文件都需要通过loader进行转换，转换成js，再使用webpack编译。

> loader可以允许我们在js中引入任何格式的文件，只要有相应的loader即可。例如css，图片等

webpack提供了3种方式使用loader：
- 通过配置文件，这也是官方最推荐的方式
- 内联，通过import语句中指定使用的loader（不推荐）
- CLI方式：在shell命令中指定loader（不推荐）

本文只介绍第一种方式，例如，css-loader，首先要用npm安装

```bash
	npm i css-loader --save
```

然后在配置文件中设置, .css结尾的文件，都使用css-loader解析

```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' }
    ]
  }
};
```

多个loader以及带参数的loader

```js
module.exports = {
	module: {
		rules: [
			{ loader: 'style-loader' },
			{
				loader: 'css-loader',
				options: {
					modules: true  //loader的查询参数
				}
			}
		]
	}
}
```

**loader特性**
- loader 支持链式传递，执行顺序是根据定义从后往前执行，第一个 loader 返回值给下一个 loader。最后一个 loader，返回 webpack 所预期的 js。(如上例中，会先执行css-loader，再把结果传给style-loader，最后输出js)
- loader 可以是同步的，也可以是异步的。
- loader 运行Node.js环境中。
- loader 接受参数，可以?modules=true配置，也可用options字段配置（如上例）。
- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。

loader可以为webpack提供很多功能，如何编写loader见[官方文档](https://doc.webpack-china.org/development/how-to-write-a-loader "如何编写loader")

**resolveLoader**

resolveLoader可以修改loader解析的配置，默认值如下

```js
{
    modules: ["node_modules"],    //编辑器查找loader的路径，可以在此添加本地loader的路径
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"]
}
```

##### 2.4 Plugins

插件可以在webpack编译的任何生命周期执行，用来解决loader无法处理的事情，比如创建全局变量，提取css为独立文件，等。[官方文档](https://doc.webpack-china.org/development/how-to-write-a-plugin/ "如何编写插件")详细介绍了如何编写一个webpack插件

**插件的运行方式**
- webpack配置文件

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

- node api

```js
const webpack = require('webpack'); //访问 webpack 运行时(runtime)
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);
compiler.apply(new webpack.ProgressPlugin());

compiler.run(function(err, stats) {
// ...
});
```


##### 2.5 Modules
##### 2.6 Module Resolution
##### 2.7 Dependency Graph
##### 2.8 Manifest
##### 2.9 Targets
##### 2.10 Hot Module Replacement
#### 3. NPM脚本
一般，在package.json文件中写对应的脚本来分别运行不同环境下的构建。

```js
{
  ...
  "scripts": {
    "start": "ENVIRONMENT=development webpack --progress --colors --watch --config ./webpack/config.dev.js",
	"build": "ENVIRONMENT=production webpack --progress --colors --config ./webpack/config.prod.js"
  },
  ...
}
```
