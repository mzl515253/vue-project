<template>
  <div class="tab-content">
    <h2>Vue3 响应式缓存</h2>
    
    <h3>定义</h3>
    <p>Vue3 响应式缓存是指 Vue 3 响应式系统中对计算结果的缓存机制，主要通过 computed 计算属性和响应式依赖追踪实现，用于优化性能和减少不必要的重复计算。</p>
    
    <h3>核心概念</h3>
    <ul>
      <li><strong>依赖追踪</strong>：Vue 3 通过 Proxy 实现对响应式数据的依赖收集和追踪</li>
      <li><strong>缓存机制</strong>：对计算结果进行缓存，只有当依赖发生变化时才重新计算</li>
      <li><strong>惰性求值</strong>：计算属性在首次访问时才会执行计算</li>
      <li><strong>自动失效</strong>：当依赖的响应式数据发生变化时，缓存自动失效</li>
    </ul>
    
    <h3>computed 计算属性缓存</h3>
    
    <h4>基本用法</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { ref, computed } from 'vue'

const count = ref(0)

// 计算属性 - 会缓存结果
const doubleCount = computed(() => {
  console.log('Computing doubleCount...')
  return count.value * 2
})

// 首次访问时计算
console.log(doubleCount.value) // 输出: Computing doubleCount... 0

// 再次访问时使用缓存
console.log(doubleCount.value) // 输出: 0 (不会重新计算)

// 依赖变化时重新计算
count.value = 1
console.log(doubleCount.value) // 输出: Computing doubleCount... 2
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>缓存原理</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// computed 内部实现原理简化版
function computed(getter) {
  let value
  let dirty = true // 标记是否需要重新计算
  
  const effect = effect(() => {
    value = getter()
    dirty = false // 计算完成后标记为干净
  }, { lazy: true })
  
  return {
    get value() {
      if (dirty) {
        effect() // 只有当脏时才重新计算
      }
      return value
    }
  }
}</code></pre>
    </div>
    
    <h4>可写计算属性</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// 可写计算属性
const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (value) => {
    const [first, last] = value.split(' ')
    firstName.value = first
    lastName.value = last
  }
})

console.log(fullName.value) // John Doe
fullName.value = 'Jane Smith' // 触发 set 方法
console.log(firstName.value) // Jane
console.log(lastName.value) // Smith
&lt;/script&gt;</code></pre>
    </div>
    
    <h3>watch 和 watchEffect 的机制</h3>
    <h4>注意：侦听器本身并不缓存数据，它们用于观察响应式数据的变化并执行副作用。但是，我们可以通过一些方式优化侦听器的执行，例如使用watch的immediate和flush选项，但这不是缓存。</h4>
    <h4>watch 的机制</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { ref, watch } from 'vue'

const count = ref(0)
const expensiveValue = ref(0)

// 监听 count 变化
watch(() => count.value, (newVal, oldVal) => {
  // 只有当 count 变化时才执行
  expensiveValue.value = performExpensiveCalculation(newVal)
})

function performExpensiveCalculation(value) {
  console.log('Performing expensive calculation...')
  // 模拟耗时计算
  for (let i = 0; i < 100000000; i++) {}
  return value * 2
}

// 首次不会执行
count.value = 1 // 输出: Performing expensive calculation...
count.value = 1 // 相同值不会触发（缓存机制）
count.value = 2 // 输出: Performing expensive calculation...
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>watchEffect 的机制</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { ref, watchEffect } from 'vue'

const count = ref(0)
const name = ref('Alice')

// 自动追踪依赖
watchEffect(() => {
  console.log('watchEffect executed:', count.value, name.value)
})

// 首次执行
// 输出: watchEffect executed: 0 Alice

// 只有依赖变化时才执行
count.value = 1 // 输出: watchEffect executed: 1 Alice
name.value = 'Bob' // 输出: watchEffect executed: 1 Bob
count.value = 1 // 相同值不会触发（缓存机制）
&lt;/script&gt;</code></pre>
    </div>
    
    <h3>响应式系统的缓存策略</h3>
    
    <h4>1. 依赖收集与追踪</h4>
    <ul>
      <li>当访问响应式数据时，会触发 Proxy 的 get 陷阱，收集当前的副作用函数作为依赖</li>
      <li>当修改响应式数据时，会触发 Proxy 的 set 陷阱，通知所有依赖的副作用函数重新执行</li>
      <li>这种机制确保了只有真正依赖的数据变化时，才会触发相关的计算和副作用</li>
    </ul>
    
    <h4>2. 调度器与批处理</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  console.log('Count:', count.value)
})

// 多次修改会被批处理，只触发一次副作用
count.value++
count.value++
count.value++
// 输出: Count: 3 (只执行一次)
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>3. 缓存失效机制</h4>
    <ul>
      <li><strong>依赖变化</strong>：当计算属性或副作用函数依赖的响应式数据发生变化时，缓存会自动失效</li>
      <li><strong>手动触发</strong>：可以通过 triggerRef 手动触发 shallowRef 的响应式更新</li>
      <li><strong>惰性求值</strong>：计算属性只有在被访问时才会重新计算，避免不必要的计算</li>
    </ul>
    
    <h3>缓存优化策略</h3>
    
    <h4>1. 合理使用 computed</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 优化前：每次渲染都会重新计算
