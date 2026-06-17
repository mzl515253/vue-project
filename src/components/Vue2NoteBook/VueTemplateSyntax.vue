<template>
  <div class="tab-content">
    <h2>模板语法</h2>
    <h3>定义</h3>
    <p>
      Vue 使用基于 HTML 的模板语法，允许开发者声明式地将 DOM 与 Vue
      实例的数据绑定。
    </p>
    <h3>1. 插值语法：插值表达式（一个表达式会产生一个值）</h3>
    <div class="code-block">
      <pre><code v-prism="'typescript'">
        &lt;div id="root"&gt;
            &lt;!-- 文本插值 双花括号-&gt;
            &lt;p&gt;<span v-pre>源码是：{{ message }} </span> 解析后：  {{ message }}&lt;/p&gt;
            &lt;!-- 表达式 --&gt;
            &lt;p&gt;<span v-pre>源码是：{{ number + 1 }} </span> 解析后： {{ number + 1 }}&lt;/p&gt;
            &lt;p&gt;  <span v-pre>源码是：{{ ok ? 'YES' : 'NO' }} </span> 解析后 ： {{ ok ? 'YES' : 'NO' }}&lt;/p&gt;
        &lt;/div&gt;
        const vm = new Vue({
            el: '#root',
            data() {
                return {
                message: 'Hello Vue!',
                number: 0,
                ok: false
            }
        }
        })
</code></pre>
    </div>
    <h3>2.指令语法：v- 开头</h3>
    <div class="code-block">
    <pre><code v-prism="'typescript'">
&lt;div id="root"&gt;
        &lt;!-- 指令语法 --&gt;
        &lt;!-- 原始 HTML --&gt;
        &lt;div v-html="rawHtml"&gt;&lt;/div&gt;
        &lt;div v-text="rawText"&gt;&lt;/div&gt;
        &lt;div v-if="show"&gt;显示内容&lt;/div&gt;
        &lt;div v-for="(item, index) in items" :key="index"&gt;
        <span v-pre>{{ item && item.name ? item.name : '未知' }}</span>
        &lt;/div&gt;
        &lt;input v-model="message"&gt;
        &lt;button @click="handleClick"&gt;点击&lt;/button&gt;
&lt;/div&gt;
        const vm = new Vue({
            el: '#root',
            data() {
                return {
                rawHtml: '&lt;h1&gt;Hello Vue!&lt;/h1&gt;', //  v-html除了解析html标签，还能获取文本内容，展示在div中
                rawText: 'Hello Vue!',
                show: true,
                items: [
                    {id: '1', name: '张三'},
                    {id: '2', name: '李四'},
                    {id: '3', name: '王五'}
                ],
                message: 'Hello Vue!'
            }
        }
        })
</code></pre>
    </div>
    <h3>简写形式</h3>
    <ul>
        <li><strong>v-bind: （绑定属性）</strong> 简写为 <strong>:</strong></li>
        <li><strong>v-on: （绑定事件）</strong> 简写为 <strong>@</strong></li>
    </ul>
    <h3>底层原理</h3>
    <p>
        Vue 模板会被编译成渲染函数，然后执行渲染函数生成虚拟 DOM，最后通过 diff 算法更新真实 DOM。
    </p>
    <h3>使用场景</h3>
    <p>构建用户界面，实现数据与视图的绑定。</p>
    <h3>常见错误</h3>
    <ul>
      <li>在模板中使用复杂逻辑（应该使用计算属性） </li>
      <li>忘记添加 v-for 的 key: 每个循环项都需要有一个唯一的 key，否则会导致性能问题;
    </li>
      <li>在 v-if 和 v-for 同时使用时的优先级问题: v-for 优先级高</li>
    </ul>
    <h3>注意点</h3>
    <ul>
      <li v-pre>模板表达式只能包含单个表达式: {{ xxx }}</li>
      <li>避免在模板中执行耗时操作，如循环、条件判断等</li>
      <li>使用 v-for 时必须添加唯一的 key</li>
    </ul>
    <h3>总结</h3>
    <pre><code  v-prism="'javascript'">
     Vue模板语法有2大类：
    1.插值语法：
       功能：用于解析标签体内容；如<p>这里就是标签体内容展示区间</p>；
       写法：<span v-pre>{{xxx}}</span>,xxx是js表达式，且可以直接读取到data中的所有属性；

    2.指令语法：
        功能：用于解析标签(包括：标签属性，内容，绑定事件....)
       举例：v-bind:href="xxx",或简写为 ：href="xxx",xxx/同样要写js表达式，且可以直接读取data中的所有属性；
        备注：Vue中有很多指令，且形式都是v-???,此处拿v-bind来举例。
     </code></pre>
  </div>
</template>

<script setup lang='ts'>
import { type PropType } from "vue";

interface ITEMTYPE {
  id: string;
  name: string;
}
defineProps({
  message: {
    type: String,
    default: "默认消息",
  },
  number: {
    type: Number,
    default: 0,
  },
  ok: {
    type: Boolean,
    default: false,
  }
});
</script>

<style lang='scss' scoped>
@use  "./v2Note.scss";
</style>