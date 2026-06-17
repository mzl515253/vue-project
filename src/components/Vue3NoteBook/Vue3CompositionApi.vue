<template>
  <div class="tab-content">
    <h2>Composition API 详细指南</h2>
    
    <!-- 1. 基本介绍 -->
    <section class="section">
      <h3>什么是 Composition API？</h3>
      <p>Composition API 是 Vue 3 引入的新的 API 风格，允许开发者按功能组织代码，而不是按选项类型。它提供了一种更灵活的方式来组织组件逻辑，使代码更加可维护和可复用。</p>
      
      <h3>为什么需要 Composition API？</h3>
      <ul>
        <li><strong>逻辑组织：</strong>按功能组织代码，而不是按选项类型（data、methods、computed 等）</li>
        <li><strong>逻辑复用：</strong>通过组合函数（Composables）实现跨组件的逻辑复用</li>
        <li><strong>TypeScript 支持：</strong>更好的类型推断和类型检查</li>
        <li><strong>代码压缩：</strong>变量名可以被压缩，减小 bundle 体积</li>
        <li><strong>灵活性：</strong>可以根据需要组织代码结构</li>
      </ul>
    </section>
   <h3>Options API（Vue2 的 API 风格——选项式API或配置式API）</h3>
    <div class="code-block">
        <pre><code v-prism="'typescript'">
          export default {
            data() {
              return {
                count: 0
              }
            },
            methods: {
              increment() {
                this.count++
              }
            },
            computed: {
              doubleCount() {
                return this.count * 2
              }
            },
            watch: {
              count(newVal, oldVal) {
                console.log(`count 从 ${oldVal} 变为 ${newVal}`)
              }
            },
            created() {
              console.log('组件创建完成')
            },

            mounted() {
              console.log('组件挂载完成')
            },
            directives: {
              focus: {
                mounted(el) {
                  el.focus()
                }
              }
            },
            filters: {
              reverse(str) {
                return str.split('').reverse().join('')
              }
            },
            mixins: [Mixin1, Mixin2],
            components: {
              Vue3CompositionApi
            }
          }
        </code></pre>
      </div>
    <!-- 2. 核心 API -->
    <section class="section">
      <h3>核心 Composition API</h3>
      
      <h4>响应式 API</h4>
      <div class="code-block">
        <pre><code   v-prism="'typescript'">import { ref, reactive, computed, readonly, watch, watchEffect } from 'vue'

// ref: 创建响应式引用
const count = ref(0)
console.log(count.value) // 访问值
count.value = 1 // 修改值

// reactive: 创建响应式对象
const state = reactive({
  name: 'Vue 3',
  version: 3.3
})

// computed: 计算属性
const doubleCount = computed(() => count.value * 2)

// readonly: 创建只读响应式对象
const readOnlyState = readonly(state)

// watch: 监听响应式数据变化
watch(count, (newValue, oldValue) => {
  console.log(`count 从 ${oldValue} 变为 ${newValue}`)
})

// watchEffect: 自动追踪依赖的副作用
watchEffect(() => {
  console.log(`当前 count 值: ${count.value}`)
})</code></pre>
      </div>

      <h4>生命周期钩子</h4>
      <div class="code-block">
        <pre><code  v-prism="'typescript'">import { 
  onMounted, onUpdated, onUnmounted, 
  onBeforeMount, onBeforeUpdate, onBeforeUnmount
} from 'vue'

setup() {
  onMounted(() => {
    console.log('组件挂载完成')
  })
  
  onUpdated(() => {
    console.log('组件更新完成')
  })
  
  onUnmounted(() => {
    console.log('组件卸载完成')
  })
  
  // 其他生命周期钩子...
}</code></pre>
      </div>
      <h4 style="color: red;">注意：</h4>
      <p>在 Composition API 中，生命周期钩子的执行顺序与 Options API 不同。在 Composition API 中，生命周期钩子的执行顺序是：</p>
      <ol>
        <li>onBeforeMount</li>
        <li>onMounted</li>
        <li>onBeforeUpdate</li>
        <li>onUpdated</li>  
        <li>onBeforeUnmount</li>
        <li>onUnmounted</li>
      </ol>
      <ul>
        <li>
          setup 函数：在组件挂载前调用，用于初始化响应式数据和方法, 返回一个对象，对象中的属性可以在模板中使用。优先级高于Vue2的beforeCreate生命周期。
        </li>
        <li>
          Vue2里面可以访问到this，但是Composition API里面不能访问到this。
        </li>
        <li>
           Vue2里面可以访问到Vue3的响应式数据和方法, 但是Composition API里面不能访问到this。也访问不到Vue2的响应式数据和方法。
        </li>
        </ul>

      <h4>依赖注入</h4>
      <div class="code-block">
        <pre><code  v-prism="'typescript'">import { provide, inject } from 'vue'

// 父组件提供数据
const ParentComponent = {
  setup() {
    const theme = ref('dark')
    provide('theme', theme)
    return {}
  }
}

