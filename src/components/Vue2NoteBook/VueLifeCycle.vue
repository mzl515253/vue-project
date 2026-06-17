<template>
  <div class="tab-content">
    <h2>生命周期钩子</h2>
    <h3>定义</h3>
    <p>
      Vue
      实例从创建到销毁的过程中，会触发一系列的生命周期钩子函数，允许开发者在不同阶段执行代码。
    </p>
    <h3>生命周期流程</h3>
    <h4>创建阶段</h4>
    <ul>
      <li><strong>beforeCreate</strong>: 实例刚创建，数据观测和事件配置之前</li>
      <li>
        <strong>created</strong>:
        实例创建完成，数据观测、计算属性、方法、事件回调已配置
      </li>
    </ul>
    <h4>挂载阶段</h4>
    <ul>
      <li><strong>beforeMount</strong>: 挂载开始前，模板已编译</li>
      <li><strong>mounted</strong>: 挂载完成，DOM 已更新</li>
    </ul>
    <h4>更新阶段</h4>
    <ul>
      <li><strong>beforeUpdate</strong>: 数据更新前</li>
      <li><strong>updated</strong>: 数据更新完成，DOM 已重新渲染</li>
    </ul>
    <h4>销毁阶段</h4>
    <ul>
      <li><strong>beforeDestroy</strong>: 实例销毁前</li>
      <li><strong>destroyed</strong>: 实例销毁完成</li>
    </ul>
    <h3>代码示例</h3>
    <div class="code-block">
      <pre><code v-prism="'typescript'">
new Vue({
  data: function() {
    return {
      message: 'Hello'
    }
  },
  beforeCreate: function() {
    console.log('beforeCreate: 实例刚创建')
  },
  created: function() {
    console.log('created: 实例创建完成')
    // 可以访问数据，但 DOM 还未挂载
  },
  beforeMount: function() {
    console.log('beforeMount: 挂载开始前')
  },
  mounted: function() {
    console.log('mounted: 挂载完成')
    // 可以访问 DOM 元素
  },
  beforeUpdate: function() {
    console.log('beforeUpdate: 数据更新前')
  },
  updated: function() {
    console.log('updated: 数据更新完成')
  },
  beforeDestroy: function() {
    console.log('beforeDestroy: 实例销毁前')
  },
  destroyed: function() {
    console.log('destroyed: 实例销毁完成')
  }
})</code></pre>
    </div>
    <h3>使用场景</h3>
    <ul>
      <li><strong>created</strong>: 发起网络请求，初始化数据</li>
      <li><strong>mounted</strong>: 操作 DOM，初始化第三方库</li>
      <li><strong>beforeDestroy</strong>: 清理定时器，解绑事件</li>
    </ul>
    <h3>注意点</h3>
    <ul>
      <li style="color: red;">不要在 updated 中修改数据，会导致无限循环</li>
      <li style="color: red;">在 beforeDestroy 中一定要清理定时器和事件监听器</li>
      <li style="color: red;">在生命周期钩子中的 this 指向 Vue 实例 </li>
    </ul>
    <h3>created 和 mounted 的区别</h3>
    <p> 
      <strong>created</strong>:
      实例创建完成，数据观测、计算属性、方法、事件回调已配置
      但 DOM 还未挂载。
    </p>
    <p>
      <strong>mounted</strong>:
      挂载完成，DOM 已更新。
      可以访问 DOM 元素，进行操作。
    </p>
    <h3>在created 和 mounted 去请求数据，有什么区别？</h3>
    <p>
      <strong>created</strong>:
      数据观测、计算属性、方法、事件回调已配置，但 DOM 还未挂载。
      可以在 created 中发起网络请求，初始化数据。
    </p>
    <p>
      <strong>mounted</strong>:
      DOM 已更新，可以访问 DOM 元素。
      可以在 mounted 中操作 DOM，初始化第三方库。
    </p>
    <h3 style="color: red;">注意</h3>
    <ul>
      <li>1.一般用created较多，请求数据时，一般用created，而不是mounted;否则可能会出现闪屏的问题，而created里则不会</li>
      <li>2.如果请求的数据对DOM有影响，就使用created，如果对DOM没有影响，可以放在mounted中</li>
    </ul>
    <h3>父子组件生命周期钩子执行顺序</h3>
    <ol>
        <li><strong>父组件创建阶段</strong>:（从父组件开始创建，然后创建子组件，最后子组件挂载完成，父组件再挂载完成）</li>
        <ul>
            <li style="color: #3399ff;">父组件：beforeCreate</li>
            <li style="color: #3399ff;">父组件：created</li>    
            <li style="color: #3399ff;">父组件：beforeMount</li>
            <li style="color: #339900;">子组件：beforeCreate</li>
            <li style="color: #339900;">子组件：created</li>    
            <li style="color: #339900;">子组件：beforeMount</li>
            <li style="color: #339900;">子组件：mounted</li>
            <li style="color: #3399ff;">父组件：mounted</li>
        </ul>
        <li><strong>父组件更新阶段</strong>:（当父组件的数据变化触发更新时，先触发父组件的更新钩子，然后触发子组件的更新钩子，最后子组件更新完成，父组件更新完成）</li>
        <ul>
            <li style="color: #3399ff;">父组件：beforeUpdate</li>
            <li style="color: #339900;">子组件：beforeUpdate</li>
            <li style="color: #339900;">子组件：updated</li>
            <li style="color: #3399ff;">父组件：updated</li>
        </ul>
        <li><strong>父组件销毁阶段</strong>:（当父组件开始销毁时，先触发父组件的销毁钩子，然后触发子组件的销毁钩子，最后子组件销毁完成，父组件销毁完成）</li>
        <ul>
            <li style="color: #3399ff;">父组件：beforeDestroy</li>
            <li style="color: #339900;">子组件：beforeDestroy</li>
            <li style="color: #339900;">子组件：destroyed</li>
            <li style="color: #3399ff;">父组件：destroyed</li>
        </ul>
    </ol>
    </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>