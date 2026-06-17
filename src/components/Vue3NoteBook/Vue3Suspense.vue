<template>
  <div class="tab-content">
    <h2>Suspense 组件</h2>
    
    <h3>定义</h3>
    <p>Suspense 是 Vue 3 提供的内置组件，用于处理异步组件的加载状态，在组件树中等待异步依赖项解析完成后再进行渲染。</p>
    
    <h3>核心特性</h3>
    <ul>
      <li>等待异步组件加载完成</li>
      <li>显示加载状态（fallback）</li>
      <li>支持多个异步依赖</li>
      <li>与 async setup 配合使用</li>
      <li>嵌套使用</li>
    </ul>
    
    <h3>基本用法</h3>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Suspense&gt;
    &lt;!-- 异步组件 --&gt;
    &lt;AsyncComponent /&gt;
    &lt;!-- 加载状态 --&gt;
    &lt;template #fallback&gt;
      &lt;div&gt;加载中...&lt;/div&gt;
    &lt;/template&gt;
  &lt;/Suspense&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { defineAsyncComponent } from 'vue'

// 定义异步组件
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./AsyncComponent.vue'),
  delay: 200, // 延迟显示 fallback
  timeout: 3000 // 超时时间
})
&lt;/script&gt;</code></pre>
    </div>
    
    <h3>详细用法</h3>
    
    <h4>1. 与异步组件配合</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 异步组件定义
// AsyncComponent.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;h3&gt;异步组件内容&lt;/h3&gt;
    &lt;p&gt; <span v-pre>{{ data }}</span> &lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, onMounted } from 'vue'

const data = ref('')

// 模拟异步加载
onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  data.value = '异步加载的数据'
})
&lt;/script&gt;

// 使用 Suspense
&lt;template&gt;
  &lt;Suspense&gt;
    &lt;AsyncComponent /&gt;
    &lt;template #fallback&gt;
      &lt;div class="loading"&gt;
        &lt;div class="spinner"&gt;&lt;/div&gt;
        &lt;p&gt;加载中，请稍候...&lt;/p&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/Suspense&gt;
&lt;/template&gt;</code></pre>
    </div>
    
    <h4>2. 与 async setup 配合</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Suspense&gt;
    &lt;AsyncSetupComponent /&gt;
    &lt;template #fallback&gt;
      &lt;div&gt;加载中...&lt;/div&gt;
    &lt;/template&gt;
  &lt;/Suspense&gt;
&lt;/template&gt;

// AsyncSetupComponent.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;h3&gt;Async Setup 组件&lt;/h3&gt;
    &lt;p&gt;用户数据: <span v-pre>{{ user.name }}</span> &lt;/p&gt;
    &lt;p&gt;文章列表: <span v-pre>{{ posts.length }}</span> 篇&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
// async setup 函数
const user = await fetch('/api/user').then(res => res.json())
const posts = await fetch('/api/posts').then(res => res.json())
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>3. 嵌套使用</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Suspense&gt;
    &lt;div&gt;
      &lt;h2&gt;外层 Suspense&lt;/h2&gt;
      &lt;Suspense&gt;
        &lt;InnerAsyncComponent /&gt;
        &lt;template #fallback&gt;
          &lt;div&gt;加载内部组件...&lt;/div&gt;
        &lt;/template&gt;
      &lt;/Suspense&gt;
    &lt;/div&gt;
    &lt;template #fallback&gt;
      &lt;div&gt;加载外层组件...&lt;/div&gt;
    &lt;/template&gt;
  &lt;/Suspense&gt;
&lt;/template&gt;</code></pre>
    </div>
    
    <h4>4. 与 Transition 配合</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Transition name="fade" mode="out-in"&gt;
    &lt;Suspense&gt;
      &lt;AsyncComponent /&gt;
      &lt;template #fallback&gt;
        &lt;div class="loading"&gt;加载中...&lt;/div&gt;
      &lt;/template&gt;
    &lt;/Suspense&gt;
  &lt;/Transition&gt;
&lt;/template&gt;

