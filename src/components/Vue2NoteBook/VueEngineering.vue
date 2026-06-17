<template>
  <div class="vue-engineering-container" :class="{ 'dark-mode': isDarkMode }">
    <!-- 顶部导航 -->
    <header class="header">
      <h1>Vue2 工程化详解</h1>
      <div class="header-actions">
<!-- 目录导航 -->
      <span style="margin-top: 4px;">目录：</span>
        <el-select
    v-model="sectionValue"
    :options="sections"
    placeholder="Select"
    style="width: 240px;margin-right: 10px;"
  />
        <button @click="toggleDarkMode" class="mode-toggle">
          {{ isDarkMode ? '🌞 浅色模式' : '🌙 深色模式' }}
        </button>
        <button @click="scrollToTop" class="top-btn" v-if="showTopBtn">
          ↑ 返回顶部
        </button>
      </div>
    </header>
    <!-- 主要内容 -->
    <main class="main-content">
      <!-- 项目结构与组织 -->
      <section class="section" id="section-1">
        <h2>1. 项目结构与组织</h2>
        <div class="content">
          <h3>基本结构</h3>
          <div class="code-block">
            <div class="code-header">
              <span>项目目录结构</span>
              <button @click="copyCode('project-structure')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="project-structure">my-vue-project/
