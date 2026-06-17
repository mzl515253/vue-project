<template>
  <div class="tab-content">
    <h2>常用指令</h2>

    <h3>常用指令目录</h3>
          <ul>
            <li v-for="item in v_List" :key="item.name" @click="scrollToRef(item.id)"><strong>{{item.name}}</strong> - {{item.desc}}</li>
          </ul>
    <!-- v-if 指令 -->
    <h3 id="v_IfId">v-if / v-else / v-else-if (创建销毁)</h3>
    <p>
      <strong>定义</strong>：条件渲染，根据表达式的值真假来渲染元素: 满足条件
      v-if 中的表达式 时渲染对应元素及内容，否则满足条件 v-else-if 中的表达式
      时渲染对应元素及内容 ，否则渲染 v-else 中的对应元素及内容；如果 v-if
      、v-else-if 、v-else 都没有满足条件，不会渲染任何内容；
    </p>
    <div class="code-block">
      <pre><code v-prism="'typescript'">
        &lt;div v-if="type === 'A'"&gt;类型 A&lt;/div&gt;
        &lt;div v-else-if="type === 'B'"&gt;类型 B&lt;/div&gt;
        &lt;div v-else&gt;其他类型&lt;/div&gt;
      </code></pre>
    </div>
    <h3>使用场景</h3>
    <p>切换频率较低的场景,如登录状态,是否显示导航栏等。</p>
    <h3>注意</h3>
    <ul>
      <li>
        v-if 与 v-for 同时使用时的优先级问题: v-for 优先级高;因此，在 v-if
        中使用 v-for 时，v-for 会优先渲染，v-if 会根据 v-for
        的渲染结果来判断是否渲染 v-if 中的内容。（Vue3中已废弃）
      </li>
      <li>
        v-if可以单独使用也可以和：v-else-if. v-else
        一起使用，但要求结构不能被打断；而v-else-if. v-else 不能单独使用，必须和
        v-if 一起使用。
      </li>
      <li>不展示的DOM元素直接被移除,不会占用内存；</li>
      <li>v-if的创建销毁会触发created,mounted等生命周期钩子；</li>
    </ul>
    <!-- v-for 指令 -->
    <h3 id="v_ForId">v-for</h3>
    <p>
      <strong>定义</strong
      >：列表渲染，可遍历数组、对象、字符串(用的很少)，指定次数(用的很少)
    </p>
    <div class="code-block">
      <pre><code v-prism="'typescript'">
        &lt;!-- 遍历数组 --&gt;
      &lt;ul&gt;
      &lt;li v-for="(item, index) in items" :key="index"&gt;
            <span v-pre>索引：{{ index }}，名称：{{ item && item.name ? item.name : '未知' }}</span>
      &lt;/li&gt;
      &lt;/ul&gt;
        &lt;!-- 以上遍历数组，模版解析后: --&gt;
      </code></pre>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <span
            >索引：{{ index }}，名称：{{
              item && item.name ? item.name : "未知"
            }}</span
          >
        </li>
      </ul>
      <pre><code v-prism="'typescript'">
&lt;!-- 遍历对象 --&gt;
&lt;div v-for="(value, key, index) in objects" :key="key"&gt;
            <span v-pre>索引：{{ index }}，键名：{{ key }}，键值：{{ value }}</span>
&lt;/div&gt;
        &lt;!-- 以上遍历对象，模版解析后: --&gt;
      </code></pre>
      <ul>
        <li v-for="(value, key, index) in objects" :key="key">
          <span>索引：{{ index }}，键名：{{ key }}，键值：{{ value }}</span>
        </li>
      </ul>
      <pre><code v-prism="'typescript'">
        &lt;!-- 遍历字符串 --&gt;
&lt;div v-for="(str, index) in message" :key="index"&gt;
            <span v-pre>索引：{{ index }}，字符：{{ str }}</span>
&lt;/div&gt;
        &lt;!-- 以上遍历字符串，模版解析后: --&gt;
  </code></pre>
      <ul>
        <li v-for="(str, index) in message" :key="index">
          <span>索引：{{ index }}，字符：{{ str }}</span>
        </li>
      </ul>
      <pre><code v-prism="'typescript'">
        &lt;!-- 遍历指定次数 --&gt;
&lt;div v-for="(num, index) in 10" :key="index"&gt;
            <span v-pre>索引：{{ index }}，数字：{{ num }}</span>
