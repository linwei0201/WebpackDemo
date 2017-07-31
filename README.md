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

##### 2.3 Loader
##### 2.4 Plugins
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