├── public/              # 静态资源
│   ├── index.html       # HTML模板
│   └── favicon.ico      # 网站图标
├── src/                 # 源代码
│   ├── assets/          # 静态资源
│   ├── components/      # 组件
│   ├── views/           # 页面
│   ├── router/          # 路由
│   ├── store/           # 状态管理
│   ├── api/             # 接口请求
│   ├── utils/           # 工具函数
│   ├── constants/       # 常量定义
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── build/               # 构建配置
├── config/              # 项目配置
├── node_modules/        # 依赖包
├── .babelrc             # Babel配置
├── .eslintrc.js         # ESLint配置
├── .gitignore           # Git忽略文件
├── package.json         # 项目依赖和脚本
└── README.md            # 项目说明</code></pre>
          </div>

          <h3>结构说明</h3>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('structure')">
              <span>目录说明</span>
              <span class="toggle-icon">{{ collapsed.structure ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed.structure">
              <ul>
                <li><strong>src/</strong>：源代码目录，包含所有业务逻辑</li>
                <li><strong>public/</strong>：静态文件目录，不会被webpack处理</li>
                <li><strong>build/</strong>：构建脚本和配置</li>
                <li><strong>config/</strong>：项目配置文件</li>
              </ul>
            </div>
          </div>

          <h3>组织原则</h3>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('principles')">
              <span>代码组织原则</span>
              <span class="toggle-icon">{{ collapsed.principles ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed.principles">
              <ul>
                <li>按功能模块组织代码</li>
                <li>组件化开发，提高复用性</li>
                <li>单一职责原则，每个文件只负责一个功能</li>
                <li>清晰的命名规范，便于维护</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 构建工具与配置 -->
      <section class="section" id="section-2">
        <h2>2. 构建工具与配置</h2>
        <div class="content">
          <h3>Vue CLI</h3>
          <p>Vue CLI是官方推荐的构建工具，提供了完整的项目脚手架和构建配置。</p>

          <h4>安装与使用</h4>
          <div class="code-block">
            <div class="code-header">
              <span>Vue CLI 命令</span>
              <button @click="copyCode('vue-cli-commands')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="vue-cli-commands"  v-prism="'typescript'" ># 安装Vue CLI
npm install -g @vue/cli

# 创建项目
vue create my-project

# 启动开发服务器
npm run serve

# 构建生产版本
npm run build

#  lint代码
npm run lint</code></pre>
          </div>

          <h3>webpack配置</h3>
          <p>Vue CLI基于webpack，提供了默认配置，也可以通过vue.config.js进行自定义。</p>

          <h4>vue.config.js配置示例</h4>
          <div class="code-block">
            <div class="code-header">
              <span>vue.config.js</span>
              <button @click="copyCode('vue-config')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="vue-config"  v-prism="'typescript'" >const path = require('path');

module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '/prod/' : '/',
  // 输出目录
  outputDir: 'dist',
  // 静态资源目录
  assetsDir: 'static',
  //  lint 保存时检查
  lintOnSave: true,
  // 开发服务器配置
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // webpack配置
  configureWebpack: {
    plugins: [
      // 自定义插件
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
}</code></pre>
          </div>

          <h3>Babel配置</h3>
          <div class="code-block">
            <div class="code-header">
              <span>.babelrc</span>
              <button @click="copyCode('babel-config')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="babel-config"  v-prism="'typescript'" >// .babelrc
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    ["component", {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }]
  ]
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 环境变量 -->
      <section class="section" id="section-3">
        <h2>3. 环境变量</h2>
        <div class="content">
          <h3>环境变量配置</h3>
          <p>Vue CLI支持多环境配置，通过.env文件定义不同环境的变量。</p>

          <h4>文件结构</h4>
          <div class="code-block">
            <div class="code-header">
              <span>环境配置文件</span>
              <button @click="copyCode('env-files')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="env-files"  v-prism="'typescript'" >.env              # 全局默认配置
.env.local        # 本地开发配置（不提交到git）
.env.development  # 开发环境配置
.env.production   # 生产环境配置</code></pre>
          </div>

          <h4>配置示例</h4>
          <div class="code-block">
            <div class="code-header">
              <span>环境变量配置</span>
              <button @click="copyCode('env-config')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="env-config"  v-prism="'typescript'" ># .env.development
NODE_ENV=development
VUE_APP_API_BASE_URL=http://localhost:3000/api
VUE_APP_DEBUG=true

# .env.production
NODE_ENV=production
VUE_APP_API_BASE_URL=https://api.example.com
VUE_APP_DEBUG=false</code></pre>
          </div>

          <h3>使用环境变量</h3>
          <div class="code-block">
            <div class="code-header">
              <span>使用环境变量</span>
              <button @click="copyCode('use-env')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="use-env"  v-prism="'typescript'" >// 在代码中使用
console.log(process.env.VUE_APP_API_BASE_URL);

// 在配置文件中使用
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true
      }
    }
  }
};</code></pre>
          </div>
        </div>
      </section>

      <!-- 开发流程 -->
      <section class="section" id="section-4">
        <h2>4. 开发流程</h2>
        <div class="content">
          <h3>标准开发流程</h3>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('process')">
              <span>开发流程步骤</span>
              <span class="toggle-icon">{{ collapsed.process ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed.process">
              <ol>
                <li><strong>需求分析</strong>：理解业务需求，制定开发计划</li>
                <li><strong>项目初始化</strong>：使用Vue CLI创建项目，配置依赖</li>
                <li><strong>代码开发</strong>：
                  <ul>
                    <li>组件开发</li>
                    <li>页面开发</li>
                    <li>功能实现</li>
                  </ul>
                </li>
                <li><strong>代码审查</strong>：提交代码前进行审查</li>
                <li><strong>测试</strong>：单元测试、集成测试</li>
                <li><strong>构建与部署</strong>：构建生产版本，部署到服务器</li>
              </ol>
            </div>
          </div>

          <h3>开发规范</h3>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('standards')">
              <span>开发规范</span>
              <span class="toggle-icon">{{ collapsed.standards ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed.standards">
              <ul>
                <li><strong>代码风格</strong>：使用ESLint和Prettier保持代码风格一致</li>
                <li><strong>命名规范</strong>：
                  <ul>
                    <li>组件名：PascalCase</li>
                    <li>变量名：camelCase</li>
                    <li>常量：UPPER_SNAKE_CASE</li>
                  </ul>
                </li>
                <li><strong>注释规范</strong>：关键代码添加注释，提高可维护性</li>
              </ul>
            </div>
          </div>

          <h3>Git工作流</h3>
          <div class="code-block">
            <div class="code-header">
              <span>Git 命令</span>
              <button @click="copyCode('git-workflow')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="git-workflow"  v-prism="'typescript'" ># 克隆仓库
git clone &lt;repository-url&gt;

# 创建分支
git checkout -b feature-branch

# 提交代码
git add .
git commit -m "feat: 新增功能"

# 推送分支
git push origin feature-branch

# 合并分支（PR）
# 在GitHub/GitLab上创建Pull Request</code></pre>
          </div>
        </div>
      </section>

      <!-- 状态管理 -->
      <section class="section" id="section-5">
        <h2>5. 状态管理</h2>
        <div class="content">
          <h3>Vuex</h3>
          <p>Vuex是Vue官方推荐的状态管理库，用于管理应用的全局状态。</p>

          <h4>核心概念</h4>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('vuex')">
              <span>Vuex 核心概念</span>
              <span class="toggle-icon">{{ collapsed.vuex ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed.vuex">
              <ul>
                <li><strong>State</strong>：存储状态</li>
                <li><strong>Getter</strong>：计算属性</li>
                <li><strong>Mutation</strong>：修改状态（同步）</li>
                <li><strong>Action</strong>：处理异步操作</li>
                <li><strong>Module</strong>：模块化管理</li>
              </ul>
            </div>
          </div>

          <h4>Vuex配置示例</h4>
          <div class="code-block">
            <div class="code-header">
              <span>store/index.js</span>
              <button @click="copyCode('vuex-config')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="vuex-config"  v-prism="'typescript'" >// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: '',
    count: 0
  },
  getters: {
    isLoggedIn: state => !!state.token,
    doubleCount: state => state.count * 2
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
    increment(state) {
      state.count++
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.login(credentials)
        commit('setUser', response.user)
        commit('setToken', response.token)
        return response
      } catch (error) {
        throw error
      }
    }
  },
  modules: {
    // 模块化状态
    products: {
      namespaced: true,
      state: { /* ... */ },
      mutations: { /* ... */ },
      actions: { /* ... */ }
    }
  }
})</code></pre>
          </div>

          <h4>使用Vuex</h4>
          <div class="code-block">
            <div class="code-header">
              <span>在组件中使用Vuex</span>
              <button @click="copyCode('use-vuex')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="use-vuex"  v-prism="'typescript'" >// 在组件中使用
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['isLoggedIn', 'doubleCount'])
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapActions(['login']),
    handleLogin() {
      this.login({ username: 'admin', password: '123456' })
        .then(() => {
          console.log('登录成功')
        })
    }
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 路由管理 -->
      <section class="section" id="section-6">
        <h2>6. 路由管理</h2>
        <div class="content">
          <h3>Vue Router</h3>
          <p>Vue Router是Vue官方的路由管理器，用于构建单页应用。</p>

          <h4>路由配置</h4>
          <div class="code-block">
            <div class="code-header">
              <span>router/index.js</span>
              <button @click="copyCode('router-config')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="router-config"  v-prism="'typescript'" >// router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', //  history 或 hash
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/user/:id',
      name: 'User',
      component: () => import('@/views/User.vue'), // 懒加载
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})</code></pre>
          </div>

          <h4>嵌套路由</h4>
          <div class="code-block">
            <div class="code-header">
              <span>嵌套路由配置</span>
              <button @click="copyCode('nested-router')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="nested-router"  v-prism="'typescript'" >routes: [
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'settings',
        component: Settings
      }
    ]
  }
]</code></pre>
          </div>

          <h4>路由守卫</h4>
          <div class="code-block">
            <div class="code-header">
              <span>路由守卫配置</span>
              <button @click="copyCode('router-guard')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="router-guard"  v-prism="'typescript'" >// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查是否需要登录
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isLoggedIn = store.getters.isLoggedIn
  
  if (requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

// 路由配置中添加meta
{
  path: '/dashboard',
  component: Dashboard,
  meta: { requiresAuth: true }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 接口请求 -->
      <section class="section" id="section-7">
        <h2>7. 接口请求</h2>
        <div class="content">
          <h3>Axios</h3>
          <p>Axios是一个基于Promise的HTTP客户端，用于发送请求。</p>

          <h4>安装与配置</h4>
          <div class="code-block">
            <div class="code-header">
              <span>Axios 配置</span>
              <button @click="copyCode('axios-config')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="axios-config"  v-prism="'typescript'" ># 安装
npm install axios

# 创建api实例
// api/index.js
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 添加token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 处理错误
    if (error.response.status === 401) {
      // 未授权，跳转到登录页
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default api</code></pre>
          </div>

          <h4>使用示例</h4>
          <div class="code-block">
            <div class="code-header">
              <span>使用Axios</span>
              <button @click="copyCode('use-axios')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="use-axios"  v-prism="'typescript'" >// api/user.js
import api from './index'

export const getUserList = () => {
  return api.get('/users')
}

export const getUserById = (id) => {
  return api.get(`/users/${id}`)
}

export const createUser = (user) => {
  return api.post('/users', user)
}

export const updateUser = (id, user) => {
  return api.put(`/users/${id}`, user)
}

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`)
}

// 在组件中使用
import { getUserList } from '@/api/user'

export default {
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        this.users = await getUserList()
      } catch (error) {
        console.error('获取用户列表失败', error)
      }
    }
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 测试 -->
      <section class="section" id="section-8">
        <h2>8. 测试</h2>
        <div class="content">
          <h3>测试工具</h3>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('testing')">
              <span>测试工具</span>
              <span class="toggle-icon">{{ collapsed.testing ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed.testing">
              <ul>
                <li><strong>Jest</strong>：JavaScript测试框架</li>
                <li><strong>Vue Test Utils</strong>：Vue组件测试工具</li>
                <li><strong>Cypress</strong>：端到端测试工具</li>
              </ul>
            </div>
          </div>

          <h4>单元测试</h4>
          <div class="code-block">
            <div class="code-header">
              <span>单元测试示例</span>
              <button @click="copyCode('unit-test')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="unit-test"  v-prism="'typescript'" >// 组件测试示例
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = mount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
  
  it('emits event when button is clicked', () => {
    const wrapper = mount(HelloWorld)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})

// 工具函数测试
import { sum } from '@/utils/calculator'

describe('calculator.js', () => {
  it('adds two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
</code></pre>
          </div>

          <h3>测试命令</h3>
          <div class="code-block">
            <div class="code-header">
              <span>测试命令</span>
              <button @click="copyCode('test-commands')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="test-commands"  v-prism="'typescript'" ># 运行单元测试
npm run test:unit

# 运行端到端测试
npm run test:e2e

# 查看测试覆盖率
npm run test:coverage</code></pre>
          </div>
        </div>
      </section>

      <!-- 部署 -->
      <section class="section" id="section-9">
        <h2>9. 部署</h2>
        <div class="content">
          <h3>构建生产版本</h3>
          <div class="code-block">
            <div class="code-header">
              <span>构建命令</span>
              <button @click="copyCode('build-command')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="build-command"  v-prism="'typescript'" ># 构建生产版本
npm run build

# 构建结果在dist目录
# 包含压缩后的HTML、CSS、JavaScript文件</code></pre>
          </div>

          <h3>部署方式</h3>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('deployment')">
              <span>部署方式</span>
              <span class="toggle-icon">{{ collapsed.deployment ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed.deployment">
              <ul>
                <li><strong>静态部署</strong>：部署到Nginx、Apache等静态服务器</li>
                <li><strong>容器部署</strong>：使用Docker容器</li>
                <li><strong>云服务</strong>：部署到Vercel、Netlify、GitHub Pages等</li>
              </ul>
            </div>
          </div>

          <h4>Nginx配置示例</h4>
          <div class="code-block">
            <div class="code-header">
              <span>Nginx配置</span>
              <button @click="copyCode('nginx-config')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="nginx-config"  v-prism="'typescript'" >server {
  listen 80;
  server_name example.com;
  
  root /usr/share/nginx/html;
  index index.html;
  
  location / {
    try_files $uri $uri/ /index.html;
  }
  
  location /api {
    proxy_pass http://backend:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}</code></pre>
          </div>

          <h4>Docker配置</h4>
          <div class="code-block">
            <div class="code-header">
              <span>Docker配置</span>
              <button @click="copyCode('docker-config')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="docker-config"  v-prism="'typescript'" ># Dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# 构建镜像
docker build -t my-vue-app .

# 运行容器
docker run -d -p 80:80 my-vue-app</code></pre>
          </div>
        </div>
      </section>

      <!-- 性能优化 -->
      <section class="section" id="section-10">
        <h2>10. 性能优化</h2>
        <div class="content">
          <h3>代码优化</h3>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('code-optimization')">
              <span>代码优化</span>
              <span class="toggle-icon">{{ collapsed['code-optimization'] ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed['code-optimization']">
              <ul>
                <li><strong>代码分割</strong>：使用动态导入实现懒加载</li>
                <li><strong>Tree Shaking</strong>：移除未使用的代码</li>
                <li><strong>组件懒加载</strong>：按需加载组件</li>
                <li><strong>图片优化</strong>：使用合适的图片格式和大小</li>
              </ul>
            </div>
          </div>

          <h4>代码分割示例</h4>
          <div class="code-block">
            <div class="code-header">
              <span>代码分割</span>
              <button @click="copyCode('code-splitting')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="code-splitting"  v-prism="'typescript'" >// 路由懒加载
const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')

// 组件懒加载
export default {
  components: {
    HeavyComponent: () => import('@/components/HeavyComponent.vue')
  }
}

// 异步加载第三方库
const loadChart = async () => {
  const { default: Chart } = await import('chart.js')
  // 使用Chart
}</code></pre>
          </div>

          <h3>构建优化</h3>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('build-optimization')">
              <span>构建优化</span>
              <span class="toggle-icon">{{ collapsed['build-optimization'] ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed['build-optimization']">
              <ul>
                <li><strong>压缩资源</strong>：压缩HTML、CSS、JavaScript</li>
                <li><strong>缓存策略</strong>：合理设置缓存头</li>
                <li><strong>CDN加速</strong>：使用CDN分发静态资源</li>
                <li><strong>Gzip压缩</strong>：启用服务器Gzip压缩</li>
              </ul>
            </div>
          </div>

          <h3>运行时优化</h3>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('runtime-optimization')">
              <span>运行时优化</span>
              <span class="toggle-icon">{{ collapsed['runtime-optimization'] ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed['runtime-optimization']">
              <ul>
                <li><strong>虚拟DOM</strong>：利用Vue的虚拟DOM减少DOM操作</li>
                <li><strong>响应式优化</strong>：合理使用computed和watch</li>
                <li><strong>事件委托</strong>：减少事件监听器</li>
                <li><strong>防抖和节流</strong>：优化频繁触发的事件</li>
              </ul>
            </div>
          </div>

          <h4>防抖和节流示例</h4>
          <div class="code-block">
            <div class="code-header">
              <span>防抖和节流</span>
              <button @click="copyCode('debounce-throttle')" class="copy-btn">
                📋 复制
              </button>
            </div>
            <pre><code id="debounce-throttle"  v-prism="'typescript'" >// 防抖
function debounce(func, wait) {
  let timeout
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, wait)
  }
}

// 节流
function throttle(func, limit) {
  let inThrottle
  return function() {
    if (!inThrottle) {
      func.apply(this, arguments)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// 使用
export default {
  methods: {
    handleSearch: debounce(function(query) {
      // 搜索逻辑
    }, 300),
    handleScroll: throttle(function() {
      // 滚动逻辑
    }, 100)
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section" id="section-11">
        <h2>11. 总结</h2>
        <div class="content">
          <h3>Vue2工程化的优势</h3>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('advantages')">
              <span>工程化优势</span>
              <span class="toggle-icon">{{ collapsed.advantages ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed.advantages">
              <ul>
                <li><strong>开发效率高</strong>：模块化、组件化开发，热更新等特性</li>
                <li><strong>代码质量好</strong>：ESLint、Prettier等工具保证代码质量</li>
                <li><strong>性能优化到位</strong>：代码分割、懒加载等优化手段</li>
                <li><strong>部署简单</strong>：构建工具和CI/CD流程</li>
                <li><strong>生态丰富</strong>：Vue Router、Vuex等官方库</li>
              </ul>
            </div>
          </div>

          <h3>最佳实践</h3>
          <div class="collapsible">
            <div class="collapsible-header" @click="toggleCollapse('best-practices')">
              <span>最佳实践</span>
              <span class="toggle-icon">{{ collapsed['best-practices'] ? '▼' : '▶' }}</span>
            </div>
            <div class="collapsible-content" v-show="!collapsed['best-practices']">
              <ul>
                <li>使用Vue CLI创建项目</li>
                <li>遵循ESLint和Prettier规范</li>
                <li>合理使用Vuex管理状态</li>
                <li>使用Vue Router实现路由</li>
                <li>封装API请求</li>
                <li>编写单元测试</li>
                <li>优化构建和部署</li>
              </ul>
            </div>
          </div>

          <h3>未来发展</h3>
          <p>Vue3已经发布，带来了Composition API、Teleport、Suspense等新特性。虽然Vue2仍然被广泛使用，但建议新项目考虑使用Vue3，享受更好的开发体验和性能。</p>

          <h3>学习资源</h3>
          <ul>
            <li><a href="https://vuejs.org/v2/guide/" target="_blank">Vue2官方文档</a></li>
            <li><a href="https://cli.vuejs.org/" target="_blank">Vue CLI文档</a></li>
            <li><a href="https://router.vuejs.org/" target="_blank">Vue Router文档</a></li>
            <li><a href="https://vuex.vuejs.org/" target="_blank">Vuex文档</a></li>
            <li><a href="https://axios-http.com/" target="_blank">Axios文档</a></li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'VueEngineering',
  data() {
    return {
      isDarkMode: false,
      showTopBtn: false,
      collapsed: {
        structure: true,
        principles: true,
        process: true,
        standards: true,
        vuex: true,
        testing: true,
        deployment: true,
        'code-optimization': true,
        'build-optimization': true,
        'runtime-optimization': true,
        advantages: true,
        'best-practices': true
      },
      sections: [
        { label: '项目结构与组织', value: 'structure' },
        { label: '构建工具与配置', value: 'principles' },
        { label: '环境变量', value: 'process' },
        { label: '开发流程', value: 'standards' },
        { label: '状态管理', value: 'vuex' },
        { label: '路由管理', value: 'router' },
        { label: '接口请求', value: 'api' },
        { label: '测试', value: 'testing' },
        { label: '部署', value: 'deployment' },
        { label: '性能优化', value: 'code-optimization' },
        { label: '总结', value: 'summary' }
      ],
      sectionValue: 'structure'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.showTopBtn = window.scrollY > 300
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    scrollToSection(sectionNumber) {
      const element = document.getElementById(`section-${sectionNumber}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
    copyCode(elementId) {
      const element = document.getElementById(elementId)
      if (element) {
        const text = element.textContent
        navigator.clipboard.writeText(text)
          .then(() => {
            alert('代码已复制到剪贴板')
          })
          .catch(err => {
            console.error('复制失败:', err)
          })
      }
    },
    toggleCollapse(key) {
      this.collapsed[key] = !this.collapsed[key]
    }
  },
  watch: {
    sectionValue: {
      handler(newVal, oldVal) {
        const section = this.sections.find(section => section.value === newVal)
        const index = this.sections.findIndex(section => section.value === newVal)

        if (newVal !== oldVal) {
          this.scrollToSection(index + 1)
        }
      },
      immediate: true
 }
    }
}
</script>

<style scoped>
.vue-engineering-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  transition: background-color 0.3s, color 0.3s;
  background-color: #ffffff;
  color: #333333;
}

