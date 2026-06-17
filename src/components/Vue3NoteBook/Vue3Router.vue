<template>
  <div class="tab-content">
    <h2>Vue3 路由系统</h2>
    
    <h3>定义</h3>
    <p>Vue3 路由系统基于 Vue Router 4，是 Vue 官方提供的路由管理器，用于实现单页应用（SPA）的页面切换和导航。</p>
    
    <h3>核心概念</h3>
    <ul>
      <li><strong>路由</strong>：URL 与组件的映射关系</li>
      <li><strong>路由配置</strong>：定义路由规则的配置对象</li>
      <li><strong>路由参数</strong>：通过 URL 传递的数据</li>
      <li><strong>嵌套路由</strong>：路由的层级结构</li>
      <li><strong>路由守卫</strong>：路由导航的钩子函数</li>
      <li><strong>路由懒加载</strong>：按需加载路由组件</li>
    </ul>
    
    <h3>安装与配置</h3>
    
    <h4>安装 Vue Router</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 使用 npm
npm install vue-router@4

// 使用 yarn
yarn add vue-router@4

// 使用 pnpm
pnpm add vue-router@4
</code></pre>
    </div>
    
    <h4>基本配置</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'" >// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  //路由重定向: 当访问根路径时，重定向到首页
  {
    path: '/',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
</code></pre>
    </div>
    
    <h4>在应用中使用</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
</code></pre>
    </div>
    
    <h3>基本用法</h3>
    
    <h4>1. 声明式导航</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">&lt;template&gt;
  &lt;div&gt;
    &lt;router-link to="/"&gt;首页&lt;/router-link&gt;
    &lt;router-link to="/about"&gt;关于我们&lt;/router-link&gt;
    
   // 带参数的路由 
    &lt;router-link :to="{ path: '/user', query: { id: 1 } }"&gt;用户详情&lt;/router-link&gt;
    
     //   命名路由
    &lt;router-link :to="{ name: 'User', params: { id: 1 } }"&gt;用户详情&lt;/router-link&gt;
    
     //   路由出口
    &lt;router-view&gt;&lt;/router-view&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre>
    </div>
    
    <h4>2. 编程式导航</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">&lt;script setup&gt;
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 导航到指定路径
function navigateToHome() {
  router.push('/')
}

// 带参数的导航
function navigateToUser(id) {
  // 方式1：使用 path 和 query
  router.push({
    path: '/user',
    query: { id }
  })
  
  // 方式2：使用 name 和 params
  router.push({
    name: 'User',
    params: { id }
  })
}

// 替换当前历史记录
function replaceToAbout() {
  router.replace('/about')
}

// 前进/后退
function goBack() {
  router.back()
}

function goForward() {
  router.forward()
}

function go(n) {
  router.go(n) // n 为正数前进，负数后退
}

// 获取当前路由参数
console.log(route.params)
console.log(route.query)
console.log(route.path)
console.log(route.fullPath)
&lt;/script&gt;
</code></pre>
    </div>
    
    <h3>路由参数传递</h3>
    
    <h4>1. 动态路由参数</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 路由配置
const routes = [
  {
    path: '/user/:id/:name?',  // 可选参数, name 是可传可不传
    name: 'User',
    component: User
  }
]

// 导航
router.push('/user/123')
// 或
router.push({ name: 'User', params: { id: '123' } }) // params传参只能用name

// 在组件中获取参数
&lt;script setup&gt;
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.id) // 123
&lt;/script&gt;
</code></pre>
    </div>
    
    <h4>2. 查询参数</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 导航
router.push('/user?name=John&age=30')
// 或
router.push({ path: '/user', query: { name: 'John', age: 30 } }) // query传参用name和path都可以

// 在组件中获取参数
&lt;script setup&gt;
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.query.name) // John
console.log(route.query.age) // 30
&lt;/script&gt;
</code></pre>
    </div>
    
    <h4>3. 路由 props</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 方式1：布尔模式
const routes = [
  {
    path: '/user/:id/:name', 
    component: User,
    props: true // 将路由参数作为 props 传递
  }
]

// 方式2：对象模式
const routes = [
  {
    path: '/user',
    component: User,
    props: { default: true, sidebar: false } // 静态 props
  }
]

// 方式3：函数模式
const routes = [
  {
    path: '/user/:id',
    component: User,
    props: (route) => ({
      id: route.params.id,
      name: route.query.name
    })
  }
]

// 在组件中使用
&lt;script setup&gt;
defineProps(['id', 'name'])
&lt;/script&gt;
</code></pre>
    </div>
    
    <h3>嵌套路由</h3>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 路由配置
const routes = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '', // 默认子路由
        component: UserList
      },
      {
        path: ':id',
        component: UserDetail
      },
      {
        path: ':id/edit',
        component: UserEdit
      }
    ]
  }
]

// UserLayout.vue
&lt;template&gt;
  &lt;div class="user-layout"&gt;
    &lt;h2&gt;用户管理&lt;/h2&gt;
    &lt;div class="user-sidebar"&gt;
      &lt;router-link to="/user"&gt;用户列表&lt;/router-link&gt;
    &lt;/div&gt;
    &lt;div class="user-content"&gt;
      &lt;router-view&gt;&lt;/router-view&gt; <!-- 子路由出口 -->
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre>
    </div>
    
    <h3>路由守卫</h3>
    
    <h4>1. 全局守卫</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// src/router/index.ts
