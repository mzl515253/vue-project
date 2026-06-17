<template>
  <div class="tab-content">
    <h2>Teleport 组件</h2>
    
    <h3>定义</h3>
    <p>Teleport 是 Vue 3 提供的内置组件，用于将组件的内容渲染到 DOM 树中的指定位置，而不是当前组件的 DOM 层次结构中。</p>
    
    <h3>核心特性</h3>
    <ul>
      <li>将组件内容渲染到指定的 DOM 元素中</li>
      <li>保持组件的逻辑和上下文不变</li>
      <li>支持动态目标位置</li>
      <li>可以在多个 teleport 之间共享同一个目标</li>
      <li>保持组件的响应式和事件系统</li>
    </ul>
    
    <h3>基本用法</h3>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;div class="component"&gt;
    &lt;h2&gt;组件内容&lt;/h2&gt;
    &lt;!-- 将内容传送到 body 标签下 --&gt;
    &lt;Teleport to="body"&gt;
      &lt;div class="modal"&gt;
        &lt;p&gt;这是一个模态框&lt;/p&gt;
        &lt;button @click="closeModal"&gt;关闭&lt;/button&gt;
      &lt;/div&gt;
    &lt;/Teleport&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const showModal = ref(true)

function closeModal() {
  showModal.value = false
}
&lt;/script&gt;

&lt;style scoped&gt;
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
&lt;/style&gt;</code></pre>
    </div>
    
    <h3>详细用法</h3>
    
    <h4>1. 指定目标元素</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 通过选择器指定目标
&lt;Teleport to="#app"&gt;
  &lt;div&gt;内容&lt;/div&gt;
&lt;/Teleport&gt;

// 通过 ref 指定目标
&lt;template&gt;
  &lt;div ref="target"&gt;&lt;/div&gt;
  &lt;Teleport :to="target"&gt;
    &lt;div&gt;内容&lt;/div&gt;
  &lt;/Teleport&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
const target = ref(null)
&lt;/script&gt;

// 通过 DOM 元素指定目标
&lt;script setup&gt;
import { ref, onMounted } from 'vue'
const target = ref(null)

onMounted(() => {
  target.value = document.getElementById('some-element')
})
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>2. 条件渲染</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Teleport to="body" :disabled="!showModal"&gt;
    &lt;div class="modal" v-if="showModal"&gt;
      &lt;p&gt;这是一个条件渲染的模态框&lt;/p&gt;
      &lt;button @click="showModal = false"&gt;关闭&lt;/button&gt;
    &lt;/div&gt;
  &lt;/Teleport&gt;
  &lt;button @click="showModal = true"&gt;打开模态框&lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
const showModal = ref(false)
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>3. 多个 Teleport 共享目标</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 多个 Teleport 可以渲染到同一个目标
&lt;template&gt;
  &lt;Teleport to="#notifications"&gt;
    &lt;div class="notification"&gt;通知 1&lt;/div&gt;
  &lt;/Teleport&gt;
  &lt;Teleport to="#notifications"&gt;
    &lt;div class="notification"&gt;通知 2&lt;/div&gt;
  &lt;/Teleport&gt;
&lt;/template&gt;

// 目标元素
&lt;div id="notifications"&gt;&lt;/div&gt;</code></pre>
    </div>
    
    <h4>4. 动态目标</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Teleport :to="targetElement"&gt;
    &lt;div&gt;动态目标内容&lt;/div&gt;
  &lt;/Teleport&gt;
  &lt;button @click="toggleTarget"&gt;切换目标&lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const targetElement = ref('body')