&lt;style scoped&gt;
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
&lt;/style&gt;</code></pre>
    </div>
    
    <h3>底层原理</h3>
    <p>Suspense 组件的工作原理：</p>
    <ul>
      <li><strong>依赖收集</strong>：Suspense 会收集其子组件中的异步依赖</li>
      <li><strong>状态管理</strong>：
        <ol>
          <li>初始状态：显示 fallback 内容</li>
          <li>等待状态：等待异步依赖解析</li>
          <li>完成状态：异步依赖解析完成，显示实际内容</li>
        </ol>
      </li>
      <li><strong>异步处理</strong>：
        <ul>
          <li>监听异步组件的加载状态</li>
          <li>监听 async setup 函数的 Promise</li>
          <li>处理多个异步依赖的并行解析</li>
        </ul>
      </li>
      <li><strong>错误处理</strong>：当异步依赖出错时，会向上传播错误，可以使用 errorCaptured 或全局错误处理</li>
    </ul>
    
    <h3>使用场景</h3>
    
    <h4>1. 异步组件加载</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;div class="app"&gt;
    &lt;h1&gt;应用首页&lt;/h1&gt;
    &lt;button @click="showDetail = true"&gt;查看详情&lt;/button&gt;
    
    &lt;Suspense v-if="showDetail"&gt;
      &lt;DetailComponent /&gt;
      &lt;template #fallback&gt;
        &lt;div class="loading"&gt;加载详情中...&lt;/div&gt;
      &lt;/template&gt;
    &lt;/Suspense&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, defineAsyncComponent } from 'vue'

const showDetail = ref(false)
const DetailComponent = defineAsyncComponent(() => import('./DetailComponent.vue'))
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>2. 数据预加载</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Suspense&gt;
    &lt;UserProfile userId="123" /&gt;
    &lt;template #fallback&gt;
      &lt;div class="loading"&gt;
        &lt;div class="spinner"&gt;&lt;/div&gt;
        &lt;p&gt;加载用户资料中...&lt;/p&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/Suspense&gt;
&lt;/template&gt;

// UserProfile.vue
&lt;template&gt;
  &lt;div class="user-profile"&gt;
    &lt;img :src="user.avatar" alt="用户头像" /&gt;
    &lt;h2&gt; <span v-pre>{{ user.name }}</span> &lt;/h2&gt;
    &lt;p&gt; <span v-pre>{{ user.bio }}</span> &lt;/p&gt;
    &lt;h3&gt;最近文章&lt;/h3&gt;
    &lt;ul&gt;
      &lt;li v-for="post in posts" :key="post.id"&gt; 
      <span v-pre>{{ post.title }}</span>
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { defineProps } from 'vue'

const props = defineProps({ userId: String })

// 预加载用户数据和文章数据
const user = await fetch(`/api/users/${props.userId}`).then(res => res.json())
const posts = await fetch(`/api/users/${props.userId}/posts`).then(res => res.json())
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>3. 复杂页面加载</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Suspense&gt;
    &lt;Dashboard /&gt;
    &lt;template #fallback&gt;
      &lt;div class="dashboard-loading"&gt;
        &lt;div class="loading-header"&gt;加载仪表盘&lt;/div&gt;
        &lt;div class="loading-progress"&gt;
          &lt;div class="progress-bar"&gt;&lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/Suspense&gt;
&lt;/template&gt;

// Dashboard.vue
&lt;template&gt;
  &lt;div class="dashboard"&gt;
    &lt;h2&gt;仪表盘&lt;/h2&gt;
    &lt;div class="widgets"&gt;
      &lt;SalesWidget /&gt;
      &lt;UsersWidget /&gt;
      &lt;OrdersWidget /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
