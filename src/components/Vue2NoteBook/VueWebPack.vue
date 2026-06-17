<template>
  <div class="webpack-intro">
    <h1>Webpack 前端构建工具详细介绍</h1>
    
    <!-- 简介 -->
    <section class="section">
      <h2>📖 什么是 Webpack？</h2>
      <p>Webpack 是一个现代 JavaScript 应用程序的静态模块打包器。当 Webpack 处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。</p>
      <div class="feature-list">
        <div class="feature-item">
          <h3>核心特性</h3>
          <ul style="padding-left: 20px;">
            <li>代码分割</li>
            <li>模块热替换</li>
            <li>Tree Shaking</li>
            <li>Loader 系统</li>
            <li>插件系统</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 搭建流程 -->
    <section class="section">
      <h2>🚀 搭建流程步骤</h2>
      <div class="process-steps">
        <div class="step">
          <h3>步骤 1：初始化项目</h3>
          <pre><code  v-prism="'typescript'">npm init -y</code></pre>
        </div>
        <div class="step">
          <h3>步骤 2：安装 Webpack 核心依赖</h3>
          <pre><code  v-prism="'typescript'">npm install webpack webpack-cli --save-dev</code></pre>
        </div>
        <div class="step">
          <h3>步骤 3：创建配置文件</h3>
          <pre><code  v-prism="'typescript'">touch webpack.config.js</code></pre>
        </div>
        <div class="step">
          <h3>步骤 4：配置构建脚本</h3>
          <pre><code  v-prism="'typescript'">// package.json
