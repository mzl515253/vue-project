<template>
        <div class="tab-content">
          <h2>组件通信</h2>
          
          <h3>定义</h3>
          <p>Vue 3 中组件之间的通信方式，包括父子组件、兄弟组件、跨层级组件和全局组件之间的数据传递和事件交互。</p>
          
          <h3>核心通信方式</h3>
          <ul class="toApiTag">
            <li v-for="item in communList" :key="item.id" @click="scrollToRef(item.id)"><strong>{{item.id}}</strong> - {{item.scene}}</li>
          </ul>
          
          <h3>详细用法</h3>
          
          <h3 id="Props/Emits">1. Props / Emits - 父子组件通信</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">// 父组件
&lt;template&gt;
  &lt;ChildComponent 
    :message="parentMessage" 
    :count="count" 
    @custom-event="handleEvent" 
    @update:count="count = $event" 
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const parentMessage = ref('Hello from parent')
const count = ref(0)

function handleEvent(data) {
  console.log('Received from child:', data)
}
&lt;/script&gt;

// 子组件
&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt; <span v-pre>{{ message }}</span> &lt;/p&gt;
    &lt;p&gt;Count: <span v-pre>{{ count }}</span> &lt;/p&gt;
    &lt;button @click="sendEvent"&gt;Send Event&lt;/button&gt;
    &lt;button @click="increment"&gt;Increment Count&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { defineProps, defineEmits } from 'vue' // 引入 defineProps 和 defineEmits 函数，也可以不引入 直接使用

// 定义 props 并添加类型验证
const props = defineProps({
  message: {
    type: String,
    default: 'Default message'
  },
  count: {
    type: Number,
    required: true
  }
})

// 定义 emits 并添加类型
const emit = defineEmits(['custom-event', 'update:count'])

function sendEvent() {
  emit('custom-event', 'Hello from child')
}

function increment() {
  emit('update:count', props.count + 1)
}
&lt;/script&gt;</code></pre>
          </div>
          
          <h3 id="v-model">2. v-model - 双向绑定</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">// 父组件
&lt;template&gt;
  &lt;ChildComponent v-model="message" /&gt;
  等同于
  &lt;ChildComponent :modelValue="message" @update:modelValue="message = $event" /&gt;
// 注意以上代码中，$event 在组件自定义事件中，此时，是触发事件所传递的数据不能.target
  &lt;ChildComponent v-model:count="count" /&gt;
  // 等同于 
  &lt;ChildComponent :count="count" @update:count="count = $event" /&gt;
// 注意以上代码中，$event 在组件自定义事件中，此时，是触发事件所传递的数据不能.target
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const message = ref('Hello')
const count = ref(0)
&lt;/script&gt;

// 子组件
&lt;template&gt;
  &lt;div&gt;
    &lt;input v-model="localMessage" @input="updateMessage" /&gt;
    // 或
    &lt;input v-model="localMessage" @input="emit('update:modelValue', $event.target.value)" /&gt;
// 注意以上代码中，$event 在原生事件中，此时，是事件实例需要.target.value 来获取输入值。

    &lt;button @click="increment"&gt; <span v-pre>{{ count }}</span> &lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: String, // 默认 v-model
  count: Number       // 具名 v-model
})

const emit = defineEmits(['update:modelValue', 'update:count'])

// 计算属性实现双向绑定
const localMessage = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
// 或
//方法 updateMessage 用于更新 modelValue 属性
function updateMessage(e) {
   emit('update:modelValue', e.target.value)
}

function increment() {
  emit('update:count', props.count + 1)
}
&lt;/script&gt;

// 档以上案例使用 defineModel 函数后
// defineModel 函数  defineModel是 Vue 3.4+ 中新增的一个宏，
// 用于在自定义组件中实现双向绑定的 v-model 支持。它简化了在组件中实现 v-model 的步骤。



// ************ 父组件中 ************
  &lt;ChildComponent v-model="message" /&gt;
  &lt;ChildComponent v-model:count="count" /&gt;
&lt;script setup&gt;
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const message = ref('Hello')
const count = ref(0)
const title = ref('随意标题')