const router = createRouter({
  // 配置...
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查是否需要登录
  const isLoggedIn = localStorage.getItem('token')
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

// 全局解析守卫
router.beforeResolve((to, from, next) => {
  // 在所有组件内守卫和异步路由组件被解析之后调用
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 导航完成后调用
  console.log('导航完成:', to.path)
})
</code></pre>
    </div>
    
    <h4>2. 路由独享守卫</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">const routes = [
  {
    path: '/user/:id',
    component: User,
    beforeEnter: (to, from, next) => {
      // 只对当前路由生效
      if (to.params.id === '1') {
        next()
      } else {
        next('/404')
      }
    }
  }
]
</code></pre>
    </div>
    
    <h4>3. 组件内守卫</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 在组件中使用
&lt;script setup&gt;
import { onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'

// 进入路由前
onBeforeRouteEnter((to, from, next) => {
  // 此时组件实例还未创建
  console.log('进入路由前')
  next()
})

// 路由更新时（参数变化）
onBeforeRouteUpdate((to, from, next) => {
  // 组件实例已存在
  console.log('路由更新时')
  next()
})

// 离开路由前
onBeforeRouteLeave((to, from, next) => {
  // 确认是否离开
  if (confirm('确定要离开吗？')) {
    next()
  } else {
    next(false)
  }
})
&lt;/script&gt;
</code></pre>
    </div>
    
    <h3>路由懒加载</h3>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 方式1：动态导入
const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue')
  }
]

// 方式2：带命名的动态导入（用于代码分割）
const routes = [
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

// 方式3：嵌套懒加载
const routes = [
  {
    path: '/user',
    component: () => import('@/views/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/UserList.vue')
      },
      {
        path: ':id',
        component: () => import('@/views/UserDetail.vue')
      }
    ]
  }
]
</code></pre>
    </div>
    
    <h3>路由元信息</h3>
    <div class="code-block">
      <pre><code v-prism="'typescript'">const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: '首页',
      requiresAuth: false,
      layout: 'default'
    }
  },
  {
    path: '/admin',
    component: Admin,
    meta: {
      title: '管理后台',
      requiresAuth: true,
      roles: ['admin'],
      layout: 'admin'
    }
  }
]

// 在全局守卫中使用
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || '默认标题'
  
  // 检查权限
  if (to.meta.requiresAuth) {
    const userRole = localStorage.getItem('role')
    if (to.meta.roles && !to.meta.roles.includes(userRole)) {
      next('/403')
    } else {
      next()
    }
  } else {
    next()
  }
})
</code></pre>
    </div>
    
    <h3>Vue2 vs Vue3 路由区别</h3>
    
    <table class="comparison-table">
      <thead>
        <tr>
          <th>特性</th>
          <th>Vue2 (Vue Router 3)</th>
          <th>Vue3 (Vue Router 4)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>创建方式</td>
          <td>使用 new VueRouter()</td>
          <td>使用 createRouter()</td>
        </tr>
        <tr>
          <td>历史模式</td>
          <td>mode: 'history'</td>
          <td>history: createWebHistory()</td>
        </tr>
        <tr>
          <td>哈希模式</td>
          <td>mode: 'hash'</td>
          <td>history: createWebHashHistory()</td>
        </tr>
        <tr>
          <td>内存模式</td>
          <td>mode: 'abstract'</td>
          <td>history: createMemoryHistory()</td>
        </tr>
        <tr>
          <td>组合式 API</td>
          <td>不支持</td>
          <td>支持 useRouter() 和 useRoute()</td>
        </tr>
        <tr>
          <td>组件内守卫</td>
          <td>使用选项式 API (beforeRouteEnter等)</td>
          <td>支持组合式 API (onBeforeRouteEnter等)</td>
        </tr>
        <tr>
          <td>路由懒加载</td>
          <td>支持</td>
          <td>支持，语法相同</td>
        </tr>
        <tr>
          <td>导航守卫</td>
          <td>支持</td>
          <td>支持，语法相同</td>
        </tr>
        <tr>
          <td>路由元信息</td>
          <td>支持</td>
          <td>支持，语法相同</td>
        </tr>
        <tr>
          <td>动态路由</td>
          <td>支持</td>
          <td>支持，语法相同</td>
        </tr>
        <tr>
          <td>嵌套路由</td>
          <td>支持</td>
          <td>支持，语法相同</td>
        </tr>
        <tr>
          <td>TypeScript 支持</td>
          <td>有限</td>
          <td>更好的 TypeScript 支持</td>
        </tr>
        <tr>
          <td>路由状态管理</td>
          <td>与 Vuex 集成</td>
          <td>与 Pinia 集成更友好</td>
        </tr>
      </tbody>
    </table>
    
    <h3>常见问题与解决方案</h3>
    
    <h4>1. 路由跳转后页面不刷新</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 问题：路由参数变化时页面不刷新
