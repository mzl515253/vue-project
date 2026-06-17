<template>
  <div class="tab-content">
    <h2>响应式系统</h2>
    <h3>定义</h3>
    <p>Vue 的响应式系统是指当数据变化时，视图会自动更新的机制。</p>
    <h3>底层原理</h3>
    <p>
      基于 Object.defineProperty() 实现，对数据对象的属性进行 getter/setter
      劫持。
    </p>
    <h3>核心流程</h3>
    <ol>
      <li>初始化时，对 data 中的属性进行劫持</li>
      <li>当属性被访问时，触发 getter，收集依赖（watcher）</li>
      <li>当属性被修改时，触发 setter，通知依赖更新</li>
      <li>
        vue中的数据代理：
        <ul>
          <li>通过vm对象代理data对象中属性的操作(读/写)</li>
          <li>好处：更加方便的操作data中的数据</li>
          <li>
            原理：通过Object.defineProperty()把data对象中所有属性添加到vm上
          </li>
          <li>为每一个添加到vm上的属性，都指定一个getter/setter。</li>
          <li>在getter/setter内部去操作(读/写)data 中对应的属性。</li>
          <h3>代码示例</h3>
          <pre><code v-prism="'typescript'">
     // 数据代理：通过一个对象代理另一个对象中属性的操作(读/写)
        let obj={x:100};
        let  obj2 = {x:200}
        
        Object.defineProperty(obj2,'x',{
    //当有人读取obj2的age属性时，get函数(getter)就会被调用，且返回的就是age的值
        get(){
        return  obj.x;
        },
        
        //当有人读取obj2的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
        set(value){
        obj.x = value;
        }
        })
           </code></pre>
          <img style="width: 100%" src="@/assets/vue数据代理.png" alt="" />
        </ul>
      </li>
    </ol>
    <h3>代码示例</h3>
    <div class="code-block">
      <pre><code v-prism="'javascript'">
        // 简化的响应式实现
function defineReactive(obj, key, value) {
  Object.defineProperty(obj, key, {
    get: function() {
      // 收集依赖
      console.log('获取 ' + key + ': ' + value);
      return value;
    },
    set: function(newValue) {
      if (newValue !== value) {
        value = newValue;
        // 通知更新
        console.log('设置 ' + key + ': ' + newValue);
      }
    }
  });
}

var data = { message: 'Hello' };
defineReactive(data, 'message', data.message);


// 深度响应式实现
 let data = {
            name: "尚硅谷",
            address: "北京",
            Objs: {
                aaa: "152",
                bbb: 'asc'
            }
        }
        // 判断是否是对象
        function isObj(v){
            return typeof v === 'object' && v !== null
        }
        //创建一个监视的实例对象，用于监视data中的属性变化
        const obs = new Observer(data)
        console.log(obs);
        let vm = {}
        vm._data = data = obs

        function Observer(obj) {
            //汇总对象中所有的属性形成一个数组
            const keys = Object.keys(obj)

            //遍历数组，判断是否是对象，是对象就递归调用Observer函数
            keys.forEach((k) => {
                if(isObj(obj[k])){
                    Observer(obj[k])
                }
                Object.defineProperty(this, k, {
                    get() {
                        return obj[k]
                    },
                    set(val) {
                        console.log(`${k}被改了，我要解析模板了，生成虚拟DOM,我要忙了`);
                        obj[k] = val;
                    }
                })
            })
        }
</code></pre>
    </div>
    <h3>使用场景</h3>
    <p>任何需要数据驱动视图的场景。</p>
    <h3>常见错误</h3>
    <ul>
      <li>直接添加新属性：Vue 无法检测对象属性的添加或删除</li>
      <li>修改数组索引或长度：Vue 无法检测这种变化</li>
    </ul>
    <h3>注意点</h3>
    <ul>
      <li>使用 Vue.set() 或 this.$set() 添加新的响应式属性</li>
      <li>使用数组方法如 push()、splice() 等修改数组，而不是直接修改索引</li>
      <li>对于复杂对象，考虑使用深度监听或计算属性</li>
    </ul>

    <h3>总结：</h3>
    <ol>
      <li>vue 会监视data中所有层次的数据；</li>
      <li>
        如何监测对象中的数据？
        <br> 通过setter实现监视，且要在new Vue还是就传入要监测的数据
      </li>
      (1).对象中后追加的属性，Vue默认不做响应式处理
      <br />
      (2).如需给后添加的属性做响应式，请使用如下API:
      <br />
      Vue.set(target,propertyName/index,value)或
      <br />vm.$set(target,propertyName/index,value) /
      this.$set(数组，下标索引，被修改的下标值) /
      this.$set(对象，添加的属性名，添加的属性值)
      <br />删除对象属性：this.$delete(对象，属性名)
      <li>如何监测数组中的数据？</li>
      通过包裹数组更新元素的方法实现，本质就是做了两件事：
      <br />
      (1).调用原生对应方法对数组进行更新；
      <br />
      (2).重新解析模板，进而更新页面；
      <li>在vue修改数组中的某个元素一定要用如下方法：</li>
      1.使用这些API:push(),pop(),shift(),unshift(),splice(),sort(),reverse()
      <br />2.Vue.set() 或 vm.$set()/this.$set()
      <br />3.数组项的删除：this.$delete(数组，下标索引) -- 不常用
      <p style="color: red">
        特别注意：Vue.set() 或 vm.$set()/this.$set() 不能给vm 或vm的根数据对象
        添加属性！！！
      </p>
    </ol>
    <pre><code  v-prism="'javascript'">
    const vm = new Vue({
        el: '#root',
        data() {
            return {
                name: '尚硅谷',
                city: "北京",
                student: {
                    name: 'tom',
                    age: {
                        rage: 40,
                        jage: 28,
                    }
                },
                aihao: ['抽烟', '喝酒', '撩妹'],
                friends: [
                    {
                        name: 'jerry',
                        age: 32
                    },
                    {
                        name: 'tony',
                        age: 33
                    },
                ]
            }
        },
        methods: {
            //添加一个性别
            addsex() {

                //Vue.set()用于对象给对象添加属性名以及该属性名对应的值,里面第一个参数是vue实例中的对象，第二个是属性名，第三个是属性名对应的值；
                // Vue.set(this.student,'sex','男')
                //也可以写成
                this.$set(this.student, 'sex', '男');
                // 对象属性的删除
                this.$delete(this.student, 'sex');
            },

            //修改性别 
            setsex() {
                this.student.sex = '女'

            },
            //添加一个爱好
            addaihao() {
                //如果给数组添加删除排序等改变原数组的方法操作：可以用push,pop,shift,unshift,splice,sort,reverse这7中方法来改变
                this.aihao.push('约会');
            },

            //修改第一个爱好为开车
            setaihao() {
                // Vue.set(this.aihao,0,'开车')
                //可以写成
                this.$set(this.aihao, 0, '开车');
                //或者用splice
                // this.aihao.splice(0,1,'开车');
                 // 数组项的删除
                this.$delete(this.aihao, 0);
            },

            //首位添加朋友
            addfriend() {
                this.friends.unshift({
                    name: 'kai',
                    age: 32
                });
            },
            //修改第一个朋友名字为张三
            setfriend() {
                this.friends[0].name = '张三'
            },
        },
    })

     </code></pre>
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>