function toggleTarget() {
  targetElement.value = targetElement.value === 'body' ? '#app' : 'body'
}
&lt;/script&gt;</code></pre>
    </div>
    
    <h3>底层原理</h3>
    <p>Teleport 组件的工作原理：</p>
    <ul>
      <li><strong>编译时处理</strong>：Vue 编译器会识别 Teleport 组件，并在编译阶段进行特殊处理</li>
      <li><strong>运行时渲染</strong>：
        <ol>
          <li>Teleport 组件会创建一个虚拟节点树</li>
          <li>找到指定的目标 DOM 元素</li>
          <li>将虚拟节点渲染到目标元素中</li>
          <li>保持组件的逻辑和上下文不变</li>
        </ol>
      </li>
      <li><strong>响应式更新</strong>：当 Teleport 的内容或目标发生变化时，Vue 会自动更新渲染</li>
      <li><strong>事件冒泡</strong>：事件会按照原始的组件层次结构冒泡，而不是 DOM 层次结构</li>
    </ul>
    
    <h3>使用场景</h3>
    
    <h4>1. 模态框</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Teleport to="body"&gt;
    &lt;div class="modal-overlay" v-if="showModal"&gt;
      &lt;div class="modal"&gt;
        &lt;h3&gt; <span v-pre>{{ title }}</span>&lt;/h3&gt;
        &lt;div class="modal-content"&gt;
          &lt;slot&gt;&lt;/slot&gt;
        &lt;/div&gt;
        &lt;div class="modal-actions"&gt;
          &lt;button @click="$emit('close')"&gt;关闭&lt;/button&gt;
          &lt;button @click="$emit('confirm')"&gt;确认&lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/Teleport&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  showModal: Boolean,
  title: String
})

const emit = defineEmits(['close', 'confirm'])
&lt;/script&gt;

&lt;style scoped&gt;
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
}
&lt;/style&gt;</code></pre>
    </div>
    
    <h4>2. 通知/提示</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Teleport to="#notifications"&gt;
    &lt;div class="notification" :class="type" v-for="notification in notifications" :key="notification.id"&gt;
      <span v-pre>{{ notification.message }}</span>
      &lt;button @click="removeNotification(notification.id)"&gt;×&lt;/button&gt;
    &lt;/div&gt;
  &lt;/Teleport&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const notifications = ref([])
let id = 0

function addNotification(message, type = 'info') {
  notifications.value.push({ id: id++, message, type })
  
  // 3秒后自动移除
  setTimeout(() => {
    removeNotification(id - 1)
  }, 3000)
}

function removeNotification(id) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

// 暴露方法给父组件
defineExpose({
  addNotification
})
&lt;/script&gt;

&lt;style scoped&gt;
.notification {
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideIn 0.3s ease;
}

.notification.info {
  background: #e3f2fd;
  color: #1976d2;
}

.notification.success {
  background: #e8f5e8;
  color: #388e3c;
}

.notification.error {
  background: #ffebee;
  color: #d32f2f;
}

@keyframes slideIn {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
&lt;/style&gt;</code></pre>
    </div>
    
    <h4>3. 全局导航栏</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Teleport to="#navbar"&gt;
    &lt;nav class="navbar"&gt;
      &lt;div class="logo"&gt; <span v-pre>{{ appName }}</span> &lt;/div&gt;
      &lt;div class="nav-links"&gt;
        &lt;a v-for="link in links" :key="link.path" :href="link.path"&gt;
            <span v-pre>{{ link.name }}</span>
        &lt;/a&gt;
      &lt;/div&gt;
      &lt;div class="user" v-if="user"&gt;
        <span v-pre>{{ user.name }}</span>
      &lt;/div&gt;
    &lt;/nav&gt;
  &lt;/Teleport&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const appName = ref('My App')
const links = ref([
  { name: '首页', path: '/' },
  { name: '关于', path: '/about' },
  { name: '联系我们', path: '/contact' }
])
const user = ref({ name: '张三' })
&lt;/script&gt;

&lt;style scoped&gt;
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background: #333;
  color: white;
}

.nav-links a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}
&lt;/style&gt;</code></pre>
    </div>
    
    <h3>与其他功能的配合</h3>
    
    <h4>1. 与 Transition 配合使用</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Teleport to="body"&gt;
    &lt;Transition name="fade"&gt;
      &lt;div class="modal" v-if="showModal"&gt;
        &lt;p&gt;带过渡效果的模态框&lt;/p&gt;
        &lt;button @click="showModal = false"&gt;关闭&lt;/button&gt;
      &lt;/div&gt;
    &lt;/Transition&gt;
  &lt;/Teleport&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
const showModal = ref(false)
&lt;/script&gt;