// 原因：组件被复用，生命周期钩子不会重新执行

// 解决方案1：使用 watch 监听路由参数变化
&lt;script setup&gt;
import { useRoute, watch } from 'vue-router'

const route = useRoute()

watch(() => route.params.id, (newId) => {
  // 处理参数变化
  fetchData(newId)
}, { immediate: true })

function fetchData(id) {
  // 获取数据
}
&lt;/script&gt;

// 解决方案2：使用 onBeforeRouteUpdate 钩子
&lt;script setup&gt;
import { onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate((to) => {
  // 处理参数变化
  fetchData(to.params.id)
})

function fetchData(id) {
  // 获取数据
}
&lt;/script&gt;
</code></pre>
    </div>
    
    <h4>2. 路由懒加载失效</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 问题：路由懒加载没有生效
// 原因：可能是打包配置问题或导入方式不正确

// 解决方案：确保使用正确的动态导入语法
const routes = [
  {
    path: '/home',
    // 正确的语法
    component: () => import('@/views/Home.vue')
    
    // 错误的语法
    // component: import('@/views/Home.vue') // 缺少箭头函数
  }
]

// 检查打包配置
// vite.config.ts 或 webpack.config.js 中确保配置了代码分割
</code></pre>
    </div>
    
    <h4>3. 路由守卫无限循环</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 问题：路由守卫导致无限循环
// 原因：在守卫中总是跳转到同一个路由

// 错误示例
router.beforeEach((to, from, next) => {
  if (!isLoggedIn) {
    next('/login') // 可能导致无限循环
  } else {
    next()
  }
})

// 正确示例
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else if (!isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})
</code></pre>
    </div>
    
    <h3>最佳实践</h3>
    
    <h4>1. 路由配置最佳实践</h4>
    <ul>
      <li><strong>模块化路由</strong>：将路由配置拆分为多个模块，便于管理</li>
      <li><strong>使用命名路由</strong>：提高代码可读性和可维护性</li>
      <li><strong>添加路由元信息</strong>：用于权限控制、页面标题等</li>
      <li><strong>使用路由懒加载</strong>：减少初始加载时间</li>
      <li><strong>合理使用嵌套路由</strong>：组织复杂的页面结构</li>
    </ul>
    
    <h4>2. 导航最佳实践</h4>
    <ul>
      <li><strong>优先使用声明式导航</strong>：对于简单的导航，使用 router-link</li>
      <li><strong>合理使用编程式导航</strong>：对于复杂的导航逻辑，使用 router.push()</li>
      <li><strong>使用 replace 方法</strong>：对于不需要历史记录的导航</li>
      <li><strong>正确处理路由参数</strong>：根据场景选择 params 或 query</li>
    </ul>
    
    <h4>3. 性能优化</h4>
    <ul>
      <li><strong>路由懒加载</strong>：按需加载路由组件</li>
      <li><strong>预加载关键路由</strong>：对于用户可能访问的路由进行预加载</li>
      <li><strong>使用 keep-alive</strong>：缓存路由组件，减少重复渲染</li>
      <li><strong>优化路由守卫</strong>：避免在守卫中执行耗时操作</li>
    </ul>
    
    <h4>4. 代码组织</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 推荐的目录结构
/src
  /router
    /modules
      user.ts
      admin.ts
      product.ts
    index.ts
  /views
    /user
      UserList.vue
      UserDetail.vue
      UserEdit.vue
    /admin
      AdminDashboard.vue
      AdminUsers.vue
    /product
      ProductList.vue
      ProductDetail.vue
</code></pre>
    </div>
    
    <h4>5. 权限管理</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">// 基于路由元信息的权限控制
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      roles: ['admin']
    }
  }
]

// 全局守卫
router.beforeEach((to, from, next) => {
  const { requiresAuth, roles } = to.meta
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role')
  
  if (requiresAuth && !token) {
    next('/login')
  } else if (roles && roles.length > 0 && !roles.includes(userRole)) {
    next('/403')
  } else {
    next()
  }
})
</code></pre>
    </div>
    
    <h3>总结</h3>
    <p>Vue3 路由系统基于 Vue Router 4，提供了强大而灵活的路由管理能力。与 Vue2 路由相比，Vue3 路由在 API 设计上更加现代化，支持组合式 API，并且与 Vue3 的响应式系统更好地集成。</p>
    <p>主要特点包括：</p>
    <ul>
      <li>使用 createRouter() 创建路由实例</li>
      <li>支持组合式 API（useRouter() 和 useRoute()）</li>
      <li>提供了新的 history 创建方法（createWebHistory() 等）</li>
      <li>更好的 TypeScript 支持</li>
      <li>与 Pinia 等状态管理库更好的集成</li>
    </ul>
    <p>通过合理使用路由系统，可以构建出结构清晰、用户体验良好的单页应用。开发者应该根据具体需求，选择合适的路由配置和导航方式，同时注意性能优化和代码组织，以确保应用的可维护性和扩展性。</p>
  </div>
</template>

<style lang="scss" scoped>
@use "./v3Note.scss";

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
}
</style>
