<template>
   <div class="tab-content">
          <h2>组件化开发</h2>
          <h3>定义</h3>
          <p>
            组件是 Vue 中可复用的 UI
            单元，允许开发者将页面拆分为独立的、可重用的部分。
            组件即：局部功能代码和资源的集合
          </p>
          <h3>组件创建</h3>
              <p>
                组件的创建可以使用 Vue.component 方法或 Vue.extend 方法,
                两者都可以创建自定义组件。
              </p>
          <h3>组件注册</h3>
          <h4>全局注册</h4>
          <div class="code-block">
            <pre><code v-prism="'typescript'">Vue.component('my-component', {
  template: '&lt;div&gt;这是一个全局组件&lt;/div&gt;',
  props: ['message'],
  data: function() {
    return {
      count: 0
    }
  }
})</code></pre>
          </div>
          <h4>局部注册</h4>
          <div class="code-block">
            <pre><code v-prism="'typescript'">new Vue({
  components: {
    'my-component': {
      template: '&lt;div&gt;这是一个局部组件&lt;/div&gt;'
    }
  }
})</code></pre>
          </div>
         <h3>组件的嵌套</h3>
         <p>
            组件的嵌套是指在一个组件中包含其他组件。
         </p>
          <h4>代码示例</h4>
          <div class="code-block">
            <pre><code v-prism="'typescript'">// app中使用学校组件
&lt;div&gt;
  &lt;school&gt;&lt;/school&gt;
&lt;/div&gt;

// 创建学校组件--父组件
const school = Vue.extend({
    template: '&lt;div&gt;这是一个学校组件&lt;/div&gt;
      &lt;child-component&gt;&lt;/child-component&gt;
    ',
    components: {
        'child-component': 'child-component'
    }
})


// 子组件
Vue.component('child-component', {
  template: '&lt;div&gt;这是一个子组件&lt;/div&gt;
  &lt;grand-child-component&gt;&lt;/grand-child-component&gt;
  ',
  components: {
    'grand-child-component': 'grand-child-child-component'
  }

})

// 孙组件
Vue.component('grand-child-component', {
  template: '&lt;div&gt;这是一个孙子组件&lt;/div&gt;'
})
</code></pre>
          </div>


          <h3>组件通信</h3>

          <h4>父子组件通信</h4>
          <!-- props 向下传递 -->
          <p><strong>props 向下传递</strong></p>
          <div class="code-block">
            <pre><code v-prism="'typescript'">// 父组件
&lt;child-component :message="parentMessage"&gt;&lt;/child-component&gt;

// 子组件
Vue.component('child-component', {
  props: ['message'],
  template: '&lt;div&gt; <span v-pre>{{ message }}</span> &lt;/div&gt;'
})
// props三种写法：
// 只接收：props: ['message','number', 'ok']
// 限制类型：props: {
//     message:String
//     number: Number,
//     ok:Boolean
//   }
// 限制类型、必要性、默认值：props:{
//     message:{
//         type:String,
//         default:'默认消息'
//     },
//     number:{
//         type:Number,
//         default:0
//     },
//     ok:{
//         type:Boolean,
//         required:true
//     }
// }
// 备注： props是只读的，不能直接修改props中的数据，Vue底层会检测你对props的修改并报错。
// 如果业务要求需要修改props中的数据，可以复制props的内容，到data中一份，然后在data中修改。
// props也可以子传父，前提是父给子传递一个函数，子通过调用函数并通过函数传参的方式给父组件传值，
// 但是不建议使用，因为子组件依赖父组件的数据，如果父组件的数据变化，子组件也会变化，导致子组件的性能问题
</code></pre>
          </div>
        <!-- $refs通信 -->
          <p><strong>$refs通信</strong></p>
          <div class="code-block">
            <pre><code v-prism="'typescript'">// 父组件
&lt;div&gt;
  &lt;child-component ref="childRef"&gt;&lt;/child-component&gt;
&lt;/div&gt;

// 子组件
Vue.component('child-component', {
  template: '&lt;div&gt; <span v-pre>{{ message }}</span> &lt;/div&gt;',
  data() {
    return {
      message: '默认消息'
    }
  },
  methods: {
    changeMessage() {
      this.message = '新消息2222'
    }
  }
})

// 父组件中通过$refs访问子组件中的属性和方法
// this.$refs.childRef是子组件实例对象
this.$refs.childRef.message = '新消息'
this.$refs.childRef.changeMessage()

// ref属性：
// 1. 被用来给元素或子组件组件引用信息(id 的替代者)
// 2. 应用在html标签上获取的是真实的DOM元素，应用在子组件标签上获取的是子组件实例对象
</code></pre>
          </div>
        


          <!-- $emit 向上传递 -->
          <p><strong>$emit 向上传递</strong></p>
          <div class="code-block">
            <pre><code v-prism="'typescript'">// 子组件中触发事件
