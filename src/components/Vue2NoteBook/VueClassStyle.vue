<template>
   <div class="tab-content">
          <h2>动态绑定class 和 style</h2>
          <h3>代码示例</h3>
          <div class="code-block">
            <pre><code v-prism="'typescript'">
&lt;div  id="root"&gt;
 // 绑定class样式----字符串写法，适用于:样式类名不确定，需要动态指定 
  &lt;div class="basic" :class="mood"&gt; class样式----字符串写法   &lt;/div&gt;
    
// 绑定class样式----数组写法，适用于:要绑定的样式个数不确定，名字也不确定
  &lt;div :class="classarr"&gt; class样式----数组写法   &lt;/div&gt;
// 绑定class样式----对象写法，适用于:要绑定的样式个数确定，名字也确定,但要动态决定用不用。
  &lt;div :class="classobjct"&gt; class样式----对象写法   &lt;/div&gt;

// 绑定style样式----对象写法。
  &lt;div :style="fsize"&gt; style样式----对象写法   &lt;/div&gt;
// 绑定style样式----数组写法
  &lt;div :style="fsizearr"&gt; style样式----数组写法   &lt;/div&gt;


 &lt;button @click="changeMood"&gt; 改变mood   &lt;/button&gt;
 &lt;button @click="changeClassarr"&gt; 改变classarr   &lt;/button&gt;
 &lt;button @click="changeClass"&gt; 改变classobjct   &lt;/button&gt;
 &lt;button @click="changeFsize"&gt; 改变fsize   &lt;/button&gt;
 &lt;button @click="changeFsize2"&gt; 改变fsizearr   &lt;/button&gt;


&lt;/div&gt;

  new Vue({
        data() { 
            return {
                name: "尚硅谷",
                mood: 'happy', // 字符串值对应下方的样式类名
                classarr: ['happy', 'sad'],  // 数组内的字符串值对应下方的样式类名
                classobjct: {      // 对象内的属性名对应下方的样式类名
                    atguigu1: false,
                    atguigu2: false,
                    atguigu3:false,
                },

                fsize: {
                    fontSize: '40px',
                    color: 'red',
                    backgroundColor: 'orange'
                },


                fsizearr: [

                    {
                        fontSize: '40px',
                    },
                    {
                        color: 'red',
                    },
                    {
                        marginTop: '20px',
                        backgroundColor: 'orange'
                    },
                ],
            }
        },

         methods: {
            // 以下方法用于动态修改class样式类名和style样式值，实现动态绑定class和style
            changeMood() {
                this.mood = 'sad';
            },
            changeClassarr() {
                this.classarr = ['happy', 'sad', 'normal'];
            },
            changeClass() {
                this.classobjct.atguigu1 = true;
            },
            changeFsize() {
                this.fsize.fontSize = '30px';
                this.fsize.color = 'cyan';
            },
            changeFsize2() {
                this.fsizearr[0].fontSize = '30px';
                this.fsizearr[1].color = 'cyan';
                this.fsizearr[2].marginTop = '30px';
                this.fsizearr[2].backgroundColor = 'red';    
            },
         }
    })

  &lt;style&gt;
      .basic {
            width: 280px;
            height: 168px;
            border: 1px solid black;
        }


        .happy {
            width: 200px;
            height: 100px;
            border: 1px solid red;
            background: chartreuse;
        }

        .sad {
            background: chocolate;

        }

        .normal {
            background: cyan;

        }

        .atguigu1 {
            font-size: 30px;
            color: cyan;

        }

        .atguigu2 {
            width: 250px;
            height: 180px;
            background: gold;
        }

        .atguigu3 {
            border-radius: 15px;
            border: 1.5px solid greenyellow;
            box-shadow: 2px 2px 4px greenyellow;
        }
&lt;/style&gt;
    </code></pre>
        </div>
</div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>