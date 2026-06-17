<template>
<div class="tab-content">
          <h2>过渡与动画</h2>
          <h3>定义</h3>
          <p>
            Vue 提供了内置的过渡系统，用于在元素插入、更新或移除时添加动画效果。
          </p>
          <h3>单元素过渡</h3>
          <div class="code-block">
            <pre><code v-prism="'typescript'">&lt;transition name="fade" appear&gt;
  &lt;div v-if="show"&gt;内容&lt;/div&gt;
&lt;/transition&gt;
   // appear 属性：在组件挂载时立即应用过渡效果
&lt;style&gt;
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
&lt;/style&gt;</code></pre>
          </div>
          <h3>列表过渡</h3>
          <div class="code-block">
            <pre><code v-prism="'typescript'">&lt;transition-group name="list" tag="ul" appear&gt;
  &lt;li v-for="(item, index) in items" :key="index"&gt;
    <span v-pre>{{ item && item.name ? item.name : '未知' }}</span>
  &lt;/li&gt;
&lt;/transition-group&gt;

&lt;style&gt;
.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
&lt;/style&gt;</code></pre>
          </div>
          <h3>过渡类名</h3>
          <ul>
            <li><strong>v-enter</strong>：进入开始状态</li>
            <li><strong>v-enter-active</strong>：进入过渡状态</li>
            <li><strong>v-enter-to</strong>：进入结束状态</li>
            <li><strong>v-leave</strong>：离开开始状态</li>
            <li><strong>v-leave-active</strong>：离开过渡状态</li>
            <li><strong>v-leave-to</strong>：离开结束状态</li>
          </ul>
          <h3>使用场景</h3>
          <ul>
            <li>页面元素的显示/隐藏动画</li>
            <li>列表的添加/删除动画</li>
            <li>路由切换动画</li>
            <li>表单验证动画</li>
          </ul>
          <h3>注意点</h3>
          <ul>
            <li>使用 &lt;transition-group&gt; 时必须为子元素添加唯一的 key 属性，否则会导致性能问题。</li>
            <li>可以使用第三方动画库如 Animate.css 来扩展过渡效果:
            <a href="https://animate.style/" target="_blank">Animate.css</a>
            </li>
            <li>对于复杂动画，可以使用 JavaScript 钩子函数 来实现自定义动画效果</li>
          </ul>
        </div>
</template>


<style lang='scss' scoped>
@use  "./v2Note.scss";
</style>