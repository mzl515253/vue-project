<template>
<div class="tab-content">
          <h2>响应式 API</h2>
          
          <h3>定义</h3>
          <p>Vue 3 提供了一系列响应式 API，用于创建和管理响应式数据，是组合式 API 的核心组成部分。</p>
          
          <h3>核心 API 列表</h3>
          <ul class="toApiTag">
            <li v-for="item in apiList" :key="item.name" @click="scrollToRef(item.id)"><strong>{{item.name}}</strong> - {{item.desc}}</li>
          </ul>
          
          <h3>详细用法</h3>
          
          <h4  id="refId">1. ref - 创建响应式引用</h4>
          <div class="code-block">
      <pre><code  v-prism="'typescript'">//模版中的写法,与Vue2的写法相同
&lt;template&gt;
&lt;div&gt;
  &lt;p&gt;
    &lt;span&gt;
      <span v-pre>{{ count }}</span>  
    &lt;/span&gt;
  &lt;/p&gt;
&lt;/div&gt;
&lt;/template&gt;
// 基本类型
import { ref } from 'vue'
const count = ref(0)
count.value++ // 修改值

// 对象类型
const user = ref({ name: 'Alice' })
user.value.name = 'Bob' // 修改对象属性
user.value = { name: 'Charlie' } // 完全替换对象,不会失去响应式连接

// 数组类型
const items = ref(['a', 'b', 'c',{id:1,name:'d'}])
items.value.push('d') // 添加元素
items.value = ['e', 'f'] // 完全替换数组,不会失去响应式连接
items.value[0] = 'g' // 通过索引修改数组元素,不会失去响应式连接
items.value[3] = {id:0,name:'def'} // 通过索引修改数组元素,不会失去响应式连接

</code></pre>
          </div>
          
          <h4 id="reactiveId">2. reactive - 创建响应式对象</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">//模版中的写法,与Vue2的写法相同   
import { reactive } from 'vue'
const state = reactive({ 
  count: 0,
  user: { name: 'Alice' }
})
state.count++ // 直接修改属性
state.user.name = 'Bob' // 深度响应
state.user.age = 18 // 可以直接新增属性，也会响应变化; 而 Vue2 中新增属性不会响应变化，需要借助this.$set()方法或Vue.set()
delete state.user.age // 删除属性，也会响应变化; 而 Vue2 中删除属性不会响应变化，需要借助this.$delete方法或Vue.delete()
state = { count: 10, user: { name: 'Charlie' } } 或 state =  reactive({ count: 10, user: { name: 'Charlie' }  })  // 会失去响应式连接，
// 正确的做法
Object.assign(state, { count: 10,user: { name: 'Charlie' }  })
</code></pre>
</div>
          
          <h4 id="computedId">3. computed - 计算属性</h4>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">import { ref, computed } from 'vue'

const count = ref(0)

// 创建计算属性
const doubleCount = computed(() => count.value * 2)
console.log(doubleCount.value) // 0

count.value = 1
console.log(doubleCount.value) // 2

// 计算属性是只读的
// doubleCount.value = 10 // 会报错