.vue-engineering-container.dark-mode {
  background-color: #1a1a1a;
  color: #e0e0e0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.vue-engineering-container.dark-mode .header {
  border-bottom-color: #333333;
}

.header h1 {
  color: #42b983;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.mode-toggle, .top-btn {
  padding: 8px 16px;
  border: 1px solid #42b983;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.mode-toggle:hover, .top-btn:hover {
  background-color: #35495e;
}

.vue-engineering-container.dark-mode .mode-toggle,
.vue-engineering-container.dark-mode .top-btn {
  background-color: #35495e;
  border-color: #35495e;
}

.vue-engineering-container.dark-mode .mode-toggle:hover,
.vue-engineering-container.dark-mode .top-btn:hover {
  background-color: #42b983;
}

.toc {
  position: sticky;
  top: 20px;
  float: left;
  width: 250px;
  margin-right: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  height: fit-content;
}

.vue-engineering-container.dark-mode .toc {
  background-color: #2d2d2d;
}

.toc h3 {
  margin-top: 0;
  color: #42b983;
}

.toc ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc li {
  margin-bottom: 10px;
}

.toc a {
  color: #35495e;
  text-decoration: none;
  transition: color 0.3s;
}

.toc a:hover {
  color: #42b983;
}

.vue-engineering-container.dark-mode .toc a {
  color: #e0e0e0;
}