&lt;template&gt;
  &lt;div&gt; <span v-pre>{{ expensiveCalculation() }}</span> &lt;/div&gt;
&lt;/template&gt;

// 优化后：使用计算属性缓存结果
&lt;template&gt;
  &lt;div&gt; <span v-pre>{{ cachedResult }}</span> &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, computed } from 'vue'

const data = ref([1, 2, 3, 4, 5])

// 使用计算属性缓存结果
const cachedResult = computed(() => {
  return data.value.reduce((sum, item) => sum + item, 0)
})
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>2. 避免在模板中直接使用复杂计算</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 不推荐：模板中直接使用复杂计算
&lt;template&gt;
  &lt;div&gt;
    &lt;div v-for="item in items" :key="item.id"&gt;
      <span v-pre>{{ complexCalculation(item) }}</span>
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

// 推荐：使用计算属性或方法缓存
&lt;template&gt;
  &lt;div&gt;
    &lt;div v-for="item in processedItems" :key="item.id"&gt;
      <span v-pre>{{ item.processedValue }}</span>
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, computed } from 'vue'

const items = ref([{ id: 1, value: 10 }, { id: 2, value: 20 }])

const processedItems = computed(() => {
  return items.value.map(item => ({
    ...item,
    processedValue: complexCalculation(item)
  }))
})

function complexCalculation(item) {
  // 复杂计算逻辑
  return item.value * 2
}
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>3. 使用 shallowRef 和 shallowReactive</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { shallowRef, triggerRef } from 'vue'

// 浅层响应式引用，只追踪 .value 的变化
const largeObject = shallowRef({
  // 大型对象，包含很多属性
  data: Array(10000).fill(0).map((_, i) => ({ id: i, value: i }))
})

// 修改内部属性不会触发更新
largeObject.value.data[0].value = 100 // 不会触发更新

// 需要手动触发更新
triggerRef(largeObject) // 触发更新
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>4. 合理使用 watch 的深度监听</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { ref, watch } from 'vue'

const state = ref({
  user: {
    profile: {
      name: 'Alice'
    }
  }
})

// 深度监听 - 谨慎使用，可能影响性能
watch(
  () => state.value,
  (newState) => {
    console.log('State changed:', newState)
  },
  { deep: true }
)

// 优化：只监听需要的属性
watch(
  () => state.value.user.profile.name,
  (newName) => {
    console.log('Name changed:', newName)
  }
)
&lt;/script&gt;</code></pre>
    </div>
    
    <h3>缓存失效的场景</h3>
    
    <h4>1. 响应式数据变化</h4>
    <ul>
      <li>当计算属性依赖的响应式数据发生变化时，缓存会自动失效</li>
      <li>当 watch 监听的数据源发生变化时，会触发回调函数</li>
    </ul>
    
    <h4>2. 手动触发更新</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">&lt;script setup&gt;
import { shallowRef, triggerRef } from 'vue'

const data = shallowRef({ count: 0 })

// 修改内部属性不会触发更新
data.value.count++ // 缓存未失效

// 手动触发更新
triggerRef(data) // 缓存失效，触发更新
&lt;/script&gt;</code></pre>
    </div>
    
    <h4>3. 组件卸载与重建</h4>
    <ul>
      <li>当组件卸载时，相关的响应式依赖会被清理</li>
      <li>当组件重建时，会重新创建计算属性和副作用函数</li>
    </ul>
    
    <h3>性能优化最佳实践</h3>
    
    <h4>1. 计算属性的使用</h4>
    <ul>
      <li>对于需要重复计算的值，使用 computed 缓存结果</li>
      <li>将复杂的计算逻辑封装在计算属性中</li>
      <li>避免在计算属性中执行副作用操作</li>
      <li>合理设计计算属性的依赖关系，避免不必要的重新计算</li>
    </ul>
    
    <h4>2. 监听器的使用</h4>
    <ul>
      <li>使用 watchEffect 自动追踪依赖，简化代码</li>
      <li>对于需要比较变化前后值的场景，使用 watch</li>
      <li>避免过度使用 deep 监听，只监听必要的属性</li>
      <li>及时停止不需要的监听器，避免内存泄漏</li>
    </ul>
    
    <h4>3. 响应式数据的管理</h4>
    <ul>
      <li>对于大型对象，使用 shallowRef 或 shallowReactive 减少响应式开销</li>
      <li>合理使用 ref 和 reactive，根据数据类型选择合适的 API</li>
      <li>避免在响应式对象中存储非响应式数据（如 DOM 元素）</li>
      <li>使用 toRefs 在解构 reactive 对象时保持响应性</li>
    </ul>
    
    <h4>4. 渲染优化</h4>
    <ul>
      <li>使用 v-memo 指令缓存渲染结果</li>
      <li>合理使用 v-for 的 key 属性，避免不必要的 DOM 更新</li>
      <li>使用 KeepAlive 缓存组件实例，减少重复渲染</li>
      <li>避免在模板中直接使用复杂表达式，使用计算属性替代</li>
    </ul>
    
    <h3>常见问题与解决方案</h3>
    
    <h4>1. 计算属性不更新</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 问题：计算属性不更新