// 导入多个异步组件
const SalesWidget = defineAsyncComponent(() => import('./SalesWidget.vue'))
const UsersWidget = defineAsyncComponent(() => import('./UsersWidget.vue'))
const OrdersWidget = defineAsyncComponent(() => import('./OrdersWidget.vue'))
&lt;/script&gt;</code></pre>
    </div>
    
    <h3>错误处理</h3>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;div class="app"&gt;
    &lt;h1&gt;错误处理示例&lt;/h1&gt;
    
    &lt;!-- 方法 1: 使用 errorCaptured --&gt;
    &lt;ErrorBoundary&gt;
      &lt;Suspense&gt;
        &lt;AsyncComponentWithError /&gt;
        &lt;template #fallback&gt;
          &lt;div&gt;加载中...&lt;/div&gt;
        &lt;/template&gt;
      &lt;/Suspense&gt;
    &lt;/ErrorBoundary&gt;
    
    &lt;!-- 方法 2: 使用 onErrorCaptured --&gt;
    &lt;div v-if="error" class="error-message"&gt;
      &lt;p&gt; <span v-pre>{{ error }}</span> &lt;/p&gt;
      &lt;button @click="resetError"&gt;重试&lt;/button&gt;
    &lt;/div&gt;
    &lt;Suspense v-else&gt;
      &lt;AsyncComponentWithError /&gt;
      &lt;template #fallback&gt;
        &lt;div&gt;加载中...&lt;/div&gt;
      &lt;/template&gt;
    &lt;/Suspense&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, onErrorCaptured, defineAsyncComponent } from 'vue'

const error = ref(null)
const AsyncComponentWithError = defineAsyncComponent(() => import('./AsyncComponentWithError.vue'))

// 错误捕获
onErrorCaptured((err) => {
  error.value = err.message
  return true // 阻止错误继续传播
})

function resetError() {
  error.value = null
}
&lt;/script&gt;

// ErrorBoundary.vue
&lt;template&gt;
  &lt;div v-if="error" class="error-boundary"&gt;
    &lt;h3&gt;发生错误&lt;/h3&gt;
    &lt;p&gt; <span v-pre>{{ error.message }}</span> &lt;/p&gt;
    &lt;button @click="reset"&gt;重试&lt;/button&gt;
  &lt;/div&gt;
  &lt;slot v-else&gt;&lt;/slot&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)

onErrorCaptured((err) => {
  error.value = err
  return true
})

function reset() {
  error.value = null
}
&lt;/script&gt;</code></pre>
    </div>
    
    <h3>常见错误</h3>
    <ul>
      <li><strong>异步组件未正确定义</strong>：忘记使用 defineAsyncComponent 包装组件</li>
      <li><strong>缺少 fallback 模板</strong>：Suspense 需要 fallback 模板来显示加载状态</li>
      <li><strong>错误处理不当</strong>：没有捕获异步操作中的错误</li>
      <li><strong>过度使用 Suspense</strong>：在不需要的地方使用 Suspense，增加不必要的复杂性</li>
      <li><strong>嵌套 Suspense 层级过深</strong>：可能导致性能问题和难以追踪的错误</li>
      <li><strong>与某些第三方库不兼容</strong>：某些库可能不支持在 Suspense 中使用</li>
    </ul>
    
    <h3>注意事项</h3>
    <ul>
      <li><strong>fallback 模板是必需的</strong>：Suspense 必须有一个 fallback 模板来显示加载状态</li>
      <li><strong>只支持异步依赖</strong>：Suspense 只对异步组件和 async setup 有效</li>
      <li><strong>错误处理</strong>：Suspense 本身不处理错误，需要额外的错误边界</li>
      <li><strong>性能考虑</strong>：频繁使用 Suspense 可能会影响性能，特别是在嵌套使用时</li>
      <li><strong>服务器端渲染</strong>：在 SSR 环境中，Suspense 的行为可能与客户端不同</li>
      <li><strong>与其他组件的配合</strong>：Suspense 可以与 Transition、KeepAlive 等组件配合使用，但需要注意顺序</li>
    </ul>
    
    <h3>最佳实践</h3>
    <ul>
      <li><strong>合理使用</strong>：只在需要等待异步依赖的场景中使用 Suspense</li>
      <li><strong>提供有意义的 fallback</strong>：fallback 应该提供清晰的加载状态，提升用户体验</li>
      <li><strong>错误处理</strong>：总是为 Suspense 添加错误处理机制</li>
      <li><strong>优化加载时间</strong>：
        <ul>
          <li>使用 defineAsyncComponent 的 delay 选项避免闪烁</li>
          <li>合理设置 timeout 选项</li>
          <li>考虑使用预加载技术</li>
        </ul>
      </li>
      <li><strong>避免过度嵌套</strong>：尽量减少 Suspense 的嵌套层级</li>
      <li><strong>与过渡效果配合</strong>：使用 Transition 组件为 Suspense 添加平滑的过渡效果</li>
    </ul>
    
    <h3>性能优化建议</h3>
    <ul>
      <li><strong>合理使用延迟加载</strong>：只在需要时加载组件，避免不必要的网络请求</li>
      <li><strong>优化 fallback 显示</strong>：fallback 应该轻量，避免复杂的渲染</li>
      <li><strong>并行加载</strong>：利用 async setup 中的 Promise.all 并行加载多个资源</li>
      <li><strong>缓存策略</strong>：对频繁使用的异步组件或数据进行缓存</li>
      <li><strong>避免不必要的 Suspense</strong>：如果组件加载很快，可能不需要使用 Suspense</li>
      <li><strong>监控加载性能</strong>：使用性能分析工具监控 Suspense 的加载性能</li>
    </ul>
    
    <h3>与其他组件的配合</h3>
    
    <h4>1. 与 Transition 配合</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Transition name="fade" mode="out-in"&gt;
    &lt;Suspense&gt;
      &lt;AsyncComponent /&gt;
      &lt;template #fallback&gt;
        &lt;div class="loading"&gt;加载中...&lt;/div&gt;
      &lt;/template&gt;
    &lt;/Suspense&gt;
  &lt;/Transition&gt;
