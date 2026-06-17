<template>
<div class="tab-content">
    <h2>Mixin 混入</h2>
    <h3>定义</h3>
    <ul>
        <li>
            Mixin 是 Vue 提供的一种机制，用于将多个组件的代码合并到一个组件中。
        </li>
        <li>
            混入的代码可以包含组件的属性、方法、事件等。
        </li>
    </ul>
    <h3>代码示例</h3>
    <div class="code-block">
    <pre><code v-prism="'typescript'">
        // 创建一个mixin.js文件，用于定义混入对象
        // 定义一个混入对象
        const myMixin = {
            methods: {
                data() {
                    return {
                        count: 0,
                        msg: '这是一个混入方法'
                    }
                },
                myMethod() {
                    console.log('这是一个混入方法');
                }
            }
        }
        export default myMixin

        // 定义一个组件1
        import myMixin from './mixin.js'
        const MyComponent = {
            mixins: [myMixin],
            template: '<div>这是一个组件</div>'
        }
        // 定义一个组件2
        import myMixin from './mixin.js'
        const MyComponent2 = {
            mixins: [myMixin], // 组件2使用混入对象
            template: '<div>这是一个组件2</div>'
        }

        // 全局注册混入对象，可以在所有组件中使用,在main.js中注册
        import myMixin from './mixin.js'
        Vue.mixin(myMixin)
    </code></pre>
</div>
    <h3 style="color: red;">注意</h3>
    <ol>
        <li>
            混入对象的属性和方法会合并到组件中，如果与组件中的属性和方法冲突，以组件中的属性和方法为主（组件的属性和方法会覆盖混入对象的属性和方法）。
        </li>
        <li>
            如果混入对象中生命周期钩子，不以任何人为主，都要执行。并且混入对象的生命周期钩子的优先级高。
        </li>
    </ol>
</div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>