<template>
<div class="tab-content">
    <h2>插槽</h2>
    <h3>定义</h3>
    <p>
        插槽是Vue中的一种组件通信机制，用于在父组件中定义一个可自定义内容的区域。
        子组件可以将内容插入到父组件的插槽中，实现组件之间的通信。
    </p>
     <h3>代码示例</h3>
    <div class="code-block"> 
        <pre><code v-prism="'typescript'">
    // 父组件
    &lt;template&gt;
        // 父组件中使用子组件
    &lt;div&gt;
        &lt;child&gt;
            // 自定义插槽内容
            &lt;div&gt;自定义默认插槽内容&lt;/div&gt;
            &lt;template v-slot:header&gt;  // 可简写为 #header ,v-slot只能在template中使用，不能在div等其他标签中直接使用
                // 自定义具名插槽内容
            &lt;/template&gt;
            &lt;template #content="{x}"&gt;
                // 自定义作用域插槽内容，x为父组件传递的参数
                &lt;span&gt;x的值为： <span v-pre>{{x}}</span> &lt;/span&gt;
            &lt;/template&gt;
        &lt;/child&gt;
    &lt;/div&gt;
    &lt;/template&gt;
    // child 子组件中使用插槽
    &lt;template&gt;
        &lt;div&gt;
            // 默认插槽
            &lt;slot&gt;默认插槽内容&lt;/slot&gt;
            // 具名插槽
            &lt;slot name="header"&gt;
                // 默认具名插槽内容
            &lt;/slot&gt;
            // 作用域插槽
             &lt;slot name="content"  :x = "100"&gt;
                // 默认具名作用域插槽内容
            &lt;/slot&gt;
        &lt;/div&gt;
    &lt;/template&gt;
    </code></pre>
    </div>
    <h3>使用场景</h3>
    <p>
        插槽可以用于在父组件中自定义子组件的内容，实现组件之间的通信。
        例如，在列表组件中，父组件可以定义一个插槽，子组件可以将列表项的内容插入到插槽中。
    </p>
    <h3>插槽的类型</h3>
    <p>
        插槽的类型包括默认插槽、具名插槽和作用域插槽。
    </p>
    <h3 style="color: red;">注意</h3>
    <p>
        插槽的类型必须与子组件中使用的插槽类型一致，否则会导致错误。
    </p>
    <p>
        插槽的类型可以是默认插槽、具名插槽或作用域插槽。
    </p>
    </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
@use  "./v2Note.scss";
</style>