<template>
  <div class="container">
     <h2>v-show 和 v-if 的区别</h2>
   <p>
    共同点：都可以控制元素的显示和隐藏
    </p>
    <p style="margin-top: 15px;">区别：</p>
    <ul>
      <li> 
        v-show是控制元素的display属性的none来让元素隐藏和显示；v-if显示隐藏时把DOM整个元素添加和删除；
      </li>
      <li> 
        v-if有个局部编译和卸载的过程，切换这个过程中会适当的销毁和重建内部的事件监听和子组件，v-show只是简单的css切换
      </li>
      <li> 
        v-if才是真正的条件渲染；v-show从false变成true的时候不会触发组件的生命周期，v-if会触发生命周期；
      </li>
      <li> 
        v-if的切换效率比较低；v-show切换效率比较高；所以频繁切换可以用v-show,其他情况v-if；
      </li>
    </ul>
    <h2>如何理解MVVM架构</h2>
      <p>
       MVVM（Model-View-ViewModel）是一种软件架构模式，主要用于构建用户界面。它将应用程序分为三个核心部分：Model（模型）、View（视图）和ViewModel（视图模型）
      </p>
      <ul>
        <li> 
          Model：负责存储和操作数据，是应用程序的数据层。
        </li>
        <li> 
          View：负责渲染数据，是应用程序的用户界面层。
        </li>
        <li> 
          ViewModel：负责协调Model和View，是应用程序的业务逻辑层。
        </li>
      </ul>
      <p>
        数据流向
      </p>
      <ol>
        <li> 
          从Model到View：Model发生变化时，ViewModel会得到通知（通常通过观察者模式或事件），然后更新自己的数据，进而通过数据绑定更新View。
        </li>
        <li> 
          从View到Model：用户通过View与ViewModel交互（如点击按钮、输入文本等），ViewModel会将用户操作传递给Model进行处理,Model会根据操作更新数据,View会根据数据更新。
        </li>
        <li> 
          从ViewModel到View：ViewModel通过数据绑定将数据暴露给View。当ViewModel中的数据变化时，View自动更新。在Vue中，这是通过响应式系统实现的。
        </li>
      </ol>
      <h4>总结</h4>
      <p>
        核心是View和Model的双向数据绑定，当数据改变的时候，ViewModel能监听到数据的变化，然后更新视图；当用户操作视图的变化，ViewModel也会监听视图的变化，然后通知数据进行改动；这就是实现了双向的数据绑定；
ViewModel通过双向数据绑定把View和Model连接起来，它们之间的同步是自动的，不需要人为干涉，只需要关注业务逻辑即可，不需要操作DOM，同时也不需要关注数据的状态问题，因为它是MVVM统一管理的。
      </p>
      
    <h2 style="margin-top: 15px;">v-for中key值的作用？</h2>
    <p>key 属性的关键作用</p>
    <ol>
      <li> 
        唯一标识：
        <ul>
          <li> 
            key 是 Vue 识别每个节点的唯一标识符
          </li>
          <li> 类似于数据库中的主键，帮助 Vue 跟踪列表项的身份</li>
        </ul>
      </li>
      <li> 
        ‌高效 DOM 更新‌：
        <ul>
          <li> 
            当列表数据变化时，Vue 使用 key 来高效复用已有 DOM 元素，而不是重新创建新的元素。
          </li>
          <li> 没有 key 时，Vue 可能会重新渲染整个列表，导致性能问题</li>
        </ul>
      </li>
      <li> 
        状态保持：
        <ul> 
          <li> 
            确保组件状态（如表单输入）与正确元素相关联
          </li>
          <li> 在列表中插入、删除或排序元素时，key 防止状态"漂移"，保持组件状态的正确性。</li>
        </ul>
      </li>
      <li> 
        ‌动画效果‌：
        <ul> 
          <li> 
            对于过渡动画，key 帮助 Vue 正确跟踪元素位置变化
          </li>
          <li> 实现平滑的列表重排序动画效果</li>
        </ul>
      </li>
        </ol>
        <h4 style="color: red;">注意：</h4>
        <ul>
          <li> 
            始终为 v-for 提供唯一的 key 属性
          </li>
          <li> 使用稳定且唯一的值作为 key（如数据 ID）</li>
          <li>避免使用数组索引作为 key（除非列表是静态的且不会变化）</li>
          <li>避免使用随机数作为 key（会导致不必要的重新渲染）</li>
        </ul>
  </div>
</template>

<script setup lang='ts'>
import { reactive, toRefs } from 'vue'
let data= reactive({})
let {}= toRefs(data)
</script>

<style lang='scss' scoped>
@use './text8.scss';


</style>