// 可写的计算属性
const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (value) => {
    const [first, last] = value.split(' ')
    firstName.value = first
    lastName.value = last
  }
})</code></pre>
          </div>
          
          <h4 id="watchId">4. watch - 监听器</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">import { ref,reactive, watch } from "vue"; 
  let sum = ref(0);
    let Obj = ref({name:'你好啊',age:18});
  let person = reactive({
    name:'张三',
    age:18,
    job:{
      j1:{
        salary: 20
      }
    }
  })
    // 情况一：监视ref定义的一个响应式数据
      watch(sum, (newVal,oldVal)=>{
      console.log('sum变了',newVal,oldVal);
      })
    // 情况二：监视ref定义的对象数据，如果监听ref定义的对象数据的属性变化，需要开启deep深度监视配置
    // 注意；
    // 1.如果监听ref定义的对象数据的属性变化，需要开启deep深度监视配置
    // 2.ref对象中仅属性修改，则新旧值一样，如果对象被完全替换，则新旧值不一样：因为完全替换使对象的引用地址发生了变化
    watch(Obj,(newVal,oldVal)=>{
      console.log('Obj变了-新值为',newVal);
      console.log('Obj变了-旧值为',oldVal);
    },{immediate:true,deep:true})  // 第三个参数配置立即监听，deep深度监视开启

    // 情况三：监视reactive定义的一个响应式数据；
    // 注意；
    // 1.此处无法很正确获取旧的值oldVal
    // 2.强制开启了deep深度监视的配置(deep配置无效)
    watch(person,(newVal,oldVal)=>{
      console.log('person变了-新值为',newVal);
      console.log('person变了-旧值为',oldVal,'此处无法很正确获取旧的值');

    },{deep:false}) // 此处deep深度监视关闭无效

    // 情况四：监视reactive定义的一个响应式数据中的某一个属性
    watch(()=>person.age,(newVal,oldVal)=>{
      console.log('person的age变了-新值为',newVal);
      console.log('person的age变了-旧值为',oldVal);
    })
    // 如果reactive的属性是对象或数组，涉及内部属性变化，需要开启deep深度监视配置
       watch(()=>person.job,(newVal,oldVal)=>{
      console.log('person的job变了-新值为',newVal);
      console.log('person的job变了-旧值为',oldVal);
      },{deep:true})   // 此处由于监视的是reactive所定义的响应式对象person下的属性依然是对象或数组需要深度监视时，deep配置有效

    // 情况五: 监视reactive定义的一个响应式数据中的某一些属性
    watch([()=>person.age,()=>person.name],(newVal,oldVal)=>{
      console.log('person的age或name变了-新值为',newVal);
      console.log('person的age或name变了-旧值为',oldVal);
    }) 
      watch([sum,()=>person.name],(newVal,oldVal)=>{
      console.log('person的name 或 sum变了-新值为',newVal);
      console.log('person的name 或 sum变了-旧值为',oldVal);
    }) 

    // 补充说明：watch函数返回一个函数，用于停止监听响应式数据的变化
    const stopWatch = watch([sum,()=>person.name],(newVal,oldVal)=>{
      console.log('person的name 或 sum变了-新值为',newVal);
      console.log('person的name 或 sum变了-旧值为',oldVal);
    })
    stopWatch() //调用该函数则 停止监听
</code></pre>
    </div>
          
          <h4 id="watchEffectId">5. watchEffect - 自动追踪依赖</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">import { watchEffect } from 'vue'
watchEffect(() => {
  console.log('count:', state.count)
  console.log('name:', state.user.name)
})

// 补充说明：watchEffect函数返回一个函数，用于停止监听响应式数据的变化
const stopWatchEffect = watchEffect(() => {
  console.log('count:', state.count)
  console.log('name:', state.user.name)
})
stopWatchEffect() //调用该函数则 停止监听
</code></pre>
    </div>
          
          <h4 id="toRefId">6. toRef 和 toRefs - 转换响应式对象</h4>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">import { reactive, toRef, toRefs } from 'vue'

const state = reactive({ count: 0, name: 'Alice' })

// 创建单个属性的 ref
const countRef = toRef(state, 'count')
countRef.value++ // 会更新原始对象state.count , 且视图会自动更新
console.log(state.count) // 1

// 将整个对象转换为 ref 集合
const stateRefs = toRefs(state)
// 现在可以解构而不失去响应性
const { count, name } = stateRefs
count.value++
name.value = 'Bob' // 会更新原始对象state.name , 且视图会自动更新
console.log(state.count) // 2
console.log(state.name) // Bob
</code></pre>
          </div>
          
          <h4 id="shallowId">7. 浅层响应式 API</h4>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">import { shallowRef, shallowReactive, triggerRef } from 'vue'

// 浅层响应式对象 - 只响应顶层属性变化
const shallowState = shallowReactive({
  count: 0,
  user: { name: 'Alice' } // 非响应式
})

shallowState.count++ // 响应式更新
shallowState.user.name = 'Bob' // 非响应式更新

// 浅层 ref - 只响应 .value 的替换
const shallowCount = shallowRef({ count: 0 })
shallowCount.value.count++ // 非响应式更新
shallowCount.value = { count: 1 } // 响应式更新

// 手动触发 shallowRef 的更新
triggerRef(shallowCount)</code></pre>
          </div>
              <h4 id="readonlyId">8. readonly</h4>
    <p>创建只读的响应式对象，禁止修改。</p>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">import { readonly } from 'vue'
const readonlyState = readonly(state)
// 以下操作会被阻止
// readonlyState.count++</code></pre>
    </div>
  <h4 id="shallowReadonlyId">9. shallowReadonly</h4>
    <p>创建浅层只读的响应式对象，禁止修改。</p>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">import { shallowReadonly } from 'vue'