&lt;/template&gt;</code></pre>
    </div>
    
    <h4>2. 与 KeepAlive 配合</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;KeepAlive&gt;
    &lt;Suspense&gt;
      &lt;component :is="currentComponent" /&gt;
      &lt;template #fallback&gt;
        &lt;div&gt;加载中...&lt;/div&gt;
      &lt;/template&gt;
    &lt;/Suspense&gt;
  &lt;/KeepAlive&gt;
&lt;/template&gt;</code></pre>
    </div>
    
    <h4>3. 与 Teleport 配合</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Teleport to="body"&gt;
    &lt;Suspense&gt;
      &lt;ModalComponent /&gt;
      &lt;template #fallback&gt;
        &lt;div class="modal-loading"&gt;加载中...&lt;/div&gt;
      &lt;/template&gt;
    &lt;/Suspense&gt;
  &lt;/Teleport&gt;
&lt;/template&gt;</code></pre>
    </div>
    
    <h3>总结</h3>
    <p>Suspense 组件是 Vue 3 中一个强大的工具，用于处理异步组件的加载状态。它通过提供一个统一的方式来等待异步依赖解析，大大简化了异步操作的处理逻辑。</p>
    <p>正确使用 Suspense 可以：</p>
    <ul>
      <li>提供更好的用户体验，通过显示加载状态减少用户等待的焦虑</li>
      <li>简化异步组件的代码结构，避免手动管理加载状态</li>
      <li>与其他 Vue 特性（如 async setup、Transition 等）无缝集成</li>
      <li>提高应用的可维护性和可读性</li>
    </ul>
    <p>然而，在使用 Suspense 时也需要注意：</p>
    <ul>
      <li>合理使用，避免过度使用导致性能问题</li>
      <li>正确处理错误，确保应用的稳定性</li>
      <li>优化加载状态，提升用户体验</li>
      <li>考虑服务器端渲染的兼容性</li>
    </ul>
    <p>通过掌握 Suspense 的使用方法和最佳实践，开发者可以构建更加流畅、响应迅速的 Vue 应用。</p>
  </div>
</template>

<style lang="scss" scoped>
@use "./v3Note.scss";


.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  background: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}

.error-boundary {
  background: #ffebee;
  color: #d32f2f;
  padding: 20px;
  border-radius: 4px;
  margin: 10px 0;
}

.dashboard-loading {
  padding: 40px;
  text-align: center;
}

.loading-progress {
  width: 200px;
  height: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  margin: 20px auto;
}

.progress-bar {
  width: 100%;
  height: 100%;
  background: #4CAF50;
  animation: progress 2s ease-in-out infinite;
}

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>