this.$emit('custom-event', data)
// 父组件中绑定事件，接受子组件触发的事件传过来的数据
&lt;child-component @custom-event="handleEvent"&gt;&lt;/child-component&gt;
const vm = new Vue({
  methods: {
    handleEvent(data) {
      console.log('子组件触发的事件传过来的数据:',data)
    }
  }
})
</code></pre>
          </div>
          <!-- 事件总线 -->
          <h4>任意组件通信</h4>
          <p><strong>事件总线</strong></p>
          <div class="code-block">
            <pre><code v-prism="'typescript'">// 创建事件总线
// 在 main.js 中创建事件总线
 new Vue({
    el: '#root',
    beforeCreate() {
      Vue.prototype.$bus = this
    }
})

// 组件 A 发送事件
$bus.$emit('event', data)

// 组件 B 监听事件
$bus.$on('event', function(data) {
  console.log(data)
})

// 组件销毁时解绑
beforeDestroy() {
  $bus.$off('event')
}
</code></pre>
          </div>
          <h4>祖先与后代通信</h4>
          <p><strong>provide / inject</strong></p>
          <div class="code-block">
            <pre><code v-prism="'typescript'">// 祖先组件
 new Vue({

    data() {
      return {
        sharedData: '祖先组件的数据'
      }
    },

 // 方式1：对象形式（静态数据）
  provide: {
    siteName: 'Vue 2 学习网站',
    version: '2.6.14'
  },
 // 方式2：函数形式（动态数据，可访问 this）
provide: function() {
  return {
    sharedData: this.sharedData
  }
}
})
// 后代组件
// 方式1：数组形式（简单的字符串注入）
inject: ['sharedData']

 // 方式2：对象形式（可设置默认值和别名）
inject: {
  sharedData: {
    from: 'sharedData',
    default: '默认数据'
  }
}
// 后代接受到祖先组件传递过来的数据，直接使用即可
</code>
</pre>
          </div>
          <h3>使用场景</h3>
          <ul>
            <li>构建复杂的用户界面</li>
            <li>复用 UI 组件</li>
            <li>提高代码可维护性</li>
            <li>实现组件之间的通信</li>
          </ul>
          <h3>常见错误</h3>
          <ul>
            <li>组件名称使用 kebab-case 还是 PascalCase</li>
            <li>props 验证不正确</li>
            <li>provide / inject 事件总线使用不当</li>
            <li>组件通信方式选择不当</li>
          </ul>
          <h3>注意点</h3>
          <ul>
            <li>组件名建议使用 PascalCase 命名 </li>
            <li>props 应该是只读的 </li>
            <li>props 优先级高于 data </li>
            <li>复杂的组件通信考虑使用 Vuex</li>
            <li>避免使用 $emit 发送事件，考虑使用事件总线</li>
            <li>Vue2 中，组件自定义事件中，如果绑定 @click="handleClick"，当成原生事件需要使用.native 修饰符，即 @click.native="handleClick"（Vue3 中以弃用）</li>
            <li>避免使用 provide / inject 事件总线，考虑使用 Vuex</li>
          </ul>
          <h3>补充说明$parent和$children</h3>
          <ul>
            <li>$parent 在子组件中，可以通过 this.$parent访问父组件的实例，从而可以访问父组件的数据、方法等。</li>
            <li>$children 在父组件中，可以通过 this.$children访问所有子组件的实例数组，然后可以遍历或通过索引访问特定子组件。</li>
            <li>$children 不是响应式的，并且不能保证顺序。</li>
          </ul>
          <h4 style="color: red"> 
            注意：
          </h4>
         <ol>
          <li>紧耦合：使用 $parent和 $children会导致父子组件紧密耦合，使得组件难以复用和维护。如果组件被移动到另一个组件中，或者父组件被替换，那么功能可能会被破坏。</li>
          <li>难以理解：通过 $parent和 $children传递数据或调用方法，使得数据流变得不透明，难以追踪。这违背了 Vue 的组件化思想，即通过 props 和 events 进行父子组件通信。</li>
          <li>不是响应式的：$children数组不是响应式的，并且不能保证顺序。如果子组件被动态添加或移除，$children数组不会自动更新，因此依赖 $children的代码可能会出现问题。</li>
          <li>替代方案：在大多数情况下，应该使用 props 和 events 进行父子组件通信。对于深层嵌套的组件，可以使用 provide/inject。对于任意组件间的通信，可以使用 Vuex 或事件总线。</li>
          <li>在异步组件或函数式组件中，$parent和 $children可能不会如预期那样工作。</li>
          </ol>
          <h3>一个重要的内置关系</h3>
          <p style="color: red;font-weight: bold;">VueComponent.prototype.__proto__ === Vue.prototype </p>
          <img style="width: 100%;" src="@/assets/内置关系.png" alt="">
        </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>