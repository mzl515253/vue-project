<template>
   <div class="tab-content">
          <h2>Vue Router 路由</h2>
          <h3>定义</h3>
          <p>
            Vue Router 是 Vue 的官方路由管理器，用于实现单页应用的路由功能。
          </p>
          <h3>基本配置</h3>
          <div class="code-block">
            <pre><code v-prism="'typescript'">// 安装路由 npm install vue-router
// 创建router.js文件，用于配置路由
// 1. 引入 Vue 实例
import Vue from 'vue'
// 2. 引入 Vue router 实例
import VueRouter from 'vue-router'
// 3. 引入路由组件
import Home from '@/pages/home.vue'
import About from '@/pages/about.vue'
import User from '@/pages/user.vue'
import Layout from '@/pages/home/layout.vue'

Vue.use(VueRouter) // 安装路由插件

// 定义路由
var routes = [
  { 
  path: '/',
  name:'home',  // 路由名称，用于在路由导航时使用,简化路由跳转
  component: Home, 
  children: [
    { 
        path: 'layout', 
        name:'homeLayout', 
        component: Layout,
      } // 子路由,layout是子路由的路径不用加 / 
    ] 
  },
  { path: '/about',name:'about', component: About },
  { 
    path: '/user/:id', 
    name:'user',  // 路由名称，用于在路由导航时使用,简化路由跳转
    component: User, 
    props: true
  },
]

// 创建路由实例
var router = new VueRouter({
  routes: routes,
  mode: 'history'  // 历史模式，不显示 # 号，需要后端配置 fallback，否则会404错误；默认为 hash 模式，显示 # 号，404 问题不会出现
})

// 在 main.js 中，挂载到 Vue 实例
// 引入 Vue router 实例
// 1. 引入 Vue 实例
import Vue from 'vue'
// 2. 引入 Vue router 实例
import router from './router'

new Vue({
  router: router
}).$mount('#app')</code></pre>
          </div>
          <h3 class="title">路由导航</h3>
          <div class="code-block">
            <pre><code v-prism="'typescript'">
//在app.vue中使用路由-view组件进行导航
&lt;router-view&gt;&lt;/router-view&gt;  // 路由-view组件用于渲染当前路由组件

&lt;!-- 声明式导航 --&gt;
// to 的字符串写法
&lt;router-link to="/"&gt;首页&lt;/router-link&gt; 
&lt;router-link to="/about"&gt;关于&lt;/router-link&gt;
&lt;router-link to="/home/layout"&gt;布局&lt;/router-link&gt;

// to 的对象写法
&lt;router-link :to="{ path: '/user', query: { id: 1 } }"&gt;用户1&lt;/router-link&gt;  
&lt;router-link :to="{ path: '/about' }"&gt;用户1&lt;/router-link&gt;  
&lt;router-link :to="{ path: '/home/layout' }"&gt;布局&lt;/router-link&gt; 

&lt;!-- 编程式导航 --&gt;
this.$router.push('/about') // 跳转到关于页面
this.$router.push({ path: '/user', query: { id: 1 } }) // 跳转到用户1页面
this.$router.replace('/about') // 替换当前路由，不保留历史记录
this.$router.go(-1) // 返回上一页 go() 方法可以指定返回的步数，数字类型；负数表示返回，正数表示前进
this.$router.back() // 返回上一页
this.$router.forward() // 前进一步
</code></pre>
          </div>
           <h3 class="title">路由传参</h3>
           <div class="code-block">
            <pre><code v-prism="'typescript'">&lt;!-- 路由传参 --&gt;
// 1. 路由param传参,字符写法
&lt;router-link :to="`/about/${id}`"&gt;用户1&lt;/router-link&gt;  // 路由param参数

// 1-1. 路由param传参,对象写法:params不能用path,只能用name
&lt;router-link :to="{ name: 'about', params: { id: 1 } }"&gt;用户1&lt;/router-link&gt;  // 路由param参数
 
// 2. 路由query传参,字符写法
&lt;router-link :to="`/user?id=${id}&title=${title}&name=${name}`"&gt;用户1&lt;/router-link&gt;  // 路由query参数
// 2-1. 路由query传参,对象写法:push方法可以保留历史记录，replace方法不能保留历史记录,默认是push方法
&lt;router-link  replace  :to="{ path: '/user', query: { id: 1, title: 'name', name: '尚硅谷' } }"&gt;用户1&lt;/router-link&gt;  // 路由query参数

