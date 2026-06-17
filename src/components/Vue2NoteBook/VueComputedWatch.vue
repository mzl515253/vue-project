<template>
  <div class="tab-content">
    <h2>计算属性与监听器</h2>
    <h3>计算属性computed</h3>
    <h4>定义</h4>
    <p>
      基于响应式依赖进行缓存的属性，只有一上来或依赖发生变化时才会重新计算。最终返回的结果是缓存的结果。
    </p>
    <h4>语法</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">
const vm = new Vue({
        data() {
            return {
                firstName: '张',
                lastName: '三'
        },
        computed: {
         // 函数写法
        fullName() {
            return this.firstName + ' ' + this.lastName
        },
  // 完整写法：直接修改计算属性时可使用该写法 带 setter 的计算属性
        fullName: {
            get() {
                eturn this.firstName + ' ' + this.lastName
        },
            set(newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[1]
            }
          }
        }
     }
})
</code></pre>
    </div>
    <h4>底层原理</h4>
    <p>
      计算属性会收集依赖，当依赖变化时重新计算，并缓存结果。最终返回的结果是缓存的结果。
    </p>
    <p>计算属性的 setter 会触发依赖的重新计算，从而更新缓存结果。</p>
    <h4>计算属性是如何实现缓存的</h4>
    <ul>
      <li>计算属性的 getter 会检查缓存结果是否过期</li>
      <li>如果过期，会重新计算并更新缓存结果</li>
      <li>如果未过期，会直接返回缓存结果</li>
      <li>
        基于依赖追踪和惰性求值实现的。只有当其依赖的响应式数据发生变化时，才会重新计算，否则直接返回缓存值。
      </li>
      <li>通过 Watcher 的 dirty 标记实现</li>
      <li>如果 dirty 标记为 true，会重新计算并更新缓存结果</li>
      <li>如果 dirty 标记为 false，会直接返回缓存结果</li>
    </ul>
    <h3>监听器watch</h3>
    <h4>定义</h4>
    <p>
      监听数据变化并执行副作用。当响应式数据发生变化时，会触发监听器的回调函数。
    </p>
    <h4>语法</h4>
    <div class="code-block">
      <pre><code v-prism="'typescript'">
        const vm = new Vue({
        data() {
            return {
                message: 'hello vue',
                user: {
                    name: '张三',
                    age: 18,
                    sex: '男'
                }
        },
watch: {
  // 基本用法
  message(newVal, oldVal) {
    console.log('消息变化:', newVal, oldVal)
  },
  // 深度监听
  user: {
    handler(newVal, oldVal) {
      console.log('用户信息变化:', newVal, oldVal)
    },
    deep: true,
    immediate: true
  }
}
 }
})
</code></pre>
    </div>
    <h3>计算属性computed vs 监听器 watch</h3>
    <ul>
        <li><strong>computed</strong>：有缓存，依赖变化时才重新计算,最终返回的结果是缓存的结果。</li>
        <li><strong>watch</strong>：每次调用都会重新执行,不会缓存结果。</li>
        <li><strong>区别</strong>：
        <br> 1.computed能完成的功能，watch都能完成
        <br>2.watch能完成的功能，computed不一定能完成，例如watch能进行异步操作。
        </li>
        <li><strong>注意</strong>：
        <br>1.computed是返回一个响应式的值，而监听器watch是监听数据变化并执行副作用。
        <br>2.computed是缓存的，监听器watch不是缓存的。
        </li>
        <li><strong>两个重要小原则：</strong>
        <br>1.所有被vue管理的函数，最好写成普通函数，这样this的指向才是vm 或组件实例对象。
        <br>2.所有不被vue所管理的函数(如：定时器的回调函数，ajax的回调函数，Promise的回调函数等)，最好写成箭头函数；
            这样的this指向vm 或组件实例对象；
        </li>
    </ul>
    <h3>使用场景</h3>
    <ul>
      <li><strong>计算属性</strong>：需要基于其他数据计算得出的值 ，例如：全名、格式化日期等。</li>
      <li><strong>监听器</strong>：需要执行异步操作或复杂的副作用，例如：发送请求、更新DOM等。</li>
    </ul>
    <h3>注意点</h3>
    <ul>
      <li>计算属性的 getter 应该是纯函数，不要修改状态 ，例如：计算用户年龄、格式化日期等。</li>
      <li>监听器中避免无限循环 ，例如：在监听器中修改会导致无限循环。</li>
      <li>复杂的逻辑优先使用计算属性 ，例如：计算用户年龄、格式化日期等。</li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>