&lt;/script&gt;

// ************ 子组件中 ************
// 模版中使用 v-model 绑定 childModelMsg.value
 &lt;input v-model="childModelMsg" /&gt;

// 模版中使用 v-model 绑定 childModelCount.value
 &lt;input v-model="childModelCount" /&gt;

// 或模版中显示父组件的 count 属性值
 &lt;p&gt; Count: <span v-pre>{{ childModelCount }}</span> &lt;/p&gt;

// 声明一个childModelMsg，默认名为 modelValue
 const childModelMsg= defineModel() // 或 详细点的写法 ：defineModel('modelValue',{default: '' })

 // 声明一个childModelCount，名为 count 与父组件的 :count="xxxx"中，:count 保持一致
  const childModelCount= defineModel('count',{default: ()=> 0 })

// defineModel定义选项
const model1 = defineModel({
  type: String, // 类型验证
  required: true, // 是否必传, 默认 false
  default: '默认值', // 默认值, 默认 undefined
  local: true, // 是否本地可修改, 默认 false
  validator: (value) => value.length > 0 // 验证器函数，用于验证 modelValue 是否符合要求
})

// defineModel 类型定义ts类型
const model2 = defineModel &lt;string&gt;()
const count = defineModel &lt;number&gt;('count', { default: 0 })

// 或者
const title = defineModel &lt;string&gt;('title', {
  required: true
})

// 子组件中可直接修改 modelValue 属性值和 title 属性值
// 修改 modelValue 属性值
// 方法1：直接赋值
modelValue.value = '新值'
// 修改 title 属性值
title.value = '新标题'
// 方法2：通过方法修改
const changeValue = () => {
  modelValue.value = 'New Value'
}
// 修改 title 属性值
const changeTitle = () => {
  title.value = 'New Title'
}



</code></pre>
          </div>
        <h4>注意事项</h4> 
<ul>
  <li style="color: red;">必须使用 script setup标签 ：defineModel只能在 script setup标签中使用</li>
  <li>编译时宏：defineModel是编译时语法糖，不是运行时函数</li>
  <li style="color: red;">与 defineProps/defineEmits关系：defineModel底层仍然使用 defineProps和 defineEmits</li>
  <li>默认值处理：如果父组件没有传递 v-model，本地默认值会生效</li>
</ul>
          <h3 id="ref/expose/$refs/$parent">3. ref / expose / $refs / $parent  - 父组件访问子组件</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">// 父组件
&lt;template&gt;
  &lt;ChildComponent ref="childRef" /&gt;
  &lt;button @click="callChildMethod"&gt;Call Child Method&lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const childRef = ref(null)

function callChildMethod() {
  if (childRef.value) {
    childRef.value.increment()
    console.log('Child count:', childRef.value.count)
  }
}
&lt;/script&gt;

// 子组件
&lt;template&gt;
  &lt;div&gt;Count: <span v-pre>{{ count }}</span> &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
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
&lt;/script&gt;

// $refs 访问子组件的属性和方法: 值为对象，包含所有被ref属性标识的DOM元素或组件实例
  //  ******父组件中***** */ 
  &lt;child1 ref='child1Ref' &gt;get Child Method&lt;/child1&gt;
  &lt;child2 ref='child2Ref' &gt;get Child Method&lt;/child2&gt;
  &lt;button @click="getChildMethod($refs)"&gt;get Child Method&lt;/button&gt;

  let child1Ref = ref(null)
let child2Ref = ref(null)

let a = ref(null)
let b = reactive({
  count: 0
})
function incrementCount() {
  b.count++
}

  function getChildMethod(refs:{[key:string]:any}) {
    console.log(refs) // 值为对象,包含child1Ref和child2Ref标识的组件实例
  }
  // 暴露给子组件的属性和方法
  defineExpose({
    a,
    b,
    incrementCount
  })  

  // $parent 访问父组件的属性和方法: 值为父组件实例对象
  //  ******子组件中***** */ 
  &lt;button @click="getParentMethod($parent)"&gt;get Parent Method&lt;/button&gt;
  
  let c = ref(null)
  let d = reactive({
    count: 0
  })
  function incrementCount222() {
    d.count++
  }

  function getParentMethod(parent:object) {
    console.log(parent) // 父组件实例
  }
  // 暴露给父组件的属性和方法
  defineExpose({
    c,
    d,
    incrementCount222
  })  