&lt;/div&gt;
        &lt;!-- 以上遍历指定次数，模版解析后: --&gt;
  </code></pre>
      <ul>
        <li v-for="(num, index) in 10" :key="index">
          <span>索引：{{ index }}，数字：{{ num }}</span>
        </li>
      </ul>
      <pre><code v-prism="'typescript'">
        const vm = new Vue({
            data() {
                return {
                    object: {
                        name: '张三',
                        age: 18,
                        sex: '男'
                    },
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
    <h3>vue中key有什么作用？</h3>
    <ol>
      <li>
        跟踪每个节点的身份: 每个节点都有一个唯一的身份标识，用于在更新 DOM
        时识别和移动节点。
      </li>
      <li>
        触发组件生命周期钩子或状态更新：当数据变化时，Vue 会根据 key
        来判断节点是否需要更新，而不是直接替换所有节点。
      </li>
      <li>
        在相同元素中切换时强制替换元素：当在相同元素中切换时，Vue 会根据 key
        来判断节点是否需要替换，而不是直接移动节点。
      </li>
      <li>
        当 v-for 中的循环项数量很多时，添加唯一的 key
        可以避免:性能、重复渲染、内存泄漏、循环引用等问题。
      </li>
      <li>
        避免使用 null 或 undefined 作为 key：当 v-for
        中的循环项数量很多时，添加唯一的 key 可以避免使用 null 或 undefined 作为
        key。
      </li>
    </ol>
    <h3>注意</h3>
    <ul>
      <li>key的取值必须是字符串或数字。</li>
      <li>
        不要使用随机数（如Math.random()）作为key，因为每次渲染都会生成新的key，导致元素被重新创建，性能低下且可能丢失状态。
      </li>
      <li style="color: red;">在同一个v-for循环中，key必须是唯一的。</li>
      <li style="color: red;">不推荐同时在同一元素上使用v-if和v-for，因为这样会带来性能上的浪费和逻辑上的混淆。Vue2的官方风格指南明确指出，应该避免将v-if和v-for同时用在同一个元素上。</li>
        <li>原因：</li>
      <ol>
        <li>当v-if和v-for一起使用时，Vue2会先执行v-for，然后再执行v-if。这意味着即使v-if的条件为false，也会先遍历整个数组，造成不必要的计算和DOM渲染。</li>
        <li>这种用法会导致代码可读性降低，意图不明确。</li>
        <li>但是，在Vue2中，如果确实需要同时使用，有两种常见的处理方式：<br>
          方式一：将v-if放在外层元素上，通过包裹一层元素（如template）来避免在同一元素上使用。<br>
          方式二：如果v-if的条件依赖于v-for的项，可以使用计算属性先过滤数据，然后再用v-for渲染。
        </li>
        <li>在Vue3中，v-if的优先级高于v-for，所以同时使用会导致错误，因此Vue3中更不允许这样使用。</li>
      </ol>
    </ul>

    <!-- v-bind 指令 -->
    <h3 id="v_BindId">v-bind</h3>
    <p><strong>定义</strong>：绑定属性，简写为 :</p>
    <div class="code-block">
      <pre><code v-prism="'typescript'">
&lt;!-- 标准形式 --&gt;
&lt;img v-bind:src="imageSrc"&gt;
&lt;!-- 简写形式 --&gt;
&lt;img :src="imageSrc"&gt;
&lt;!-- class动态绑定对象 --&gt;
&lt;div :class="{ active: isActive, 'text-danger': hasError }"&gt;&lt;/div&gt;
&lt;!-- style动态绑定对象 --&gt;
&lt;div :style="{ color: color }"&gt;&lt;/div&gt;
</code></pre>
    </div>

    <!-- v-on 指令 -->
    <h3 id="v_OnId">v-on</h3>
    <p><strong>定义</strong>：绑定事件，简写为 @</p>
    <div class="code-block">
      <pre><code v-prism="'typescript'">&lt;!-- 标准形式 --&gt;
&lt;button v-on:click="handleClick"&gt;点击&lt;/button&gt;

&lt;!-- 简写形式 --&gt;
&lt;button @click="handleClick"&gt;点击&lt;/button&gt;

&lt;!-- 带参数 --&gt;
&lt;button @click="handleClick2(1,$event, 'param')"&gt;点击&lt;/button&gt;

// vue中事件的常用修饰符：
// 1. prevent：阻止默认事件；
// 2.stop：阻止冒泡事件；
// 3.once:只触发一次；
// 4. self：只在当前元素上触发事件；  
// 5. capture：捕获事件，先触发父元素的事件处理函数，再触发子元素的事件处理函数；
// 6. passive：非阻塞事件处理函数，不阻止事件冒泡；

&lt;button @click.prevent="handleClick3"&gt;阻止默认事件；&lt;/button&gt;
&lt;button @click.stop="handleClick4"&gt;阻止冒泡事件；&lt;/button&gt;
&lt;button @click.once="handleClick5"&gt;只触发一次；&lt;/button&gt;
&lt;button @click.self="handleClick6"&gt;只在当前元素上触发事件；&lt;/button&gt;
&lt;button @click.capture="handleClick7"&gt;捕获事件；&lt;/button&gt;
&lt;button @click.passive="handleClick8"&gt;非阻塞事件处理函数；&lt;/button&gt;

// vue中常用的按键别名（通过按键触发事件）：
//  回车 => enter
//  删除 => delete (捕获" 删除 "  和 "退格" 键)
//  退出 => esc 
//  空格 => space 
//  换行 => tab   (tab要配合绑定 keydown 使用 );
//  上 => up
//  下 => down
//  左 => left
//  右 => right

//  2. Vue 未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为 kebab-case(短横线命名)；
//  3.系统修饰键(用法特殊)：ctrl,alt,shift,meta
//  (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才触发；
//  (2).配合keydown:正常触发事件；
//  4.也可以使用keyCode去指定具体案件(不推荐使用)；如:&lt;input type="text"  @keyup.13='showjianpan'&gt;
// 5.Vue.config.keyCodes.自定义键名 = 键码
// 如 ：  Vue.config.keyCodes.huiche = 13;

&lt;input type="text" @keyup.enter='showjianpan'&gt; 
  //自定义的键名 //  Vue.config.keyCodes.huiche = 13;
  // &lt;input type="text"  @keyup.huiche='showjianpan'&gt;

        const vm = new Vue({
            methods: {
                handleClick(e) {
                    console.log(e); // 打印事件对象，包含事件类型、目标元素、事件处理函数等信息
                },
                handleClick2(num,event,str) {
                    console.log(num,event,str); // 打印参数num、事件对象event、字符串str
                },
                handleClick3(e) {
                    console.log(e);  
                },
                handleClick4(e) {
                    console.log(e);  
                },
                handleClick5(e) {
                    console.log(e);  
                }
                handleClick6(e) {
                    console.log(e);  
                }
                handleClick7(e) {
                    console.log(e);  
                }
                handleClick8(e) {
                    console.log(e);  
                },
                // 键盘事件
                showjianpan(e){
                  console.log(e.key,e.keyCode);  //e.key：原生js键盘名；e.keyCode：原生键盘编码
              }
            },
        })
</code></pre>
    </div>
    <!-- v-model 指令 -->
    <h3 id="v_ModelId">v-model</h3>
    <p>
      <strong>定义</strong>：双向数据绑定，用于表单元素:
      输入框、下拉列表、复选框、单选框等;
      可以自动更新数据模型和视图，实现数据的实时同步。
    </p>
    <div class="code-block">
      <pre><code v-prism="'typescript'">&lt;input v-model="message" placeholder="输入消息"&gt;
&lt;p&gt;消息: {{ message }}&lt;/p&gt;

&lt;!-- 修饰符 --&gt;
&lt;input v-model.lazy="message"&gt;     &lt;!-- 失去焦点时更新 --&gt;
&lt;input v-model.number="age"&gt;       &lt;!-- 转换为数字 --&gt;
&lt;input v-model.trim="message"&gt;     &lt;!-- 去除首尾空格 --&gt;
</code></pre>
    </div>
    <p>
      <strong>原理</strong>：<br />
      1. 当表单元素的值发生变化时，Vue 会自动将新的值赋值给对应的数据模型。<br />
      2. 当数据模型发生变化时，Vue 会自动将新的值渲染到表单元素中。
    </p>

    <!-- v-show 指令 -->
    <h3 id="v_ShowId">v-show</h3>
    <p><strong>定义</strong>：条件显示，通过 CSS display 属性控制元素的显示/隐藏。</p>
    <div class="code-block">
      <pre><code v-prism="'typescript'">&lt;div v-show="isVisible"&gt;显示/隐藏内容&lt;/div&gt;</code></pre>
    </div>
    <!-- v-if vs v-show -->
    <h3>v-if vs v-show</h3>
    <ul>
      <li><strong>v-if</strong>：真正的条件渲染，会销毁和重建组件。</li>
      <li><strong>v-show</strong>：只是控制显示/隐藏，组件始终存在。</li>
      <li style="color: red;">如果需要非常频繁地切换，用 v-show；如果在运行时条件很少改变，或者需要惰性渲染以避免初始开销，用 v-if。 </li>
    </ul> 
    <!-- v-text 指令 -->
    <h3 id="v_TextId">v-text</h3>
    <p><strong>定义</strong>：将文本内容绑定到元素的 innerText 属性上：向其所在的节点渲染文本内容</p>
    <div class="code-block">
      <pre><code v-prism="'typescript'">&lt;p v-text="message"&gt;{{ message }}&lt;/p&gt;</code></pre>
    </div>
    <h3 v-pre>v-text vs {{ xxx }}</h3>  
    <p v-pre>
      <strong>v-text</strong>：将文本内容绑定到元素的 innerText 属性上：向其所在的节点渲染文本内容。会替换节点中的内容；插值语法则不会
      <br />
      <strong>插值语法</strong>：  {{ xxx }}则不会替换节点中的内容，而是解析xxx为js表达式，且可以直接读取到data中的所有属性；。
    </p>
    <!-- v-html 指令 -->
    <h3 id="v_HtmlId">v-html</h3>
    <p><strong>定义</strong>：将 HTML 内容绑定到元素的 innerHTML 属性上：向其所在的节点渲染 HTML 内容,同时会解析HTML标签,并渲染到页面上。</p>
    <div class="code-block">
      <pre><code v-prism="'typescript'">&lt;p v-html="message"&gt;{{ message }}&lt;/p&gt;</code></pre>
    </div>
    <h3 v-pre>v-html vs {{ xxx }}</h3>  
    <p v-pre>
      <strong>v-html</strong>：将 HTML 内容绑定到元素的 innerHTML 属性上：向其所在的节点渲染 HTML 内容。会替换节点中的内容；插值语法则不会
    </p>
    <p><strong>注意</strong></p>
    <ul>
      <li>在使用 v-html 时，要小心，因为会直接渲染 HTML 内容，可能会导致安全问题: 跨站脚本攻击(XSS)。</li>
      <li>建议在受信任的源使用 v-html，避免渲染用户输入的 HTML 内容。</li>
    </ul>
    <!-- v-once 指令 -->
    <h3 id="v_OnceId">v-once</h3>
    <p><strong>定义</strong>：只渲染一次，后续数据变化不会触发重新渲染; 后续则被视为静态内容</p>
    <div class="code-block">
      <pre><code v-prism="'typescript'">&lt;p v-once &gt;{{ message }}&lt;/p&gt;</code></pre>
    </div>
    <p><strong>使用场景</strong>：</p>
    <ul>
      <li>在条件渲染中，只在初始渲染时显示内容，后续根据条件变化不重新渲染。</li>
    </ul>
    <!-- v-cloak 指令 -->
    <h3 id="v_CloakId">v-cloak</h3>
    <p><strong>定义</strong>：本质是一个特殊属性，Vue实例创建完毕后接管容器，会删掉v-cloak属性，实现隐藏元素的效果。</p>
    <div class="code-block">
      <pre><code v-prism="'typescript'">
        &lt;div v-cloak&gt;{{ message }}&lt;/div&gt;
        &lt;!-- 注释：v-cloak指令会隐藏元素，防止初始渲染时显示为空白。 --&gt;
        &lt;!-- 注释：v-cloak指令会删除元素的v-cloak属性，实现隐藏元素的效果。 --&gt;
       &lt;style&gt;
          [v-cloak] {
            display: none;
          }
         &lt;/style&gt;
      </code></pre>
    </div>
    <p><strong>使用场景</strong>：</p>
    <ul>
      <li>在初始渲染时，隐藏元素，防止初始渲染时显示为空白。</li>
      <li v-pre>使用css配合v-cloak指令，实现元素的隐藏效果。可以解决网速慢时，页面元素展示出{{ xxx }}问题。</li>
    </ul>
      <!-- v-pre 指令 -->
        <h3 id="v_PreId">v-pre</h3>
        <p><strong>定义</strong>：在编译时，将指令的参数解析为静态文本，而不是动态绑定：跳过其所在节点的编译解析，直接渲染为静态文本。</p>
        <div class="code-block">
          <pre><code v-prism="'typescript'">&lt;p v-pre&gt;<span v-pre>{{ message }}</span>&lt;/p&gt;
            const vm = new Vue({
            data() {
                return {
                message: 'Hello Vue!'
            }
        }
        })
          </code></pre>
        </div>
        <p><strong>使用场景</strong>：</p>
        <ul>
          <li>可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译速度。</li>
        </ul>
         <!-- 自定义指令 -->
        <h3 id="v_DirectivesId">自定义指令：directives</h3>
        <p><strong>定义</strong>：自定义指令是指在 Vue 中自定义的指令，用于扩展 Vue 的功能。</p>
        <div class="code-block">
          <pre><code v-prism="'typescript'">
            &lt;p v-big="sum" &gt;&lt;/p&gt; // 模板解析后是：10
            &lt;input type="text" v-fbind:value='num' &gt;&lt;/input&gt; // 输入框的值会绑定到num属性上,并自动获取焦点
            &lt;button    @click="num++"&gt; 点我num+1 &lt;/button&gt; // 点击按钮后,num属性的值会增加1
            const vm = new Vue({
              data() {
                return {
                  sum: 1,
                  num: 100
                }
              },
               // ******************局部-自定义指令******************
            directives: {
              // ***********函数式写法******************
              // big函数何时会被调用？ 1.指令于元素成功绑定时（一上来） 2.指令所在的模板被重新解析时；
                big(el, binding) {
                      el.innerText = binding.value * 10
                }
                //--------------举例命名有多个单词组成的写法
                // 'big-number':function(){},
                
                // ***********对象式写法******************
              fbind:{
                  //指令回调函数的this指向window        
                  //指令与元素成功绑定是（一上来）
                bind(element,binding){
                  console.log('bind',this);
                  element.value = binding.value;
                } ,
 
                 //指令所在元素被插入页面时
                  inserted(element,binding){
                      console.log('inserted',this);
                      element.focus();
                },
 
               //指令所在模板被重新解析时
                update(element,binding) {
                    console.log('update',this);
                    element.value=binding.value;
                    element.focus();
                },
              }
            }
        })
        // ******************全局-自定义指令******************
          Vue.directive('big',(el, binding)=> {
                  el.innerText = binding.value * 10
          }) 

          Vue.directive('fbind', {
                  //指令回调函数的this指向window        
                  //指令与元素成功绑定是（一上来）
                bind(element,binding){
                  console.log('bind',this);
                  element.value = binding.value;
                } ,
 
                 //指令所在元素被插入页面时
                  inserted(element,binding){
                      console.log('inserted',this);
                      element.focus();
                },
 
               //指令所在模板被重新解析时
                update(element,binding) {
                    console.log('update',this);
                    element.value=binding.value;
                    element.focus();
                },
              })
          </code></pre>
        </div>
        <h3 style="color: red;">注意：</h3>
        <ul>
          <li>1.指令定义时不加v- , 但使用时要加 v-  ；</li>
          <li>2.指令的参数可以是任意的字符串，也可以是表达式。</li>
          <li>3.指令如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名；</li>
          <li>4.指令回调函数的this指向window，而不是vue实例。</li>

        </ul>


  </div>
</template>

<script setup lang='ts'>
import { type PropType, reactive } from "vue";
import useAnchor from "@/pages/Hooks/useAnchor.ts";


interface ITEMTYPE {
  id: string;
  name: string;
}

const props = defineProps({
  items: {
    type: Array as PropType<ITEMTYPE[]>,
    default: () => [],
  },
  objects: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  message: {
    type: String,
    default: "默认消息",
  },
});

const { scrollToRef } = useAnchor()
const v_List = reactive(
  [
  {id:'v_IfId',name:'v-if',desc:'创建销毁'},
  {id:'v_ForId',name:'v-for',desc:'循环渲染'},
  {id:'v_BindId',name:'v-bind',desc:'绑定属性，简写为 : '},
  {id:'v_OnId',name:'v-on',desc:'绑定事件,简写为@'},
  {id:'v_ModelId',name:'v-model',desc:'双向绑定数据'},
  {id:'v_ShowId',name:'v-show',desc:'显示隐藏'},
  {id:'v_TextId',name:'v-text',desc:'文本绑定'},
  {id:'v_HtmlId',name:'v-html',desc:'html绑定'},
  {id:'v_OnceId',name:'v-once',desc:'只渲染一次'},
  {id:'v_CloakId',name:'v-cloak',desc:'隐藏元素'}, 
  {id:'v_PreId',name:'v-pre',desc:'跳过其所在节点的编译解析'}, 
  {id:'v_DirectivesId',name:'自定义指令directives',desc:'自定义绑定指令'},
  ])



</script>

<style lang='scss' scoped>
@use "./v2Note.scss";
</style>