new Vue({
  el: '#root',
  data() {
    return {
      name: '尚硅谷',
      id: 1,
      title: 'name'
    }
  }
})

 // 在router.js中配置路由参数
       {
          path: '/about/:id',  // 路由param参数, :id 表示动态参数, 可以在组件中使用 this.$route.params.id 接收
          name: 'about',  // 路由名称，用于在路由导航时使用,简化路由跳转
          component: () => import('@/pages/about.vue'),
        },
        {
          path: '/user',
          name: 'user', // 路由名称，用于在路由导航时使用,简化路由跳转
          component: () => import('@/pages/user.vue'),
        },
// about 路由组件中接收路由参数
 let id =  this.$route.params.id

 // user 路由组件中接收路由参数
 let id =  this.$route.query.id
 let title =  this.$route.query.title
 let name =  this.$route.query.name


 // 如果在router.js中给路由组件配置props
       {
          path: '/about/:id',
          name: 'about',
          component: () => import('@/pages/about.vue'),
          props: true  // props布尔值写法，开启路由参数传递, 仅针对params参数
        },
       {
          path: '/user',
          name: 'user',
          component: () => import('@/pages/user.vue'),
          props: (route) => ({ //  props 函数写法，开启路由参数传递, query参数和params参数都可以传递
            id: route.query.id,
            title: route.query.title,
            name: route.query.name
          })
        },

    {
          path: '/home',
          name: 'home',
          component: () => import('@/pages/home.vue'),
          props:{  // props对象写法，静态数据传递，不常用
            id: 1,
            title: 'name',
            name: '尚硅谷'
          },
          children: [
            { 
            path: 'layout', 
            name:'homeLayout', 
            component: () => import('@/pages/home/layout.vue') 
            } // 子路由,layout是子路由的路径不用加 / 
          ]
        },
// about 路由组件中用props接收路由参数
 props:['id']

 // user 路由组件中用props接收路由参数
props:['id','title','name']

 // home 路由组件中用props接收路由参数
props:['id','title','name']
</code></pre>
          </div>
        <!-- 路由守卫 -->
          <h3>路由守卫</h3>
          <div class="code-block">
            <pre><code v-prism="'typescript'">
    { 
        path: '/viewss', 
        name:'viewss', 
        component: () => import('@/pages/viewss.vue'),
        meta:{
          title:'布局',  // 路由元信息，自定义属性,此处用于设置页面标题
          isAuth:true     // 自定义属性,此处用于页面是否需要鉴权
        }
    } 
// 全局前置守卫 -- 进入路由前执行
router.beforeEach(function(to, from, next) {
  // 检查是否需要权限
  if (to.meta.isAuth ) {
    next('/viewss')
  } else {
    next()
  }
})
// 全局后置守卫 -- 路由切换后执行
router.afterEach(function(to, from) {
  // 路由切换后执行
  console.log(to, from)
  document.title = to.meta.title // 设置页面标题
})


// 独享守卫 -- 仅对当前路由生效
{ 
        path: '/sss', 
        name:'sss', 
        component: () => import('@/pages/sss.vue'),
        
// 独享前置路由守卫 -- 仅对当前路由生效，注：没有独享后置路由守卫
        beforeEnter: function(to, from, next) {
          // 检查是否需要权限
          if (to.meta.isAuth ) {
            next('/sss')
          } else {
            next()
          }
        }
        
    } 