const readonlyState = shallowReadonly(state)
// 以下操作会被阻止
// readonlyState.count++
// 以下修改不会被阻止
readonlyState.user.name = 'Bob'
// 以下修改会被阻止
readonlyState.user = { name: 'Bob' }
</code></pre>
    </div>
    <h4 id="toRawId">10. toRaw</h4>
    <p>将响应式对象转换为普通对象，失去响应性。</p>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">import { reactive,toRaw } from 'vue'
const state = reactive({ count: 0 })
const raw = toRaw(state)

raw.count = 30
console.log(state.count) // 30 ✅ 原对象数据被修改
// 但组件不会重新渲染，因为绕过了响应式系统
</code></pre>
    </div>
  <h4 id="markRawId">11. markRaw</h4>
    <p>将对象标记为原始对象，防止被响应式系统代理</p>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">import {reactive, markRaw } from 'vue'
const rawObj = markRaw({ data: 1 })
const state = reactive({ info: rawObj })

rawObj.data = 100
console.log(state.info.data) // 100 ✅ 数据变化了
// 但组件不会重新渲染，因为对象被标记为原始
</code></pre>
    </div>
<h4 id="customRefId">12. customRef</h4>
    <p>创建自定义的 ref，用于在模板中直接访问值，而不是通过 .value。</p>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">import { customRef } from 'vue'
     //  自定义一个ref,名为 myRef
    function myRef(value, delay) {
      let timer;
      return customRef((track, trigger) => {
        return {
          get() {
            console.log(`有人从myRef容器中读取数据了，我把${value}值给他了`);
            track(); // 通知Vue 追踪value值的变化，（提前和 get 商量一下,让它认为这个value是有用的）
            return value;
          },
          set(newVal) {
            console.log(`有人把myRef容器中数据改为了${newVal}`);
            clearTimeout(timer);
            timer = setTimeout(() => {
              value = newVal;
              trigger(); // 通知Vue去重新解析模版
            }, delay);
          },
        };
      });
    }

    //  使用自定义ref
    const myCount = myRef(0, 1000);
    myCount.value = 100; // 100 会延迟 1s 才更新到模版中
</code></pre>
    </div>

          <h4 id="toolId"> 工具函数</h4>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">import { ref, reactive, readonly, isProxy, isRef, isReactive, isReadonly, unref } from 'vue'

const count = ref(0)
const state = reactive({ count: 0 })
const readonlyState = readonly(state)

console.log(isRef(count)) // true
console.log(isReactive(state)) // true
console.log(isReadonly(readonlyState)) // true
console.log(isProxy(count)) // true
console.log(isProxy(state)) // true
console.log(isProxy(readonlyState)) // true


let value = unref(count)  // value 是 0，是一个数字
value = 5  // 这不会改变 count 的值
console.log(count.value)  // 0
// 注意：
const objRef = ref({ a: 1, b: 2 })
let obj = unref(objRef)  // obj 是 { a: 1, b: 2 } 的引用
obj.a = 10  // 这会改变原始对象，因为 obj 是引用
console.log(objRef.value)  // { a: 10, b: 2 }

但是，如果你试图重新赋值整个 obj，则不会影响原始 ref：

obj = { c: 3 }  // 重新赋值，现在 obj 指向新对象
console.log(objRef.value)  // 仍然是 { a: 10, b: 2 }