</code></pre>
          </div>
          
          <h3 id="provide/inject">4. provide / inject - 跨层级通信</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">// 祖先组件
&lt;script setup&gt;
import { provide, ref, computed } from 'vue'
import ChildComponent from './ChildComponent.vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

// 提供响应式数据
provide('count', count)
provide('doubleCount', doubleCount)

// 提供方法
provide('increment', () => {
  count.value++
})
&lt;/script&gt;

// 深层子组件
&lt;script setup&gt;
import { inject } from 'vue'

// 注入数据
const count = inject('count')
const doubleCount = inject('doubleCount')
const increment = inject('increment')

// 带入默认值，如果先辈组件没传提供值，默认值会生效
const defaultValue = inject('someKey', 'default value')

// 使用 Symbol 作为 key 避免命名冲突
import { InjectionKey } from 'vue'
const key = Symbol()
provide(key, 'value')
const value = inject(key)
&lt;/script&gt;</code></pre>
          </div>
          
          <h3 id="$attrs/$listeners">5. $attrs / $listeners - 属性和事件透传</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">// 父组件
&lt;template&gt;
  &lt;MiddleComponent 
    :message="message" 
    :count="count" 
    @click="handleClick" 
    @custom-event="handleCustomEvent" 
  /&gt;
&lt;/template&gt;

// 中间组件 - 透传属性和事件
&lt;template&gt;
  &lt;ChildComponent v-bind="$attrs" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import ChildComponent from './ChildComponent.vue'
// 不需要定义 props 和 emits，直接透传
&lt;/script&gt;

// 子组件
&lt;template&gt;
  &lt;div @click="$emit('click')"&gt;
   <span v-pre>{{ message }}</span> 
    &lt;button @click="$emit('custom-event')"&gt;Emit&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
const props = defineProps(['message'])
const emit = defineEmits(['click', 'custom-event'])
&lt;/script&gt;</code></pre>
          </div>
          
          <h3 id="Event Bus">6. Event Bus - 任意组件通信</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">// 创建事件总线
// eventBus.js
import mitt from 'mitt'
const eventBus = mitt()
export default eventBus

// 组件 A - 发送事件
&lt;script setup&gt;
import eventBus from './eventBus'

function sendMessage() {
  eventBus.emit('message', 'Hello from Component A')
}
&lt;/script&gt;

// 组件 B - 监听事件
&lt;script setup&gt;
import { onMounted, onUnmounted } from 'vue'
import eventBus from './eventBus'

function handleMessage(data) {
  console.log('Received:', data)
}

onMounted(() => {
  eventBus.on('message', handleMessage)
})

onUnmounted(() => {
  eventBus.off('message', handleMessage)
})
&lt;/script&gt;</code></pre>
          </div>
          
          <h3 id="Pinia">7. Pinia - 全局状态管理</h3>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">// main.js
// 安装 pinia 插件
import { createPinia } from 'pinia'

// 创建 pinia 实例并使用
const pinia = createPinia()
app.use(pinia)
              
// ----------store/counter.js------
import { defineStore } from 'pinia'
// *********************store配置项写法：*************
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    msg:'sadad
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

// *********************store组合式写法：*************
import { ref, computed } from 'vue'
export const useCounterStore = defineStore('counter', () => { // 'counter' 是 store 名称,要求唯一
  const count = ref(0)
  const msg = ref('sadad')
  const doubleCount = computed(() => count.value * 2)
  const increment = () => {
    count.value++
  }
  return {
    count,
    msg,
    doubleCount,
    increment
  }
})

// 任意组件使用
&lt;script setup&gt;
import { useCounterStore } from './store/counter'
import {storeToRefs} from 'pinia' //storeToRefs 是一个函数，用于将 store中数据属性结构赋值后转换为响应式数据

