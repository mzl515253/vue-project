<template>
    <div class="tab-content">
          <h2>新的内置组件</h2>
          
          <h3>定义</h3>
          <p>Vue 3 引入的新内置组件Fragment</p>
          
          <h3>作用</h3>
          <p>提供了更多的组件化能力，解决了之前版本的一些问题。</p>
          
          <h3>效果</h3>
          <p>更灵活、更强大的组件系统，更好的用户体验。</p>
          
          <h3>语法</h3>
          
          <h4>Fragment</h4>
          <div class="code-block">
            <pre><code  v-prism="'typescript'">&lt;template&gt;

    &lt;h2&gt;Fragment 示例&lt;/h2&gt;
    &lt;p&gt;不需要根元素&lt;/p&gt;
    &lt;div&gt;多个顶级元素&lt;/div&gt;
&lt;/template&gt;</code></pre>
          </div>
          
          <h3>底层原理</h3>
          <p>这些新组件基于 Vue 3 的编译系统和运行时系统，提供了更强大的组件化能力。</p>
          
          <h3>案例说明</h3>
          <p>使用 Fragment 避免不必要的 DOM 元素，使用 Teleport 处理模态框，使用 Suspense 处理异步组件。</p>
          
          <h3>使用场景</h3>
          <ul>
            <li>Fragment：需要多个顶级元素的组件</li>
          </ul>
          
          <h3>常见错误</h3>
          <ul>
            <li>Fragment 使用不当</li>
          </ul>
          
          <h3>注意点</h3>
          <ul>
            <li>Fragment 可以使用 &lt;&gt;&lt;/&gt; 或 &lt;template&gt;&lt;/template&gt;</li>
          </ul>
        </div>
</template>

<style lang="scss" scoped>
@use "./v3Note.scss";
</style>