总结
unref返回的是值，对于基本类型是值的副本，对于引用类型是对象的引用。
修改基本类型的值不会影响原数据。
修改引用类型的属性会影响原数据，因为引用类型是共享的。
但注意，如果整个替换引用类型（重新赋值），则不会影响原数据指向的对象。
</code></pre>
          </div>
          
          <h3>ref vs reactive 对比</h3>
      <el-table :data="vtableData">
        <el-table-column label="特性" prop="特性" width="150" />
        <el-table-column label="ref" prop="ref" />
        <el-table-column label="reactive" prop="reactive" />
      </el-table>
          <h3>底层原理</h3>
          <p>Vue 3 的响应式系统基于 ES6 的 Proxy 对象，相比 Vue 2 的 Object.defineProperty，具有以下优势：</p>
          <ul>
            <li>原生支持数组响应式</li>
            <li>支持新增属性的响应式</li>
            <li>支持 Map、Set 等集合类型</li>
            <li>更精确的依赖追踪</li>
            <li>更好的性能</li>
          </ul>
          <p>核心原理：</p>
          <ul>
            <li>当访问响应式对象的属性时，会触发 Proxy 的 get 陷阱，进行依赖收集</li>
            <li>当修改响应式对象的属性时，会触发 Proxy 的 set 陷阱，通知依赖更新</li>
            <li>ref 通过包装对象实现响应式，访问 .value 时触发依赖收集和更新通知</li>
          </ul>
          
          <h3>使用场景</h3>
          <h4>ref 的使用场景</h4>
          <ul>
            <li>管理基本类型的响应式数据</li>
            <li>需要在模板中自动解包的场景</li>
            <li>需要作为 props 或从函数返回的场景</li>
            <li>需要解构赋值的场景</li>
          </ul>
          
          <h4>reactive 的使用场景</h4>
          <ul>
            <li>管理复杂的响应式对象</li>
            <li>不需要替换整个对象的场景</li>
            <li>需要直接访问属性的场景</li>
            <li>对象属性较多的场景</li>
          </ul>
          
          <h4>computed 的使用场景</h4>
          <ul>
            <li>计算派生值</li>
            <li>缓存计算结果</li>
            <li>依赖多个响应式数据的场景</li>
          </ul>
          
          <h4>watch 的使用场景</h4>
          <ul>
            <li>需要知道变化前后值的场景</li>
            <li>需要控制监听时机的场景</li>
            <li>需要监听多个数据源的场景</li>
            <li>需要深度监听的场景</li>
          </ul>
          
          <h4>watchEffect 的使用场景</h4>
          <ul>
            <li>自动追踪依赖的副作用</li>
            <li>只关心副作用执行，不关心具体变化值的场景</li>
            <li>初始化时需要执行一次的场景</li>
          </ul>
          
          <h3>常见错误</h3>
          <ul>
          <li>
        <strong>在script中使用 ref 时忘记 .value</strong>
        <p>错误：在 &lt;script setup&gt; 中直接使用 <code>count</code> 而不是 <code>count.value</code></p>
        <p>正确：在模板中 Vue 会自动解包 ref，不需要 .value；但在 &lt;script setup&gt; 中需要使用 .value</p>
      </li>
      <li>
        <strong>直接替换 reactive 对象导致失去响应性</strong>
        <p>错误：<code>state = { count: 1 }</code>（会失去响应式）</p>
        <p>正确：<code>Object.assign(state, { count: 1 })</code> 或使用 ref</p>
      </li>
      <li>
        <strong>深度嵌套对象的性能问题</strong>
        <p>解决方案：使用 shallowReactive 或 shallowRef 减少响应式开销</p>
      </li>
            <li>在 watchEffect 中创建无限更新循环</li>
            <li>过度使用 deep 监听导致性能问题</li>
            <li>混淆 shallowRef 和 ref 的使用场景</li>
        <li>
        <strong>解构响应式对象失去响应性</strong>
        <p>错误：<code>const { count } = state</code>（count 不再是响应式）</p>
        <p>正确：<code>const { count } = toRefs(state)</code>（count 保持响应式）</p>
      </li>
          </ul>
          
          <h3 style="color: red;">注意事项</h3>
          <ul>
            <li>ref 用于基本类型和需要替换整个值的场景，reactive 仅用于复杂对象</li>
            <li>ref 在模板中会自动解包，在 JavaScript 中需要使用 .value</li>
            <li>reactive 返回的是原始对象的代理，不要直接替换整个对象</li>
            <li>computed 返回的是只读的响应式引用，可写计算属性需要同时定义 get 和 set</li>
            <li style="color: red;">watchEffect 会在创建时立即执行一次，然后自动追踪依赖</li>
            <li>使用 toRefs 可以在解构 reactive 对象时保持响应性</li>
            <li>使用 readonly 保护不应被修改的响应式数据</li>
            <li>浅层响应式 API（shallowRef, shallowReactive）可以提高性能，适用于大型对象</li>
            <li>避免在响应式对象中存储非响应式值（如 DOM 元素）</li>
            <li style="color: red;">使用 toRaw 修改原始对象是危险的，会破坏响应式系统的可预测性</li>
            <li style="color: red;">使用 markRaw 对象被修改时，Vue 无法检测到变化，可能导致 UI 不同步</li>
            <li style="color: red;">在大多数情况下，应该通过响应式代理来修改数据，而不是直接操作原始对象</li>
          </ul>
          
          <h3>性能优化</h3>
          <ul>
            <li>对于大型对象，使用 shallowReactive 或 shallowRef 减少响应式开销</li>
            <li>避免在模板中直接使用复杂计算，使用 computed 缓存结果</li>
            <li>合理使用 watch 的 deep 和 immediate 选项</li>
            <li>及时停止不需要的 watchEffect</li>
            <li>使用 readonly 包装不需要修改的响应式对象</li>
          </ul>
          
          <h3>最佳实践</h3>
          <ul>
            <li>优先使用 ref 管理状态，特别是基本类型</li>
            <li>使用 toRefs 解构 reactive 对象，保持响应性</li>
            <li>合理使用 computed 优化计算逻辑</li>
            <li>根据需要选择 watch 或 watchEffect</li>
            <li>使用浅层响应式 API 优化性能</li>
            <li>在组件卸载时清理副作用</li>
            <li>使用 TypeScript 增强类型安全性</li>
          </ul>
        </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, watchEffect } from 'vue'
