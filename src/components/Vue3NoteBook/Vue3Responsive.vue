<template>
  <div class="tab-content">
    <h2>响应式系统</h2>

    <h3>定义</h3>
    <p>Vue3 的响应式系统是其核心特性之一，它通过使用 ES6 的 Proxy 对象来替代 Vue2 中的 Object.defineProperty，提供了更强大的响应式能力。下面我们将从以下几个方面详细说明：</p>
    <ul>
      <li>核心原理：Proxy 和 Reflect</li>
      <li>响应式 API：reactive, ref, computed, watch, watchEffect,shallowRef,shallowReactive,readonly,shallowReadonly,customRef ,unref</li>
      <li>响应式工具：toRef, toRefs,toRaw,markRaw, isProxy, isReactive, isRef, isReadonly</li>
      <li>进阶使用：响应式原理、副作用函数、依赖收集与触发</li>
      <li>与 Vue2 响应式系统的比较</li>
    </ul>
    <ol>
      <li><span style="font-weight: bold;margin-top: 15px;color: #339900;">核心原理：Proxy 和 Reflect</span>  <br>
        <ul>
          <li>1.1 reactive</li>
          <li>reactive用于创建响应式对象，它返回一个对象的 Proxy 代理，可以拦截对该对象的各种操作。</li>
            <pre><code  v-prism="'typescript'">
// 模拟Vue3中实现响应式--Proxy代理对象， Reflect反射对象
// Vue 3 内部实现简化
function reactive(obj) {
  // 已经是代理则直接返回
  if (isReactive(obj)) return obj
  
  // 创建代理
  const proxy = new Proxy(obj, {
    get(target, key, receiver) {

      track(target, key)
      const res = Reflect.get(target, key, receiver)
      
      // 如果是对象，且不是原始类型，则递归创建响应式
      if (typeof res === 'object' && res !== null) {
        // 这里返回的可能是缓存或新创建的响应式代理
        return reactive(res)
      }
      console.log('有人读取了obj身上的属性');
      
      return res
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
        console.log(`有人修改/追加(新增)了obj身上的${key}属性和值是${value}` );
      
      // 设置值到源对象
      const result = Reflect.set(target, key, value, receiver)
      
      // 触发更新
      if (result && value !== oldValue) {
        trigger(target, key)
      }

      return result
    },
      deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
        console.log(`有人删除了obj身上的${key}属性` );
      
      trigger(target, key)
      return result
    }
  })
  
  return proxy
}

/*
 * Vue3中响应式实现的原理：
 *  通过Proxy(代理对象)， 拦截对象中任意属性变化， 包括： 属性值的读写、属性的添加、属性的删除等
 *  通过Reflect(反射对象)： 对源对象的属性进行操作
 */

Vue3 中的 reactive函数就是基于这样的原理，但更加复杂，它处理了数组、对象嵌套、以及一些边界情况。
            </code></pre>
            <li>1.2 副作用函数和依赖收集</li>
            <li style="font-weight: bold;">Vue3 通过副作用函数（effect）来跟踪响应式数据的变化。当副作用函数中使用到响应式数据时，会进行依赖收集，将副作用函数和响应式数据关联起来。当数据变化时，触发相关的副作用函数重新执行。</li>
        </ul>
      </li>
      <li><span style="font-weight: bold;margin-top: 15px;color: #339900;">响应式 API：ref,reactive,computed, watch, watchEffect,shallowRef,shallowReactive,readonly,shallowReadonly,customRef,unref</span>  <br>
        <ul  class="toApiTag">
          <li v-for="item in resApiList" :key="item.name"  @click="toApiDetail(item.id)">
              <span style="font-weight: bold;margin-right: 15px;">{{item.name}}:</span> {{item.desc}}
          </li>
          </ul>
      </li>
      <li><span style="font-weight: bold;margin-top: 15px;color: #339900;">响应式工具：toRef, toRefs,toRaw,markRaw, isProxy, isReactive, isRef, isReadonly</span>  <br>
        <ul  class="toApiTag">
          <li v-for="item in resToolList" :key="item.name"  @click="toToolDetail(item.id)">
              <span style="font-weight: bold;margin-right: 15px;">{{item.name}}:</span> {{item.desc}}
          </li>
        </ul>
      </li>
    </ol>


    <h3>底层原理</h3>
    <p>Vue 3 使用 Proxy 代替了 Vue 2 的 Object.defineProperty()，可以更全面地拦截对象操作，包括：</p>
    <ul>
      <li>属性的读取 (get)</li>
      <li>属性的设置 (set)</li>
      <li>属性的添加 (set)</li>
      <li>属性的删除 (deleteProperty)</li>
    </ul>
    <p>通过依赖收集和触发机制，实现数据变化时的自动更新：</p>
    <ol>
      <li>当访问响应式数据时，触发 get 陷阱，进行依赖收集</li>
      <li>当修改响应式数据时，触发 set 陷阱，通知相关依赖更新</li>
      <li>Vue3 使用一个全局的 targetMap来存储每个响应式对象和其依赖的映射。每个响应式对象的每个属性都有一个依赖集合（Set），存储依赖于该属性的副作用函数（effect）。</li>
      <li>当读取属性时，将当前的 effect 添加到依赖集合中；当设置属性时，从依赖集合中取出所有的 effect 并执行。</li>
    </ol>

  <h3>进阶原理</h3>
  <ul>
    <li>reactive：利用 Proxy 拦截对象操作，在 get 时收集依赖，在 set 时触发更新。</li>
    <li>ref：通过一个对象包装值，利用对象的 get 和 set 拦截，同样进行依赖收集和触发。</li>
    <li>effect：用于创建副作用函数，它会记录当前正在运行的 effect，以便在 get 拦截中收集。</li>
  </ul>
    <h3>与 Vue2 响应式系统的比较</h3>
      <el-table :data="vtableData">
        <el-table-column label="特性" prop="特性" />
        <el-table-column label="Vue2" prop="Vue2" />
        <el-table-column label="Vue3" prop="Vue3" />
      </el-table>