const items = ref([])
const total = computed(() => {
  return items.value.reduce((sum, item) => sum + item.value, 0)
})

// 错误做法：直接修改数组元素
items.value[0].value = 10 // 不会触发更新

// 正确做法：使用响应式方法修改数组
items.value[0] = { ...items.value[0], value: 10 } // 会触发更新
// 或使用数组方法
items.value.splice(0, 1, { ...items.value[0], value: 10 }) // 会触发更新
</code></pre>
    </div>
    
    <h4>2. 无限循环更新</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 问题：无限循环更新
const count = ref(0)
const doubleCount = computed(() => {
  count.value++ // 错误：在计算属性中修改依赖
  return count.value * 2
})

// 解决方案：避免在计算属性中修改依赖
const count = ref(0)
const doubleCount = computed(() => {
  return count.value * 2
})
</code></pre>
    </div>
    
    <h4>3. 性能瓶颈</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 问题：大型计算导致性能问题
const data = ref(Array(10000).fill(0).map((_, i) => i))
const processedData = computed(() => {
  // 复杂计算
  return data.value.map(item => {
    // 耗时操作
    for (let i = 0; i < 1000; i++) {}
    return item * 2
  })
})

// 解决方案：
// 1. 考虑使用防抖或节流
// 2. 分割计算任务
// 3. 使用 Web Worker 处理复杂计算
// 4. 考虑使用缓存策略
</code></pre>
    </div>
    
    <h3>底层原理深度解析</h3>
    
    <h4>1. 响应式系统的核心</h4>
    <ul>
      <li><strong>ReactiveEffect</strong>：副作用函数的包装器，负责依赖收集和触发</li>
      <li><strong>Track</strong>：在访问响应式数据时收集依赖</li>
      <li><strong>Trigger</strong>：在修改响应式数据时触发依赖更新</li>
      <li><strong>Scheduler</strong>：调度器，负责批处理和排序副作用函数的执行</li>
    </ul>
    
    <h4>2. computed 的实现</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// computed 内部实现简化
class ComputedRefImpl {
  constructor(getter, setter) {
    this._getter = getter
    this._setter = setter
    this._dirty = true
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
        trigger(this, TriggerOpTypes.SET, 'value')
      }
    })
  }

  get value() {
    if (this._dirty) {
      this._value = this._effect.run()
      this._dirty = false
    }
    track(this, TrackOpTypes.GET, 'value')
    return this._value
  }

  set value(newValue) {
    this._setter(newValue)
  }
}
</code></pre>
    </div>
    
    <h4>3. 依赖追踪的过程</h4>
    <ol>
      <li>当访问计算属性的 value 时，会检查是否 dirty</li>
      <li>如果 dirty，会执行 getter 函数，并通过 ReactiveEffect 收集依赖</li>
      <li>执行过程中访问的响应式数据会将当前 ReactiveEffect 作为依赖收集</li>
      <li>计算完成后，将 dirty 标记为 false</li>
      <li>当依赖的响应式数据变化时，会触发 ReactiveEffect 的调度函数，将 dirty 标记为 true，并通知依赖该计算属性的其他副作用</li>
    </ol>
    
    <h3>总结</h3>
    <p>Vue3 的响应式缓存机制是其性能优化的重要组成部分，通过以下方式实现高效的响应式系统：</p>
    <ul>
      <li><strong>计算属性缓存</strong>：通过 computed 实现对计算结果的缓存，只有依赖变化时才重新计算</li>
      <li><strong>依赖追踪</strong>：通过 Proxy 实现精确的依赖收集和触发</li>
      <li><strong>批处理更新</strong>：将多个更新操作批处理，减少渲染次数</li>
      <li><strong>惰性求值</strong>：计算属性在首次访问时才执行计算</li>
      <li><strong>浅层响应式</strong>：通过 shallowRef 和 shallowReactive 减少响应式开销</li>
    </ul>
    <p>正确理解和使用 Vue3 的响应式缓存机制，可以显著提升应用的性能和用户体验。开发者应该根据具体场景选择合适的响应式 API，并遵循最佳实践，避免常见的性能陷阱。</p>
    <p>通过合理使用 computed、watch、watchEffect 等 API，以及掌握响应式系统的底层原理，开发者可以构建出更加高效、流畅的 Vue 应用。</p>
  </div>
</template>

<style lang="scss" scoped>
@use "./v3Note.scss";
</style>