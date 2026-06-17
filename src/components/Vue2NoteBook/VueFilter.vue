<template>
   <div class="tab-content">
          <h2>filter 过滤器</h2>
          <h3>定义</h3>
          <p>
            filter 过滤器是 Vue 中的一种自定义函数，对要显示的数据进行特定格式化后再显示(适用于一些简单的逻辑处理)
          </p>
          <h3>代码案例</h3>
          <div class="code-block">
            <pre> 
              <code v-prism="'typescript'">
// 创建第一个容器 用于全局、局部过滤看效果
&lt;div  id="root"&gt;
//  过滤器filters实现 时间格式过滤
&lt;h3&gt; 过滤器filters实现时间格式过滤：<span v-pre>{{time |  timefilters}}</span> &lt;/h3&gt; // 局部过滤器filters实现时间格式化：2026-04-02
//  过滤器filters实现(传参) 时间格式化
&lt;h3&gt; 过滤器filters实现时间格式(传参)：<span v-pre>{{time |  timefilters('YYYY年MM月DD日')}}</span> &lt;/h3&gt; // 局部过滤器filters实现时间格式化：2026年04月02日
// 多个过滤器filters实现(传参)加串联
// 局部过滤器filters实现时间格式化并截取前5个字符：2026年
&lt;h3&gt; 过滤器filters实现时间格式(传参)加串联：<span v-pre>{{time |  timefilters('YYYY年MM月DD日')   |  myslice }}</span> &lt;/h3&gt;
&lt;h4&gt; 过滤器filters实现：<span v-pre>{{msg |  myslice }}</span> &lt;/h4&gt; // 全局过滤器使用 展示msg的前5个字符：你好,尚硅

// 过滤器在指令中使用 展示msg的前5个字符：你好,尚硅
&lt;h4&gt; :x='msg  |  myslice'> &lt;/h4&gt; // 全局过滤器使用，展示msg的前5个字符：你好,尚硅
&lt;/div&gt;

// 创第二个容器 用于全局过滤看效果
&lt;div  id="root2"&gt;
&lt;h2&gt; 过滤器filters实现时间格式(传参)加串联：<span v-pre> {{msg  |  myslice}}</span> &lt;/h2&gt; // 全局过滤器使用，展示msg的前5个字符：你好,我是
&lt;/div&gt;


import dayjs from 'dayjs'  // npm install dayjs 后 引入dayjs时间处理库

 //-----------------全局过滤器------------------
Vue.filter('myslice',function(value){
    return  value.slice(0,5)
})

const  vm = new Vue({
el:'#root',
data(){
return{
time:  Date.parse(new Date()), //当前时间戳动态最新版
  // 1628344638699, //固定时间戳
msg:'你好,尚硅谷',
}
},

//------------局部过滤器
filters:{
//此时收到的val就是time,及管道符前的数据
timefilters(val,str="YYYY-MM-DD HH:mm:ss"){  //es6中的 形参默认值 如果str没有值就默认值"YYYY-MM-DD HH:mm:ss"，如果有就传'YYYY年MM月DD日'
 return   dayjs(val).format(str);
},
// myslice(value){   //用于多个过滤器的串联
//     return  value.slice(0,4)
// }
}
})
//此处创建例外的实例用于全局过滤看效果
new Vue({
    el:"#root2",
    data(){
        return{
            msg:'你好，我是你的救世主'
        }
    }
})
    </code>
</pre>
    </div>
    <h3>语法总结</h3>
     <ul>
        <li v-pre>1.注册过滤器：全局： Vue.filter(name,callback)  或  局部： new Vue{filters:{}}</li>
        <li v-pre>2.使用过滤器： {{ xxx  |  过滤器名}}  或 v-bind:属性 = 'xxx | 过滤器名'</li>
     </ul>
      <h3>注意</h3>
      <ul>
        <li v-pre>1.过滤器也可以接受额外参数，多个过滤器也可以串联</li>
        <li v-pre style="color:red;">2.并没有改变原本的数据，而是产生新的对应的数据</li>
      </ul>
    </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>