// 组件内守卫
export default {
  beforeRouteEnter: function(to, from, next) {
    // 进入路由前
  },
  beforeRouteUpdate: function(to, from, next) {
    // 路由参数变化时
  },
  beforeRouteLeave: function(to, from, next) {
    // 离开路由前
  }
}</code></pre>
          </div>
    <!-- 路由缓存 -->
     <h3>路由缓存</h3>
     <div class="code-block">
        <pre><code v-prism="'typescript'">
    { 
        path: '/sss', 
        name:'sss', 
        component: () => import('@/pages/sss.vue'),
        meta:{
          title:'布局',  // 路由元信息，自定义属性,此处用于设置页面标题
          isAuth:true     // 自定义属性,此处用于页面是否需要鉴权
        }
    } 
    // 路由缓存 -- 缓存当前路由组件，避免重复创建
    &lt;keep-alive include="组件名" exclude="组件名"&gt;  //组件名：配置在路由组件中的name属性（vm和vc的name配置项设置的名字）  缓存sss路由组件，不缓存user路由组件, 可以写多个路由名称, 用逗号隔开,如include="sss,user" ( :include="['sss','user']")或 exclude="sss,user" ( :exclude="['sss','user']") 
    &lt;router-view&gt;&lt;/router-view&gt;
    &lt;/keep-alive&gt;
    // 两个新的生命周期钩子函数
    // 在缓存的组件中使用，分别在组件被激活和停用时执行
    // 注意：
    // 这两个函数在缓存的组件中才有效，对普通组件无效
    // 缓存的组件不会被销毁，只是停用状态;
    activated() {
      // 组件被激活时执行
    },
    deactivated() {
      // 组件被停用时执行
    }
</code></pre>
     </div>
  <!-- 路由的两种模式 -->
     <h3>路由的两种模式</h3>
     <ul>
        <li>hash 模式</li>
        <li>history 模式</li>
        <li>区别:
            <ol>
                <li>URL 格式</li>
                <ul>
                    <li>hash 模式的 URL 中包含井号（#），例如：http://example.com/#/home。</li>
                    <li>history 的 URL 没有井号，例如：http://example.com/home</li>
                </ul>
                <li>浏览器兼容性</li>
                <ul>
                    <li>hash 模式兼容到 IE8 及以上。</li>
                    <li>history 模式需要 IE10 及以上支持，因为它依赖 HTML5 的 History API。</li>
                </ul>
                <li> 服务器请求</li>
                <ul>
                    <li>hash 值的变化不会导致浏览器向服务器发送请求。</li>
                    <li>history 模式在刷新页面或直接访问路径时会发送请求，如果没有正确配置后端，可能会导致 404 错误。</li>
                </ul>
                <li>功能特性</li>
                <ul>
                    <li>hash 模式主要用于页面定位，支持浏览器前进后退功能，但锚点功能会被占用。</li>
                    <li>history 模式提供了对历史记录的修改功能，支持更复杂的路径和参数传递，包括通过特定对象存储数据。</li>
                </ul> 
 <li>实现原理</li> 
 <ul>
    <li> hash 模式通过监听hashchange事件来实现路由切换。</li>
    <li> history 模式通过pushState和replaceState方法修改历史记录，并监听这些方法的调用。</li>
 </ul>
<li>美观性和 SEO</li>
<ul>
    <li> history 模式的 URL 更简洁美观，可能更适合需要良好 SEO 的网站。</li>
    <li> hash 模式的 URL 可能被认为不够优雅，对 SEO 有一定影响。</li>
 </ul>
   </ol>
    </li>
     </ul>



          <h3>使用场景</h3>
          <ul>
            <li>单页应用的页面切换</li>
            <li>权限控制</li>
            <li>嵌套路由</li>
          </ul>
          <h3 style="color:red;">注意点</h3>
          <ul>
            <li>使用 history 模式时，需要后端配置 fallback</li>
            <li>路由参数变化时，组件不会重新创建，需要使用 watch 或 beforeRouteUpdate 来监听路由参数变化</li>
            <li style="color:red;">一个项目中，只能有一个路由实例(路由器router)，不能有多个路由实例</li>
            <li style="color:red;">每个组件都有自己的$route属性，用于获取当前路由的参数($route.params或$route.query)、元信息(meta配置中的属性)等信息</li>
            <li style="color:red;"> 通过切换，“隐藏了的路由组件”，默认是被销毁的，需要的时候再去挂载，若不想销毁需要使用 keep-alive 组件缓存</li>
            <li>前置路由守卫中必须调用 next()</li>
            <li>路由守卫中不能使用 this.$router.push() \replace()等方法，会进入死循环</li>
            <li style="color:red;">路由缓存中，组件的生命周期钩子函数( mounted,created,updated,destroyed )不会执行</li>
          </ul>
        </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>