.vue-engineering-container.dark-mode .toc a:hover {
  color: #42b983;
}

.main-content {
  overflow: hidden;
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.vue-engineering-container.dark-mode .section {
  background-color: #2d2d2d;
}

h2 {
  color: #42b983;
  margin-bottom: 20px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

h3 {
  color: #35495e;
  margin: 20px 0 10px;
}

.vue-engineering-container.dark-mode h3 {
  color: #e0e0e0;
}

h4 {
  color: #718096;
  margin: 15px 0 8px;
}

.vue-engineering-container.dark-mode h4 {
  color: #b0b0b0;
}

.content {
  line-height: 1.6;
}

ul, ol {
  padding-left: 20px;
  margin-bottom: 15px;
}

li {
  margin-bottom: 8px;
}

.code-block {
  margin: 15px 0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  background-color: #2d3748;
  color: #e2e8f0;
}

.copy-btn {
  background: none;
  border: none;
  color: #e2e8f0;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.copy-btn:hover {
  color: #42b983;
}

pre {
  margin: 0;
  padding: 15px;
  background-color: #2d3748;
  color: #e2e8f0;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', Courier, monospace;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.vue-engineering-container.dark-mode a {
  color: #61dafb;
}

/* 折叠面板样式 */
.collapsible {
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.vue-engineering-container.dark-mode .collapsible {
  border-color: #333333;
}

.collapsible-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.vue-engineering-container.dark-mode .collapsible-header {
  background-color: #2d2d2d;
}

.collapsible-header:hover {
  background-color: #f0f0f0;
}

.vue-engineering-container.dark-mode .collapsible-header:hover {
  background-color: #3a3a3a;
}

.toggle-icon {
  font-size: 12px;
  transition: transform 0.3s;
}

.collapsible-content {
  padding: 15px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
}

.vue-engineering-container.dark-mode .collapsible-content {
  background-color: #2d2d2d;
  border-top-color: #333333;
}

@media (max-width: 992px) {
  .toc {
    float: none;
    width: 100%;
    margin-right: 0;
    margin-bottom: 30px;
    position: relative;
    top: 0;
  }
  
  .header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .vue-engineering-container {
    padding: 10px;
  }
  
  .section {
    padding: 15px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  h2 {
    font-size: 20px;
  }
  
  h3 {
    font-size: 18px;
  }
}
</style>