// 子组件注入数据
const ChildComponent = {
  setup() {
    const theme = inject('theme', 'light') // 第二个参数是默认值
    return { theme }
  }
}</code></pre>
      </div>
    </section>

    <!-- 3. 两种使用方式 -->
    <section class="section">
      <h3>使用方式</h3>
      
      <h4>方式一：&lt;script setup&gt;（推荐）</h4>
      <div class="code-block">
        <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const count = ref(0)

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 生命周期钩子
onMounted(() => {
  console.log('组件挂载完成')
})

// 方法
function increment() {
  count.value++
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;Count: {{ count }}&lt;/p&gt;
    &lt;p&gt;Double: {{ doubleCount }}&lt;/p&gt;
    &lt;button @click="increment"&gt;Increment&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
      </div>

      <h4>方式二：标准 setup 函数</h4>
      <div class="code-block">
        <pre><code  v-prism="'typescript'">&lt;script&gt;
import { ref, computed, onMounted } from 'vue'

export default {
  setup(props, { emit, slots, attrs }) {
    // 响应式数据
    const count = ref(0)
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 生命周期钩子
    onMounted(() => {
      console.log('组件挂载完成')
    })
    
    // 方法
    function increment() {
      count.value++
      emit('increment', count.value)
    }
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}
&lt;/script&gt;</code></pre>
      </div>
    </section>

    <!-- 4. setup 函数参数 -->
    <section class="section">
      <h3>setup 函数参数</h3>
      <div class="code-block">
        <pre><code  v-prism="'typescript'">setup(props, context) {
  // props: 组件接收的属性（响应式）
  console.log(props.title)
  
  // context: 包含三个属性
  const { emit, slots, attrs } = context
  
  // emit: 触发自定义事件
  function handleClick() {
    emit('click', 'Hello')
  }
  
  // slots: 插槽内容
  console.log(slots.default)
  
  // attrs: 非响应式的属性集合
  console.log(attrs.class)
  
  return {}
}</code></pre>
      </div>
    </section>

    <!-- 5. 组合式函数 (Composables) -->
    <section class="section">
      <h3>组合式函数 (Composables): 代码复用_hooks写法</h3>
      <p>组合式函数是 Composition API 的核心特性，允许你将相关逻辑封装成可复用的函数。</p>
      
      <h4>示例：创建一个计数器组合函数</h4>
      <div class="code-block">
        <pre><code  v-prism="'typescript'">// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = initialValue
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}

// 在组件中使用
&lt;script setup&gt;
import { useCounter } from './composables/useCounter'

const { count, doubleCount, increment, decrement, reset } = useCounter(10)
&lt;/script&gt;</code></pre>
      </div>

      <h4>示例：创建一个异步数据获取组合函数</h4>
      <div class="code-block">
        <pre><code  v-prism="'typescript'">// composables/useAsyncData.js
import { ref, onMounted } from 'vue'

export function useAsyncData(fetcher) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)
  
  const fetchData = async () => {
    try {
      loading.value = true
      error.value = null
      data.value = await fetcher()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }
  
  onMounted(fetchData)
  
  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

// 在组件中使用
&lt;script setup&gt;
import { useAsyncData } from './composables/useAsyncData'

const { data, loading, error, refetch } = useAsyncData(() => 
  fetch('https://api.example.com/data').then(res => res.json())
)
&lt;/script&gt;</code></pre>
      </div>
    </section>

    <!-- 8. 与 Options API 的对比 -->
    <section class="section">
      <h3>与 Options API 的对比</h3>
      <div class="comparison">
        <div class="comparison-item">
          <h4>Options API</h4>
          <ul>
            <li>按选项组织代码（data、methods、computed 等）</li>
            <li>逻辑分散，难以追踪</li>
            <li>复用逻辑需要 mixins，可能导致命名冲突</li>
            <li>TypeScript 支持有限</li>
          </ul>
        </div>
        <div class="comparison-item">
          <h4>Composition API</h4>
          <ul>
            <li>按功能组织代码</li>
            <li>逻辑集中，易于追踪</li>
            <li>通过组合函数复用逻辑，避免命名冲突</li>
            <li>优秀的 TypeScript 支持</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 9. 最佳实践 -->
    <section class="section">
      <h3>最佳实践</h3>
      <ul>
        <li><strong>组织代码：</strong>按功能将相关逻辑放在一起</li>
        <li><strong>创建组合函数：</strong>将可复用逻辑封装成组合函数</li>
        <li><strong>使用 TypeScript：</strong>充分利用 Composition API 的类型推断优势</li>
        <li><strong>命名规范：</strong>组合函数使用 use 前缀（如 useCounter）</li>
        <li><strong>合理使用响应式 API：</strong>根据场景选择 ref 或 reactive</li>
        <li><strong>避免过度使用：</strong>对于简单组件，Options API 可能更简洁</li>
      </ul>
    </section>

    <!-- 10. 常见问题与解决方案 -->
    <section class="section">
      <h3>常见问题与解决方案</h3>
      
      <h4>问题 1：忘记使用 .value 访问 ref 的值</h4>
      <div class="code-block">
        <pre><code  v-prism="'typescript'">// 错误
const count = ref(0)
console.log(count) // 输出 Ref 对象，不是值

// 正确
console.log(count.value) // 输出 0</code></pre>
      </div>

      <h4>问题 2：在 setup 函数中使用 this</h4>
      <div class="code-block">
        <pre><code  v-prism="'typescript'">// 错误
setup() {
  console.log(this) // undefined
}

// 正确
setup(props, { emit }) {
  // 使用 props 和 emit
}</code></pre>
      </div>

      <h4>问题 3：响应式数据失去响应性</h4>
      <div class="code-block">
        <pre><code  v-prism="'typescript'">// 错误
const state = reactive({ count: 0 })
const { count } = state // 解构后失去响应性

// 正确
const state = reactive({ count: 0 })
// 或使用 ref
const count = ref(0)</code></pre>
      </div>

      <h4>问题 4：watch 监听对象的变化</h4>
      <div class="code-block">
        <pre><code  v-prism="'typescript'">// 监听对象的所有变化
watch(
  () => state,
  (newValue, oldValue) => {
    console.log('State changed:', newValue)
  },
  { deep: true } // 需要添加 deep: true
)</code></pre>
      </div>
    </section>

    <!-- 11. 实际应用案例 -->
    <section class="section">
      <h3>实际应用案例</h3>
      <h4>完整的 TodoList 组件</h4>
      <div class="code-block">
        <pre><code v-prism="'typescript'">&lt;script setup&gt;
import { ref, computed } from 'vue'

// 组合函数：useTodoList
function useTodoList() {
  const todos = ref([
    { id: 1, text: 'Learn Vue 3', completed: false },
    { id: 2, text: 'Build a project', completed: true }
  ])
  
  const inputText = ref('')
  const nextId = ref(3)
  
  const completedTodos = computed(() => 
    todos.value.filter(todo => todo.completed).length
  )
  
  const totalTodos = computed(() => todos.value.length)
  
  function addTodo() {
    if (inputText.value.trim()) {
      todos.value.push({
        id: nextId.value++,
        text: inputText.value,
        completed: false
      })
      inputText.value = ''
    }
  }
  
  function toggleTodo(id) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }
  
  function removeTodo(id) {
    todos.value = todos.value.filter(t => t.id !== id)
  }
  
  return {
    todos,
    inputText,
    completedTodos,
    totalTodos,
    addTodo,
    toggleTodo,
    removeTodo
  }
}

