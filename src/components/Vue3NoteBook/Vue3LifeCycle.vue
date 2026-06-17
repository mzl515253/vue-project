<template>
 <div class="tab-content">
          <h2>生命周期钩子</h2>
          
          <h3>定义</h3>
          <p>Vue 3 提供了新的生命周期钩子 API，采用函数式写法，与组合式 API 配合使用，取代了 Vue 2 中的选项式生命周期钩子。</p>
          
          <h3>核心生命周期钩子</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  onDeactivated
} from 'vue'

// 挂载阶段
onBeforeMount(() => {
  console.log('组件挂载前')
})

onMounted(() => {
  console.log('组件挂载完成')
})

// 更新阶段
onBeforeUpdate(() => {
  console.log('组件更新前')
})

onUpdated(() => {
  console.log('组件更新完成')
})

// 卸载阶段
onBeforeUnmount(() => {
  console.log('组件卸载前')
})

onUnmounted(() => {
  console.log('组件卸载完成')
})

// 错误捕获
onErrorCaptured((error, instance, info) => {
  console.log('捕获到错误:', error)
  console.log('错误来源:', instance)
  console.log('错误信息:', info)
})

// 调试钩子
onRenderTracked((event) => {
  console.log('渲染追踪:', event)
})

onRenderTriggered((event) => {
  console.log('渲染触发:', event)
})

//  KeepAlive 相关
onActivated(() => {
  console.log('组件被激活')
})

onDeactivated(() => {
  console.log('组件被停用时')
})
&lt;/script&gt;</code></pre>
          </div>
          
          <h3>Vue 2 与 Vue 3 生命周期对比</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">// Vue 2 选项式 API
{
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {}
}

// Vue 3 组合式 API
import {
  // setup() 替代 beforeCreate 和 created
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount, // 替代 beforeDestroy
  onUnmounted,     // 替代 destroyed
  onErrorCaptured,
  // 新增
  onRenderTracked,
  onRenderTriggered,
  onActivated,      // KeepAlive 相关
  onDeactivated     // KeepAlive 相关
} from 'vue'</code></pre>
          </div>
          
          <h3>生命周期执行顺序</h3>
          <ol>
            <li><strong>setup()</strong> - 组件初始化（替代 beforeCreate 和 created）</li>
            <li><strong>onBeforeMount()</strong> - 组件挂载前</li>
            <li><strong>onMounted()</strong> - 组件挂载完成</li>
            <li><strong>onBeforeUpdate()</strong> - 组件更新前</li>
            <li><strong>onUpdated()</strong> - 组件更新完成</li>
            <li><strong>onBeforeUnmount()</strong> - 组件卸载前</li>
            <li><strong>onUnmounted()</strong> - 组件卸载完成</li>
          </ol>
          
          <h3>详细使用场景</h3>
          
          <h4>onMounted - 组件挂载完成</h4>
          <ul>
            <li>初始化第三方库</li>
            <li>获取 DOM 元素引用</li>
            <li>执行需要 DOM 的操作</li>
            <li>启动定时器或事件监听器</li>
          </ul>
          
          <h4>onUnmounted - 组件卸载完成</h4>
          <ul>
            <li>清理定时器</li>
            <li>移除事件监听器</li>
            <li>释放第三方库资源</li>
            <li>取消网络请求</li>
          </ul>
          
          <h4>onBeforeUpdate / onUpdated - 组件更新</h4>
          <ul>
            <li>在更新前后执行 DOM 相关操作</li>
            <li>比较更新前后的 DOM 状态</li>
            <li>执行需要在更新后进行的操作</li>
          </ul>
          
          <h4>onErrorCaptured - 错误捕获</h4>
          <ul>
            <li>捕获组件树中的错误</li>
            <li>记录错误信息</li>
            <li>防止错误导致整个应用崩溃</li>
            <li>显示错误提示</li>
          </ul>
          
          <h4>onActivated / onDeactivated - KeepAlive 相关</h4>
          <ul>
            <li>在组件被激活时执行操作</li>
            <li>在组件被停用时执行清理</li>
            <li>处理 KeepAlive 组件的状态管理</li>
          </ul>
          
          <h3>底层原理</h3>
          <p>Vue 3 的生命周期钩子基于组合式 API 设计，通过函数调用的方式注册回调。当组件进入对应阶段时，Vue 会执行相应的回调函数。与 Vue 2 相比，主要区别在于：</p>
          <ul>
            <li>使用函数式 API 而非选项式</li>
            <li>setup() 函数替代了 beforeCreate 和 created</li>
            <li>新增了调试和 KeepAlive 相关的钩子</li>
            <li>钩子函数的执行时机与 Vue 2 基本一致</li>
          </ul>
          
          <h3>使用示例</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { ref, onMounted, onUnmounted } from 'vue'

const count = ref(0)
let timer = null

onMounted(() => {
  // 启动定时器
  timer = setInterval(() => {
    count.value++
  }, 1000)
  
  // 初始化第三方库
  console.log('初始化第三方库')
})

onUnmounted(() => {
  // 清理定时器
  if (timer) {
    clearInterval(timer)
  }
  
  // 清理其他资源
  console.log('清理资源')
})
&lt;/script&gt;</code></pre>
          </div>
          
          <h3>常见错误</h3>
          <ul>
            <li>忘记在 onUnmounted 中清理定时器和事件监听器，导致内存泄漏</li>
            <li>在生命周期钩子中修改响应式数据导致无限更新循环</li>
            <li>使用错误的生命周期钩子，如在 onMounted 前访问 DOM</li>
            <li>在 setup() 中执行需要 DOM 的操作</li>
            <li>忽略错误捕获，导致组件树错误影响整个应用</li>
          </ul>
          
          <h3>注意事项</h3>
          <ul>
            <li>setup() 函数执行时，组件实例还未创建，所以没有 beforeCreate 和 created 钩子</li>
            <li>所有生命周期钩子都接收一个回调函数作为参数</li>
            <li>在 onUnmounted 中一定要清理定时器、事件监听器和其他资源</li>
            <li>onErrorCaptured 钩子可以返回 false 来阻止错误继续传播</li>
            <li>调试钩子（onRenderTracked、onRenderTriggered）只在开发环境生效</li>
            <li>onActivated 和 onDeactivated 只在使用 KeepAlive 包裹的组件中生效</li>
          </ul>
          
          <h3>最佳实践</h3>
          <ul>
            <li>使用 onMounted 初始化需要 DOM 的操作和第三方库</li>
            <li>使用 onUnmounted 清理所有资源，防止内存泄漏</li>
            <li>使用 onErrorCaptured 进行错误处理，提高应用稳定性</li>
            <li>合理使用 KeepAlive 相关钩子管理组件状态</li>
            <li>避免在生命周期钩子中执行耗时操作，影响性能</li>
            <li>利用生命周期钩子的执行顺序，合理安排代码逻辑</li>
          </ul>
        </div>

</template>

<style lang="scss" scoped>
@use "./v3Note.scss";
</style>