"scripts": {
  "build": "webpack",
  "dev": "webpack serve"
}</code></pre>
        </div>
        <div class="step">
          <h3>步骤 5：安装必要的 Loader</h3>
          <pre><code  v-prism="'typescript'">npm install babel-loader css-loader style-loader --save-dev</code></pre>
        </div>
      </div>
    </section>

    <!-- 工作原理 -->
    <section class="section">
      <h2>🔧 工作原理</h2>
      <div class="principle">
        <h3>Webpack 工作流程</h3>
        <ol>
          <li><strong>初始化：</strong>读取并解析 webpack 配置文件，确定入口点</li>
          <li><strong>编译：</strong>从入口点开始，递归分析模块依赖</li>
          <li><strong>转换：</strong>使用 Loader 对模块进行转换处理</li>
          <li><strong>构建：</strong>将转换后的模块打包成最终的 bundle 文件</li>
          <li><strong>输出：</strong>将打包结果输出到指定目录</li>
        </ol>
        <div class="diagram">
          <h4>依赖关系图</h4>
          <p>Webpack 通过分析模块间的依赖关系，构建出一个有向无环图(DAG)，然后根据这个图来生成优化后的代码。</p>
        </div>
      </div>
    </section>

    <!-- 配置项说明 -->
    <section class="section">
      <h2>⚙️ 核心配置项详细说明</h2>
      <div class="config-items">
        <div class="config-item">
          <h3>entry（入口）</h3>
          <pre><code  v-prism="'typescript'">module.exports = {
  entry: './src/index.js' // 单入口
  // 或多入口
  // entry: {
  //   main: './src/index.js',
  //   vendor: './src/vendor.js'
  // }
}</code></pre>
        </div>
        <div class="config-item">
          <h3>output（输出）</h3>
          <pre><code  v-prism="'typescript'">module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/' // 静态资源路径
  }
}</code></pre>
        </div>
        <div class="config-item">
          <h3>module（模块）</h3>
          <pre><code  v-prism="'typescript'">module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}</code></pre>
        </div>
        <div class="config-item">
          <h3>plugins（插件）</h3>
          <pre><code  v-prism="'typescript'">const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}</code></pre>
        </div>
        <div class="config-item">
          <h3>mode（模式）</h3>
          <pre><code  v-prism="'typescript'">module.exports = {
  mode: 'development' // 或 'production'
}</code></pre>
        </div>
        <div class="config-item">
          <h3>devServer（开发服务器）</h3>
          <pre><code  v-prism="'typescript'">module.exports = {
  devServer: {
    port: 3000,
    hot: true,
    open: true
  }
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 实际案例 -->
    <section class="section">
      <h2>📝 实际案例</h2>
      <div class="case-study">
        <h3>基本项目配置示例</h3>
        <pre><code  v-prism="'typescript'">// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Webpack Demo'
    })
  ],
  devServer: {
    port: 8080,
    hot: true,
    open: true
  }
};</code></pre>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="section">
      <h2>🎯 使用场景</h2>
      <div class="use-cases">
        <div class="use-case">
          <h3>单页应用 (SPA)</h3>
          <p>适合构建 React、Vue、Angular 等单页应用，通过代码分割优化加载性能。</p>
        </div>
        <div class="use-case">
          <h3>多页应用 (MPA)</h3>
          <p>通过多入口配置，为每个页面生成独立的 bundle。</p>
        </div>
        <div class="use-case">
          <h3>静态网站生成</h3>
          <p>结合插件可以生成静态 HTML 文件，适合博客、文档站点等。</p>
        </div>
        <div class="use-case">
          <h3>库和组件开发</h3>
          <p>可以打包成不同格式的模块（ES、CommonJS、UMD）。</p>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="section">
      <h2>⚠️ 注意事项</h2>
      <div class="notes">
        <div class="note-item">
          <h3>性能优化</h3>
          <ul>
            <li>合理配置代码分割，避免 bundle 过大</li>
            <li>使用 Tree Shaking 移除未使用的代码</li>
            <li>配置缓存提高构建速度</li>
            <li>生产环境启用代码压缩</li>
          </ul>
        </div>
        <div class="note-item">
          <h3>常见问题</h3>
          <ul>
            <li>Loader 配置顺序很重要（从右到左执行）</li>
            <li>路径问题：使用 path.resolve 确保路径正确</li>
            <li>版本兼容性：不同版本的 webpack 配置可能有差异</li>
            <li>内存限制：大型项目可能需要增加 Node.js 内存限制</li>
          </ul>
        </div>
        <div class="note-item">
          <h3>最佳实践</h3>
          <ul>
            <li>使用 .browserslistrc 统一浏览器兼容性配置</li>
            <li>分离开发和生产配置</li>
            <li>使用环境变量管理不同环境的配置</li>
            <li>定期更新依赖包</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 扩展阅读 -->
    <section class="section">
      <h2>📚 扩展阅读</h2>
      <div class="resources">
        <ul>
          <li><a href="https://webpack.js.org/" target="_blank">Webpack 官方文档</a></li>
          <li><a href="https://webpack.js.org/concepts/" target="_blank">Webpack 核心概念</a></li>
          <li><a href="https://webpack.js.org/loaders/" target="_blank">Loader 列表</a></li>
          <li><a href="https://webpack.js.org/plugins/" target="_blank">Plugin 列表</a></li>
          <li><a href="https://webpack.js.org/guides/" target="_blank">官方指南</a></li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'VueWebPack',
  data() {
    return {
      title: 'Webpack 详细介绍'
    }
  }
}
</script>

<style scoped>
.webpack-intro {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 40px;
}

h2 {
  color: #444;
  margin-top: 40px;
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

h3 {
  color: #555;
  margin-top: 20px;
  margin-bottom: 15px;
}

.section {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.feature-list {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.feature-item {
  flex: 1;
  background: white;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.step {
  background: white;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

pre {

}

code {
}

.principle ol {
  margin-left: 20px;
  line-height: 1.6;
}

.config-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.config-item {
  background: white;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.use-case {
  background: white;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  text-align: center;
}

.notes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.note-item {
  background: white;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.note-item ul {
  margin-left: 20px;
  line-height: 1.6;
}

.resources ul {
  margin-left: 20px;
  line-height: 1.8;
}

.resources a {
  color: #0066cc;
  text-decoration: none;
}

.resources a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .config-items {
    grid-template-columns: 1fr;
  }
  
  .use-cases {
    grid-template-columns: 1fr;
  }
  
  .notes {
    grid-template-columns: 1fr;
  }
}
</style>