<template>
    <div class="tab-content">
          <h2>Setup 语法糖</h2>
          
          <h3>定义</h3>
          <p>Setup 语法糖是 Vue 3.2 引入的新特性，通过 &lt;script setup&gt; 标签语法，允许在脚本中直接编写组合式 API 代码，无需手动返回变量和函数给模板。</p>
          
          <h3>核心特性</h3>
          <ul>
            <li>自动暴露变量和函数给模板，无需 return</li>
            <li>导入的组件自动注册，无需在 components 选项中声明</li>
            <li>支持 defineProps、defineEmits、defineExpose 等编译宏</li>
            <li>支持顶层 await</li>
            <li>与普通 &lt;script&gt; 标签共存</li>
          </ul>
          
          <h3>语法示例</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { ref, computed } from 'vue'
import ChildComponent from './ChildComponent.vue'

// 响应式数据
const count = ref(0)

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
function increment() {
  count.value++
}

// 组件自动注册，可直接在模板中使用
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;Count: <span v-pre>{{ count }}</span> &lt;/p&gt;
    &lt;p&gt;Double Count: <span v-pre>{{ doubleCount }}</span> &lt;/p&gt;
    &lt;button @click="increment"&gt;Increment&lt;/button&gt;
    &lt;ChildComponent /&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
          </div>
          
          <h3>与标准组合式 API 对比</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">&lt;script&gt;
import { ref, computed } from 'vue'
import ChildComponent from './ChildComponent.vue'

export default {
  components: {
    ChildComponent
  },
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    function increment() {
      count.value++
    }
    
    // 必须手动返回才能在模板中使用
    return {
      count,
      doubleCount,
      increment
    }
  }
}
&lt;/script&gt;</code></pre>
          </div>
          
          <h3>Props 和 Emits 的使用</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { defineProps, defineEmits } from 'vue'

// 定义 props
const props = defineProps({
  msg: String,
  count: {
    type: Number,
    default: 0
  }
})

// 定义 emits
const emit = defineEmits(['update:count', 'reset'])

function increment() {
  emit('update:count', props.count + 1)
}

function reset() {
  emit('reset')
}
&lt;/script&gt;</code></pre>
          </div>
          
          <h3>使用 withDefaults 为 Props 设置默认值</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(defineProps({
  msg: String,
  items: Array,
  user: Object
}), {
  msg: 'Hello',
  items: () => [],
  user: () => ({ name: 'Guest' })
})
&lt;/script&gt;</code></pre>
          </div>
          
          <h3>使用 defineExpose 暴露方法给父组件</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { ref, defineExpose } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

// 暴露给父组件的属性和方法
defineExpose({
  count,
  increment
})
&lt;/script&gt;</code></pre>
          </div>
          
          <h3>支持顶层 await</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { ref } from 'vue'

// 顶层 await，组件会在异步操作完成后渲染
const data = await fetch('/api/data').then(res => res.json())
const count = ref(0)
&lt;/script&gt;</code></pre>
          </div>
          
          <h3>底层原理</h3>
          <p>&lt;script setup&gt; 会在编译时被处理，自动生成 setup 函数和组件注册代码。具体来说：</p>
          <ul>
            <li>所有顶级变量和函数会自动暴露给模板</li>
            <li>导入的组件会自动注册到 components 选项中</li>
            <li>编译宏如 defineProps、defineEmits 会被转换为相应的运行时代码</li>
            <li>顶层 await 会被转换为 async setup 函数</li>
          </ul>
          
          <h3>使用场景</h3>
          <ul>
            <li>大多数使用组合式 API 的组件</li>
            <li>需要简化代码结构的场景</li>
            <li>快速开发的项目</li>
            <li>需要更好的类型推断的场景</li>
          </ul>
          
          <h3>常见错误</h3>
          <ul>
            <li>忘记导入需要的 API（如 ref、computed 等）</li>
            <li>在 &lt;script setup&gt; 中使用 export default</li>
            <li>混淆 ref 和 reactive 的使用方式</li>
            <li>忘记使用 .value 访问 ref 的值</li>
            <li>在 defineProps 中使用响应式数据</li>
          </ul>
          
          <h3>注意事项</h3>
          <ul>
            <li>&lt;script setup&gt; 中定义的变量和函数会自动暴露给模板</li>
            <li>导入的组件会自动注册，无需在 components 选项中声明</li>
            <li>可以与普通 &lt;script&gt; 标签共存，普通脚本中的内容会被视为组件选项</li>
            <li>编译宏如 defineProps、defineEmits 只能在 &lt;script setup&gt; 中使用</li>
            <li>顶层 await 会使组件变为异步组件</li>
          </ul>
          
          <h3>性能优势</h3>
          <ul>
            <li>编译时优化，减少运行时开销</li>
            <li>更高效的组件注册方式</li>
            <li>更好的树摇优化</li>
            <li>减少模板代码，提高渲染性能</li>
          </ul>
          
          <h3>最佳实践</h3>
          <ul>
            <li>优先使用 &lt;script setup&gt; 编写组合式 API 组件</li>
            <li>合理使用 defineProps 和 defineEmits 类型定义</li>
            <li>对于复杂组件，考虑使用 withDefaults 简化默认值设置</li>
            <li>仅在需要时使用 defineExpose 暴露内部状态</li>
            <li>利用顶层 await 处理初始化数据获取</li>
          </ul>
        </div>
</template>

<style lang='scss' scoped>
@use './v3Note.scss'
</style>