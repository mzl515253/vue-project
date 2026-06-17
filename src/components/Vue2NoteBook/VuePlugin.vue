<template>
<div class="tab-content">
    <h2>自定义插件</h2>
    <h3>定义</h3>
    <p>自定义插件是一种在Vue中使用自定义功能的方式，通过定义一个对象，该对象包含一个install方法，用于在Vue实例中安装插件。</p>
    <h3>功能</h3>
    <p>自定义插件的主要功能是扩展Vue实例的功能，增强Vue实例的性能或提供新的功能。</p>
    <h3>代码示例</h3>
    <div class="code-block">
        <pre><code v-prism="'typescript'">
    //创建一个plugin.js文件  自定义插件
    export default {
        install(Vue,options) { //Vue: Vue实例的构造函数；  options：插件的配置项可传可不传
            // 插件的代码
            // 1. 添加全局过滤器
            Vue.filter('upperCase', function(value) {
                return value.toUpperCase()
            })
            // 2. 添加全局方法和属性
            Vue.prototype.$msg = window.alert('hello vue')
            Vue.prototype.msgtxt = 'hello vue2'
            // 3. 添加全局混入
            Vue.mixin({
                methods: {
                    msg() {
                        window.alert('hello vue')
                    }
                }
            })
        }
    }

    // 在main.js中引入使用插件
    // 1. 引入插件
    import plugin from './plugin.js'
    // 2. 使用插件
    Vue.use(plugin)
    // 如果有其他参数需要传递
    Vue.use(plugin, data) // data是插件的配置项可写可不写
        </code></pre>
        </div>
        </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>