const counterStore = useCounterStore()
// 或
const { count,msg, doubleCount, increment } = storeToRefs(useCounterStore())

//$subscribe 监听 store 中数据的变化
counterStore.$subscribe((mutate, state) => {
  console.log('store 中的数据发生了变化', mutate, state) // mutate 是触发变化的操作，state 是变化后的状态
})

// 读取store中的数据
console.log(counterStore.count) // 或 console.log(counterStore.$state.count)
console.log(counterStore.doubleCount) 

// 修改store中的数据 
//1. 直接修改响应式数据
count.value++ // 或 counterStore.count++
// 2. 批量修改
counterStore.$patch({
  count: 100,
  msg: '批量修改6'
})
// 3. 调用actions中的方法修改
counterStore.increment() // 或 increment()

&lt;/script&gt;</code></pre>
          </div>
          
          <h3>通信方式对比</h3>
          <el-table :data="communicationMethods">
            <el-table-column label="通信方式" prop="name" width="150" />
            <el-table-column label="适用场景" prop="scene" />
            <el-table-column label="优点" prop="advantage" />
            <el-table-column label="缺点" prop="disadvantage" />
          </el-table>
          <h3>底层原理</h3>
          <p>Vue 3 组件通信基于以下核心机制：</p>
          <ul>
            <li><strong>Props 传递</strong>：通过组件实例的 props 选项向下传递数据，基于单向数据流原则</li>
            <li><strong>事件系统</strong>：基于发布-订阅模式，通过 emit 触发事件，父组件监听处理</li>
            <li><strong>依赖注入</strong>：provide/inject 基于 Vue 的依赖注入系统，实现跨层级数据传递</li>
            <li><strong>响应式系统</strong>：所有通信方式都依赖 Vue 的响应式系统，确保数据变化时 UI 及时更新</li>
            <li><strong>组件实例引用</strong>：ref 机制允许父组件直接访问子组件实例及其暴露的方法和属性</li>
          </ul>
          
          <h3>使用场景详解</h3>
          
          <h4>父子组件通信</h4>
          <ul>
            <li>表单组件：父组件传递初始值，子组件发射用户输入</li>
            <li>列表项组件：父组件传递数据，子组件发射操作事件</li>
            <li>模态框组件：父组件控制显示/隐藏，子组件发射关闭事件</li>
          </ul>
          
          <h4>跨层级通信</h4>
          <ul>
            <li>主题设置：全局主题配置向下传递</li>
            <li>用户信息：用户登录状态在整个应用中共享</li>
            <li>权限控制：权限信息在组件树中传递</li>
          </ul>
          
          <h4>全局状态管理</h4>
          <ul>
            <li>用户状态：登录信息、偏好设置</li>
            <li>应用配置：全局设置、主题、语言</li>
            <li>业务数据：购物车、订单信息</li>
          </ul>
          
          <h3>常见错误</h3>
          <ul>
            <li><strong>Props 验证错误</strong>：类型定义不正确或缺少必填项</li>
            <li><strong>事件名称错误</strong>：大小写不一致，Vue 推荐使用 kebab-case</li>
            <li><strong>双向绑定错误</strong>：子组件直接修改 props 而不是使用 emit</li>
            <li><strong>provide/inject 使用不当</strong>：注入的 key 不存在或类型不匹配</li>
            <li><strong>内存泄漏</strong>：Event Bus 事件未及时解绑</li>
            <li><strong>ref 访问时机错误</strong>：在组件挂载前访问 ref</li>
          </ul>
          
          <h3>注意事项</h3>
          <ul>
            <li><strong>单向数据流</strong>：props 是单向的，子组件不应直接修改 props</li>
            <li><strong>事件命名</strong>：事件名称建议使用 kebab-case，与 HTML 事件保持一致</li>
            <li><strong>provide/inject 谨慎使用</strong>：适用于跨层级通信，不适合频繁变化的数据</li>
            <li><strong>类型安全</strong>：使用 TypeScript 时，为 props 和 emits 添加类型定义</li>
            <li><strong>性能优化</strong>：避免在 props 中传递复杂对象，考虑使用 shallowRef</li>
            <li><strong>组件解耦</strong>：尽量减少组件间的直接依赖，优先使用事件通信</li>
            <li><strong>清理资源</strong>：使用 Event Bus 时，在组件卸载时解绑事件</li>
          </ul>
          
          <h3>最佳实践</h3>
          <ul>
            <li><strong>优先使用 Props/Emits</strong>：父子组件通信的首选方式</li>
            <li><strong>合理使用 v-model</strong>：双向绑定场景的最佳选择</li>
            <li><strong>provide/inject 用于跨层级</strong>：避免 props drilling</li>
            <li><strong>ref/expose 用于必要场景</strong>：仅在需要直接访问子组件时使用</li>
            <li><strong>Pinia 管理全局状态</strong>：复杂应用的全局状态管理方案</li>
            <li><strong>Event Bus 谨慎使用</strong>：仅用于简单的跨组件通信</li>
            <li><strong>类型定义</strong>：使用 TypeScript 增强类型安全性</li>
            <li><strong>组件职责单一</strong>：每个组件只负责自己的功能，减少通信复杂度</li>
          </ul>
          
          <h3>性能优化建议</h3>
          <ul>
            <li><strong>避免频繁 props 更新</strong>：使用 computed 缓存计算结果</li>
            <li><strong>合理使用 shallowRef</strong>：大型对象使用浅层响应式</li>
            <li><strong>事件节流</strong>：频繁触发的事件使用节流处理</li>
            <li><strong>减少不必要的通信</strong>：组件内部状态无需通过 props 传递</li>
            <li><strong>使用 Pinia 的持久化</strong>：合理管理全局状态</li>
            <li><strong>组件懒加载</strong>：减少初始加载时的组件通信</li>
          </ul>
        </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import useAnchor from "@/pages/Hooks/useAnchor.ts";


