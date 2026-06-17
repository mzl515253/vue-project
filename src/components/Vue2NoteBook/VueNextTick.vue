<template>
  <div class="tab-content">
    <h2>nextTick 机制</h2>
      <h3>定义：nextTick 是 Vue 提供的一个方法，用于在 DOM 更新完成后执行回调函数。</h3>
      <h3>作用：nextTick 可以确保在 DOM 更新完成后执行回调函数，避免在 DOM 更新前执行回调函数。</h3>
      <h3>使用场景：在数据变化后，需要等待DOM更新完成时使用</h3>
     
      <h3>语法示例：</h3>
      <div class="code-block">
      <pre><code v-prism="'typescript'">
假设在Vue组件的 methods中定义了一个方法，其中使用了 this.$nextTick：
methods: {
  updateMessage() {
    this.message = '更新后的消息'
    // 使用普通函数
    this.$nextTick(function() {
      console.log(this.message) // 这里的 this 指向 Vue 实例
    })
    // 使用箭头函数
    this.$nextTick(() => {
      console.log(this.message) // 箭头函数没有自己的this，所以会捕获到外部updateMessage函数的this，也就是Vue实例
    })
  }
}
但是，如果你在Vue组件的生命周期钩子（如 created）中，使用箭头函数也是类似的：

created() {
  this.$nextTick(() => {
    console.log(this) // 箭头函数捕获created钩子的this，即Vue实例
  })
}
所以，可以使用箭头函数，但需要确保箭头函数所捕获的 this是你期望的Vue实例

全局写法
Vue.nextTick(() => {
    console.log(this) // 箭头函数捕获全局this，即Vue实例
  })


在Vue2.1.0+
// ✅ 正确：不传递回调函数时返回Promise
this.$nextTick().then(() => {
  console.log('DOM更新完成');
});

// 或
Vue.nextTick().then(() => {
  console.log('全局nextTick完成');
});

// ❌ 这种方式不返回Promise
const promise = this.$nextTick(() => {
  console.log('回调执行');
});
console.log(promise);  // undefined

// ❌ 错误：不能链式调用
this.$nextTick(() => {
  console.log('回调1');
}).then(() => {  // 报错：TypeError: Cannot read properties of undefined
  console.log('回调2');
});
      </code></pre>
      </div>
       <h3 style="color: red;">注意：</h3>
      <ul>
        <li>1. Vue2.1.0+ 以后的版本 this.$nextTick() 或 Vue.nextTick()方法返回的是 Promise 对象，你可以使用 then 方法来处理 nextTick 执行后的操作。</li>
      </ul>
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>