&lt;style scoped&gt;
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
&lt;/style&gt;</code></pre>
    </div>
    
    <h4>2. 与 KeepAlive 配合使用</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;template&gt;
  &lt;Teleport to="body"&gt;
    &lt;KeepAlive&gt;
      &lt;Modal v-if="showModal" @close="showModal = false" /&gt;
    &lt;/KeepAlive&gt;
  &lt;/Teleport&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import Modal from './Modal.vue'

const showModal = ref(false)
&lt;/script&gt;</code></pre>
    </div>
    
    <h3>常见错误</h3>
    <ul>
      <li><strong>目标元素不存在</strong>：如果指定的目标元素不存在，Teleport 会静默失败</li>
      <li><strong>目标元素选择器错误</strong>：使用了错误的 CSS 选择器或 ref 引用</li>
      <li><strong>动态目标未更新</strong>：当目标元素变化时，需要确保 Teleport 能够正确响应</li>
      <li><strong>事件处理问题</strong>：误以为事件会按照 DOM 层次结构冒泡，而不是组件层次结构</li>
      <li><strong>CSS 样式问题</strong>：Teleport 内容的样式可能受到目标元素的影响</li>
    </ul>
    
    <h3>注意事项</h3>
    <ul>
      <li><strong>目标元素必须存在</strong>：在 Teleport 渲染之前，目标元素必须已经存在于 DOM 中</li>
      <li><strong>保持组件上下文</strong>：Teleport 只是改变了内容的渲染位置，组件的逻辑和上下文保持不变</li>
      <li><strong>事件冒泡</strong>：事件会按照原始的组件层次结构冒泡，而不是 DOM 层次结构</li>
      <li><strong>CSS 作用域</strong>：如果使用 scoped CSS，Teleport 内容的样式会受到影响，可能需要使用深度选择器或全局样式</li>
      <li><strong>性能考虑</strong>：频繁使用 Teleport 可能会影响性能，特别是当目标元素距离原始位置较远时</li>
      <li><strong>服务器端渲染</strong>：在 SSR 环境中，Teleport 的行为可能与客户端不同，需要注意处理</li>
    </ul>
    
    <h3>最佳实践</h3>
    <ul>
      <li><strong>明确目标元素</strong>：使用 ID 选择器或 ref 确保目标元素的唯一性</li>
      <li><strong>合理使用</strong>：只在需要将内容渲染到特定位置时使用 Teleport</li>
      <li><strong>配合过渡效果</strong>：与 Transition 组件配合使用，提供更好的用户体验</li>
      <li><strong>考虑样式隔离</strong>：使用 CSS 变量或全局样式确保 Teleport 内容的样式一致性</li>
      <li><strong>错误处理</strong>：添加目标元素存在性检查，避免静默失败</li>
      <li><strong>性能优化</strong>：避免在 Teleport 中放置过多或过于复杂的内容</li>
    </ul>
    
    <h3>性能优化建议</h3>
    <ul>
      <li><strong>减少 Teleport 的使用</strong>：只在必要时使用 Teleport</li>
      <li><strong>避免频繁更新</strong>：如果 Teleport 内容频繁变化，考虑使用虚拟滚动或其他优化技术</li>
      <li><strong>合理选择目标位置</strong>：目标元素应该尽可能靠近原始位置，减少 DOM 操作的开销</li>
      <li><strong>使用 v-if 控制渲染</strong>：当不需要显示 Teleport 内容时，使用 v-if 完全移除它</li>
      <li><strong>避免嵌套 Teleport</strong>：嵌套 Teleport 可能会导致复杂的渲染逻辑和性能问题</li>
    </ul>
    
    <h3>总结</h3>
    <p>Teleport 组件是 Vue 3 中一个非常强大的功能，它允许开发者将组件内容渲染到 DOM 树中的任意位置，同时保持组件的逻辑和上下文不变。这使得它非常适合用于创建模态框、通知、全局导航栏等需要脱离当前组件层次结构的 UI 元素。</p>
    <p>正确使用 Teleport 可以大大简化组件的结构和样式管理，提高代码的可维护性和用户体验。但需要注意目标元素的存在性、事件冒泡的行为以及性能考虑，以确保 Teleport 的使用是高效和可靠的。</p>
  </div>
</template>

<style lang="scss" scoped>
@use "./v3Note.scss";

</style>