const { scrollToRef } = useAnchor('v3_ComponentCommunicationId')

const communList = reactive([
{id:'Props/Emits',scene:'父子组件通信'},
{id:'v-model',scene:'双向绑定'},
{id:'ref/expose/$refs/$parent',scene:'父组件访问子组件, 而$parent子组件访问父组件'},
{id:'provide/inject',scene:'跨层级通信'},
{id:'$attrs/$listeners',scene:'属性和事件透传'},
{id:'Event Bus',scene:'任意组件通信'},
{id:'Pinia',scene:'全局状态管理'}
])

const communicationMethods = ref([
  {
    name: 'Props/Emits',
    scene: '父子组件通信',
    advantage: '单向数据流，简单直接',
    disadvantage: '层级深时传递繁琐',
  },
  {
    name: 'v-model',
    scene: '双向绑定',
    advantage: '支持双向绑定，方便数据同步',
    disadvantage: '需要类型定义，可能引入错误,仅适用于父子组件',
  },
    {
    name: 'ref/expose/$refs/$parent',
    scene: '父组件访问子组件, 而$parent子组件访问父组件',
    advantage: '直接访问子组件实例，方便直接操作',
    disadvantage: '耦合度较高，仅在必要场景使用，避免组件解耦',
  },
  {
    name: 'provide/inject',
    scene: '跨层级通信',
    advantage: '避免 props drilling，支持跨层级通信',
    disadvantage: '需要手动管理依赖关系',
  },
 {
    name: '$attrs/$listeners',
    scene: '属性透传',
    advantage: '减少代码冗余',
    disadvantage: '可能导致属性冲突',
  },
    {
    name: 'Event Bus',
    scene: '任意组件',
    advantage: '灵活，解耦',
    disadvantage: '不支持数据持久化，仅用于简单的通信；事件管理复杂，可能内存泄漏',
  },
  {
    name: 'Pinia',
    scene: '全局状态管理',
    advantage: '复杂应用的全局状态管理方案；集中管理，易于调试',
    disadvantage: '需要额外配置，学习成本，增加应用复杂度',
  },
])


</script>



<style lang="scss" scoped>
@use "./v3Note.scss";

</style>