import { useResApiInteractionStore } from '@/stores/resApiInteraction' 
import {storeToRefs} from 'pinia'
import useAnchor from "@/pages/Hooks/useAnchor.ts";

const { scrollToRef } = useAnchor('v3_ResPonApiId')
const resApiInteractionStore = useResApiInteractionStore()
const {NameApiKey, NameToolKey} = storeToRefs(resApiInteractionStore)

const apiList = reactive([
{name:"ref", desc:"创建响应式引用",id:"refId"},
{name:"reactive", desc:"创建响应式对象",id:"reactiveId"},
{name:"computed", desc:"创建计算属性",id:"computedId"},
{name:"watch", desc:"监听响应式数据变化",id:"watchId"},
{name:"watchEffect", desc:"监听响应式数据变化，立即执行一次",id:"watchEffectId"},
{name:"readonly", desc:"创建只读的响应式对象",id:"readonlyId"},
{name:"shallowReadonly", desc:"创建只读的浅层响应式对象",id:"shallowReadonlyId"},
{name:"shallowRef", desc:"浅层响应式 API，优化性能",id:"shallowId"},
{name:"shallowReactive", desc:"浅层响应式 API，优化性能",id:"shallowId"},
{name:"toRaw", desc:"将响应式对象转换为原始对象",id:"toRawId"},
{name:"markRaw", desc:"将对象标记为原始对象，防止被响应式系统代理",id:"markRawId"},
{name:"toRefs", desc:"将响应式对象转换为响应式引用对象",id:"toRefsId"},
{name:"toRef", desc:"创建单个属性的 ref",id:"toRefId"},
{name:"customRef ", desc:"创建自定义响应式引用",id:"customRefId"},
{name:"isProxy ", desc:" 用于判断一个对象是否是响应式对象的代理。",id:"toolId"},
{name:"isRef ", desc:" 检查值是否为 ref",id:"toolId"},
{name:"isReactive ", desc:"检查对象是否为 reactive",id:"toolId"},
{name:"isReadonly  ", desc:"检查对象是否为 readonly 响应式对象",id:"toolId"},
{name:"unref", desc:"解包 ref 值",id:"toolId"},
])


const vtableData = reactive([
  { 特性: '定义', ref: '创建一个响应式的数据引用，可以包装任意类型', reactive: '创建一个响应式的对象（包括数组、Set、Map等集合类型）' },
  { 特性: '返回值', ref: '返回一个RefImpl对象，通过.value访问值', reactive: '返回一个Proxy代理对象，直接访问属性' },
  { 特性: '模版中使用', ref: '自动解包，模板中无需.value（在模板中直接使用）', reactive: '直接访问属性，无需.value' },
  { 特性: '解构/展开', ref: '使用toRefs保持响应式，否则失去响应式', reactive: '使用toRefs保持响应式，否则失去响应式' },
  { 特性: '适用类型', ref: '​基本类型（string, number, boolean, symbol, bigint）和对象类型', reactive: '仅适用于对象类型（包括数组、集合等）' },
  { 特性: '深层响应式', ref: '是，但嵌套对象会转为reactive', reactive: '是，深层嵌套对象也是响应式' },
  { 特性: '重新赋值', ref: '可以重新赋值整个对象，保持响应式（.value = newValue）', reactive: '不能重新赋值整个对象，会失去响应式（但可以修改属性）' },
  { 特性: '访问方式', ref: '​在JS中需要通过.value访问，在模板中自动解包', reactive: '直接访问属性，无需额外语法' },
])


watchEffect(() => {
  console.log('NameApiKey.value', NameApiKey.value);
  console.log('NameToolKey.value', NameToolKey.value);
  nextTick(() => {
    if(NameApiKey.value){
      scrollToRef(NameApiKey.value)
    }
    if(NameToolKey.value){
      scrollToRef(NameToolKey.value)
    }
  })
})



</script>
<style lang="scss" scoped>
@use "./v3Note.scss";

</style>