<h4>Vue3 的 Proxy 实现可以拦截更多操作，如添加属性、删除属性、数组索引修改等，而且无需像 Vue2 那样递归遍历对象的所有属性，因此性能更好，并且可以处理动态添加的属性。</h4>
    <h3>总结</h3>
    <h4>
      Vue3 的响应式系统通过 Proxy 和 Reflect 提供了更强大、更灵活的响应式能力，同时保持了良好的性能。新的响应式 API（如 reactive、ref、computed、watchEffect 等）使得状态管理更加灵活，并且与组合式 API 结合，使得代码组织更加清晰。
      </h4>
      <p>
        使用 Vue3 的响应式系统时，需要注意：
      </p>
    <ul>
      <li>使用 reactive处理对象和数组，使用 ref处理基本类型或需要引用的值。</li>
      <li>使用 computed创建计算属性，避免在模板中写复杂逻辑。</li>
      <li>使用 watch和 watchEffect处理副作用，注意清理副作用以避免内存泄漏。</li>
      <li>利用 toRefs解构响应式对象，以保持响应性。</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useResApiInteractionStore } from '@/stores/resApiInteraction'  

const {setNameToolKey,setNameApiKey} = useResApiInteractionStore()

// 响应式系统比较数据
const vtableData = [
  { 特性: '实现方式', Vue2: 'Object.defineProperty', Vue3: 'Proxy' },
  { 特性: '数组响应式', Vue2: '需要重写数组方法', Vue3: '直接代理数组，无需重写方法' },
  { 特性: '对象属性', Vue2: '需要预先定义属性', Vue3: '可以监听动态添加和删除的属性，无需预先定义' },
  { 特性: '性能', Vue2: '递归转换对象每个属性', Vue3: '按需转换，惰性代理' },
  { 特性: '集合类型', Vue2: '不支持Map、Set等', Vue3: '支持Map、Set、WeakMap、WeakSet' },
]
// 响应式系统 API 列表
const resApiList = reactive([
  {id:"refId", name: 'ref', desc: '用于创建响应式的基本类型和对象，返回一个带有 .value 属性的响应式对象。' },
  {id:"reactiveId", name: 'reactive', desc: ' 用于创建响应式对象，只能用于对象（包括数组和集合类型）。返回一个代理对象，该代理对象是深响应式的。' },
  {id:"computedId", name: 'computed', desc: '用于创建计算属性，基于响应式数据返回一个新的响应式引用。计算属性具有缓存，只有依赖的响应式数据变化时才会重新计算。' },
  {id:"watchId", name: 'watch', desc: '用于监听响应式数据的变化，并在变化时执行回调函数。可以指定监听的数据源和回调函数，以及配置选项（如立即执行、深度监听等）。' },
  {id:"watchEffectId", name: 'watchEffect', desc: '立即执行传入的函数，并响应式地追踪其依赖，并在依赖变更时重新运行该函数。它返回一个停止监听函数.' },
  {id:"shallowId", name: 'shallowRef', desc: '用于创建浅响应式引用，不会递归响应式化对象的属性。' },
  {id:"shallowId", name: 'shallowReactive', desc: '用于创建浅响应式对象，不会递归响应式化对象的属性。' },
  {id:"readonlyId", name: 'readonly', desc: '用于创建只读响应式对象，不能直接修改对象的属性。' },
  {id:"shallowReadonlyId", name: 'shallowReadonly', desc: '用于创建浅只读响应式对象，不会递归响应式化对象的属性。' },
  {id:"customRefId", name: 'customRef', desc: '用于创建自定义响应式引用，可以自定义 get 和 set 操作。即，自定义响应式数据的访问和修改。' },
  {id:"toolId", name: 'unref', desc: '用于获取响应式引用的原始值，而不是响应式引用本身。' },
])
// 响应式系统 API 工具 列表
const resToolList = reactive([
  {id:"toRefId", name:'toRef', desc:'用于创建响应式引用，将响应式数据绑定到组件的属性或方法上。'},
  {id:"toRefsId", name: 'toRefs', desc: '用于将响应式对象转换为响应式引用对象，方便在模板中使用。' },
  {id:"toRawId", name: 'toRaw', desc: '用于将响应式对象转换为原始对象，移除响应式包装。' },
  {id:"markRawId", name: 'markRaw', desc: '用于将一个对象标记为原始对象，防止被响应式系统包裹。' },
  {id:"toolId", name: 'isProxy', desc: '用于判断一个对象是否是响应式对象的代理。' },
  {id:"toolId", name: 'isReactive', desc: '用于判断一个对象是否是响应式对象。' },
  {id:"toolId", name: 'isRef', desc: '用于判断一个对象是否是响应式引用。' },
  {id:"toolId", name: 'isReadonly', desc: '用于判断一个对象是否是只读响应式对象。' },
])


function toToolDetail(name: string) {
  console.log(name)
  setNameToolKey(name)
  setNameApiKey('')
}

function toApiDetail(name: string) {
  console.log(name)
  setNameApiKey(name)
  setNameToolKey('')
}
</script>

<style lang="scss" scoped>
@use './v3Note.scss';
</style>