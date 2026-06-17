<template>
<div class="tab-content">
          <h2>Vuex 状态管理</h2>
          <h3>定义</h3>
          <p>Vuex 是 Vue 的官方状态管理库，用于管理应用的共享状态。</p>
          <h3>核心概念</h3>
          <ul>
            <li><strong>State</strong>: 存储状态</li>
            <li><strong>Getters</strong>: 计算派生状态</li>
            <li><strong>Mutations</strong>: 修改状态的方法（同步）</li>
            <li><strong>Actions</strong>: 处理异步操作</li>
            <li><strong>Modules</strong>: 模块化状态管理</li>
          </ul>
          <h3>基本使用</h3>
          <div class="code-block">
            <pre><code v-prism="'typescript'">
//创建store.js 引入 Vuex
import Vuex from 'vuex'
import Vue from 'vue'

// 安装 Vuex
Vue.use(Vuex)

// 创建 store
var store = new Vuex.Store({
  state: {
    count: 0,
    age: 18
  },
  mutations: {
    changeCount(state,value) {
      state.count += value
    },
    changeAge(state,value) {
      state.age = value
    }
  },
  actions: {
    changeAgeAsync(context,value) {
      if(value >= 8) {
        context.commit('changeAge',value)
      }
    }
  },
  getters: {
    doubleCount: function(state) {
      return state.count * 2
    }
  }
})
// 在main.js中引入 store.js文件并 挂载 store
import store from './store.js'

new Vue({
  el: '#root',
  store
})


// 在组件中使用 store

data() {
  return {
    sum: 0,
    age2: 40
  }
}


methods: {
  changeCount1() {
    this.sum += 10
    this.$store.commit('changeCount',this.sum) // 直接提交至mutations 同步修改状态，无需通过actions
  },
  changeAgeAsync1() {
    this.age2--
    this.$store.dispatch('changeAgeAsync',this.age2) // 提交至actions 异步修改状态
  }
}

computed: {
  doubleCount() {
    return this.$store.getters.doubleCount // 访问getters中的doubleCount
  },
  count() {
    return this.$store.state.count // 访问state中的count
  },
  age2() {
    return this.$store.state.age // 访问state中的age
  }
}

import { mapState, mapGetters,mapActions, mapMutations } from 'vuex'

computed: {
    // mapState 辅助函数：将 store 中的状态映射到组件的 computed 中，无需手动访问 $store.state.count
  ...mapState({
    count2: 'count', // 键值不同就这样写
    age2: 'age'  // 键值不同就这样写
  })
  或
  ...mapState(['count','age']) 
//count 要求名字一致，才能使用数组写法，否则会报错

// mapGetters 辅助函数：将 store 中的 getters 映射到组件的 computed 中，无需手动访问 $store.getters.doubleCount
  ...mapGetters({
    doubleCount: 'doubleCount'
  })
  或
  ...mapGetters(['doubleCount'])
  //doubleCount 要求名字一致，才能使用数组写法，否则会报错
}

methods: {
// mapActions 辅助函数：将 store 中的 actions 映射到组件的 methods 中，无需手动提交 actions
  ...mapActions({
    changeAgeAsync1: 'changeAgeAsync'
  })
  或
  ...mapActions(['changeAgeAsync']) //changeAgeAsync 要求名字一致，才能使用数组写法，否则会报错：
  // changeAgeAsync is not a function，需要在 methods 中定义 changeAgeAsync 方法


// mapMutations 辅助函数：将 store 中的 mutations 映射到组件的 methods 中，无需手动提交 mutations
  ...mapMutations({
    changeCount1: 'changeCount'
  })
  或
  ...mapMutations(['changeCount'])
  //changeCount 要求名字一致，才能使用数组写法，否则会报错：
  // changeCount is not a function，需要在 methods 中定义 changeCount 方法

  // 模块中的调用模块中的actions  mutations 可以接收参数
    如果映射写法(mapActions,mapMutations)中有参数，则在模板中对应的函数中传递参数,如:  @click="changeAgeAsync1('actions接受参数')" @click="changeCount1('mutations接受参数')"
}
</code></pre>
          </div>
          <h3>模块化</h3>
          <div class="code-block">
            <pre><code v-prism="'typescript'">// 模块