// 使用组合函数
const { 
  todos, 
  inputText, 
  completedTodos, 
  totalTodos, 
  addTodo, 
  toggleTodo, 
  removeTodo 
} = useTodoList()
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="todo-list"&gt;
    &lt;h3&gt;Todo List&lt;/h3&gt;
    &lt;div class="todo-header"&gt;
      &lt;input 
        v-model="inputText" 
        placeholder="Add a todo"
        @keyup.enter="addTodo"
      /&gt;
      &lt;button @click="addTodo"&gt;Add&lt;/button&gt;
    &lt;/div&gt;
    &lt;ul class="todo-items"&gt;
      &lt;li v-for="todo in todos" :key="todo.id"&gt;
        &lt;input 
          type="checkbox" 
          v-model="todo.completed"
          @change="toggleTodo(todo.id)"
        /&gt;
        &lt;span :class="{ completed: todo.completed }"&gt;<span v-pre>{{ todo.text }}</span>&lt;/span&gt;
        &lt;button @click="removeTodo(todo.id)"&gt;Delete&lt;/button&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class="todo-footer"&gt;
      &lt;p&gt;{{ completedTodos }} / {{ totalTodos }} completed&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style scoped&gt;
.todo-list {
  max-width: 400px;
  margin: 0 auto;
}

.todo-header {
  display: flex;
  margin-bottom: 10px;
}

.todo-header input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
}

.todo-items {
  list-style: none;
  padding: 0;
}

.todo-items li {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.todo-items li span {
  flex: 1;
  margin: 0 10px;
}

.todo-items li .completed {
  text-decoration: line-through;
  color: #999;
}

.todo-footer {
  margin-top: 10px;
  text-align: right;
  color: #666;
}
&lt;/style&gt;</code></pre>
      </div>
    </section>

    <!-- 12. 总结 -->
    <section class="section">
      <h3>总结</h3>
      <p>Composition API 是 Vue 3 的重要特性，它提供了一种更灵活、更强大的方式来组织和复用组件逻辑。通过合理使用 Composition API，你可以：</p>
      <ul>
        <li>编写更清晰、更可维护的代码</li>
        <li>创建可复用的组合函数</li>
        <li>更好地支持 TypeScript</li>
        <li>提高代码的可读性和可测试性</li>
      </ul>
      <p>无论是构建大型应用还是小型组件，Composition API 都能为你提供更好的开发体验。</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia'
import { useResApiInteractionStore } from '@/stores/resApiInteraction'  
import { ref } from 'vue'

const resApiInteractionStore = useResApiInteractionStore()
const {NameApiKey, NameToolKey} = storeToRefs(resApiInteractionStore)
const apiKey = ref(NameApiKey.value)
const toolKey = ref(NameToolKey.value)


</script>


<style scoped lang="scss">
@use './v3Note.scss';

</style>
