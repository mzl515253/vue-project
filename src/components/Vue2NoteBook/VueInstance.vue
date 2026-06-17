<template>
  <div class="tab-content">
    <h2>Vue 实例</h2>
    <h3>定义</h3>
    <p>Vue 实例是 Vue 应用的根对象，是使用 Vue 的起点。</p>
    <h3>语法</h3>
    <div class="code-block">
      <pre><code   v-prism="'typescript'">
    //  准备好一个容器
        &lt;div id="root"&gt;hello,{{message}} &lt;/div&gt;

    //  创建vue实例
    const vm = new Vue({
        el: '#root',        // 挂载点：el用于指当前vue实例 为哪个容器服务，通常为css选择器字符
        data: {
        message: 'Hello Vue!'
        },
    methods: {
    greet: function() {
        console.log(this.message)
    }
    }
})
</code></pre>
    </div>
    <h3>核心配置项</h3>
    <ul>
      <li>
        <strong>el</strong>: 挂载点，指定 Vue 实例管理的 DOM 元素;
        <br />
        <span style="font-weight: bold; color: red">el两种写法：</span><br />
        <span style="font-weight: bold">1. el: '#root'</span> <br />
        <span style="font-weight: bold"
          >2. const vm = new Vue({}) &nbsp;&nbsp; vm.$mount('#root')</span
        >
      </li>
      <li>
        <strong>data</strong>: 数据对象，存储响应式数据<br />
        <span style="font-weight: bold; color: red">data两种写法：</span><br />
        <span style="font-weight: bold"
          >1. data() { return { message: 'Hello Vue!' } }</span
        >
        <br />
        <span style="font-weight: bold"
          >2. data:{ message: 'Hello Vue!' } ---->
          不常用，组件中不推荐使用，实际项目中多组件调用其中的数据，当一个数据发生变化，会影响到其他所有组件的数据</span
        >
      </li>
      <li><strong>methods</strong>: 方法对象，定义实例方法</li>
      <li><strong>computed</strong>: 计算属性对象</li>
      <li><strong>watch</strong>: 监听器对象</li>
      <li><strong>filters</strong>: 过滤器对象(用于格式化数据建议使用管道符|,vue3中已废弃)</li>
      <li><strong>生命周期钩子</strong>: 如 created、mounted 等</li>
    </ul>
    <h3>底层原理</h3>
    <p>
      Vue 实例通过 Object.defineProperty() 对 data
      中的属性进行劫持，实现响应式系统。当数据变化时，会触发依赖更新，重新渲染视图。
    </p>
    <h3>使用场景</h3>
    <p>作为应用的根组件，或者作为大型应用中的局部组件。</p>
    <h3>常见错误</h3>
    <ul>
      <li>el 挂载点不存在</li>
      <li>
        data 不是函数（在组件中）
        <span style="color: red"
          >注意：如果每个组件都使用同一个data对象，那么当一个组件改变了data的值，其它组件的data也会被改变，这显然是不合理的</span
        >
      </li>
      <li>this 指向错误: 在方法中，this 指向的是 window 对象，而不是 Vue 实例对象</li>
    </ul>
    <h3 style="color: red">注意点</h3>
    <ul>
      <li>Vue 实例一旦创建，不能动态更改 el 选项</li>
      <li>在组件中，data 必须是函数，确保每个实例有独立的数据副本</li>
      <li>实例创建后，可通过 vm.$data 访问数据，通过 vm.$el 访问 DOM 元素；$el是Vue实例的根DOM元素，指向实例挂载的DOM节点。</li>
    </ul>

    <h3>初始Vue总结</h3>
    <ol>
      <li>
        想让vue工作，就必须创建一个vue 实例，且要传入一个配置对象(如：el,data)；
      </li>
      <li v-pre>
        root容器里代码依然符合html规范，只不过混入了一些特殊的vue语法(如：{{}})；
      </li>
      <li>root 容器里的代码被称为【vue模板】；</li>
      <li>解析流程：</li>
      <ul>
        <li v-pre>
          如：先有的容器如“ &lt;div id="root"&gt;{{ message }}
          &lt;/div&gt; ”，然后有的vue实例如：new vue({})，
        </li>
        <li v-pre>
          当vue实例开始工作的时候，就把整个容器拿过来，之后解析容器中有没有自己设计的特殊语法：如{{}}；
        </li>
        <li v-pre>如果有就会在data中寻找对应的属性名，并渲染对应的属性值；</li>
        <li v-pre>
          作用：<br />
          为vue提供模板； <br />
          解析模板，把vue的工作成果放在对应位置上；
        </li>
      </ul>
      <li>vue 实例和容器是一一对应的；</li>
      <li>真实开发中只有一个vue实例，并且会配合着组件一起使用；</li>
      <li v-pre>
        {{ xxx }}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；
      </li>
      <li>
        一旦data中的数据发生变化，那么模板(页面)中用到的该数据的地方也会自动更新；
      </li>

      <li style="color: red">注意区分：js表达式 和 js 代码（语句）</li>
      <ul>
        <li>
          1.表达式（特殊的js代码/
          特殊的js语句）：一个表达式会产生一个值，可以放在任何一个需要的位置
          建立代码没毛病的基础上
        </li>
        <li>(1).a</li>
        <li>(2).加法运算表达式：a+b</li>
        <li>(3). 函数调用表达式：demo(1)</li>
        <li>(4).三目表达式：x===y ? 'a' : 'b'</li>
        <li>2.js代码(语句)，控制代码的走向：</li>
        <li>(1).判断语句（控制代码走不走）：if(){}</li>
        <li>(2).循环语句（控制代码走几次）：for(){}</li>
      </ul>
    </ol>
  </div>
</template>

<script setup lang='ts'>
defineProps(["message"]);
</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>