var userModule = {
  namespaced: true, // 开启命名空间，必须开启
  // 模块中的状态
  state: {
    userInfo: null
  },
  mutations: {
    setUserInfo: function(state, info) {
      state.userInfo = info
    }
  },
  actions: {
    fetchUserInfo: function(context,value) {
      // 异步获取用户信息
      context.commit('setUserInfo',value)
    }
  },
  getters: {
    doubleUserInfo: function(state) {
      return state.userInfo * 2
    }
  }
}

// 注册模块
var store = new Vuex.Store({
  modules: {
    user: userModule
  }
})

// 访问模块中的state
var userInfo = this.$store.state.user.userInfo
// 辅助写法 在computed中使用
...mapState('user',{
  userInfo: 'userInfo'
})
或
...mapState('user', ['userInfo']) // userInfo 要求名字一致，才能使用数组写法，否则会报错：
// userInfo is not a function，需要在 methods 中定义 userInfo 方法


// 访问模块中的getters
var doubleUserInfo = this.$store.getters['user/doubleUserInfo']
// 辅助写法 在computed中使用
...mapGetters('user',{
  doubleUserInfo: 'doubleUserInfo'
})
或
...mapGetters('user', ['doubleUserInfo'])


// 调用模块中的actions
this.$store.dispatch('user/fetchUserInfo','参数')
// 使用映射 在methods中使用
 ...mapActions('user',{
    fetchUserInfo: 'fetchUserInfo'
  })
  或
  ...mapActions('user', ['fetchUserInfo'])
  //fetchUserInfo 要求名字一致，才能使用数组写法，否则会报错：
  // fetchUserInfo is not a function，需要在 methods 中定义 fetchUserInfo 方法


// 调用模块中的mutations
this.$store.commit('user/setUserInfo', info)
// 使用映射 在methods中使用
    ...mapMutations('user',{
      setUserInfo: 'setUserInfo'
    })
    或
    ...mapMutations('user', ['setUserInfo'])
    //setUserInfo 要求名字一致，才能使用数组写法，否则会报错：
    // setUserInfo is not a function，需要在 methods 中定义 setUserInfo 方法

    // 模块中的调用模块中的actions  mutations 可以接收参数
    // 如果映射写法(mapActions,mapMutations)中有参数，则在模板中对应的函数中传递参数,如:  @click="setUserInfo('mutations接受参数')" @click="fetchUserInfo('actions接受参数')"
</code></pre>
          </div>
          <h3>使用场景</h3>
          <ul>
            <li>多个组件共享状态</li>
            <li>复杂的状态管理逻辑</li>
            <li>需要跟踪状态变化历史</li>
            <li>需要将状态拆分成多个模块</li>
          </ul>
          <h3>注意点</h3>
          <ul>
            <li>Mutations 必须是同步的,否则会导致状态不一致</li>
            <li>Actions 可以是异步的</li>
            <li>避免直接修改 state，应该通过 mutations</li>
            <li>对于大型应用，使用模块化</li>
            <li>模块中的状态、actions、mutations、getters 都需要开启命名空间 namespaced: true, // 开启命名空间，必须开启</li>
            <li style="color: red;">页面刷新后，模块中的状态会丢失，需要在模块中开启持久化存储，如：使用 localStorage 或 sessionStorage，或使用 Vuex 提供的持久化插件，如：vuex-persistedstate、vuex-persistedstate-plugin等</li>
          </ul>
        </div>
</template>


<style lang='scss' scoped>
@use  "./v2Note.scss";
</style>