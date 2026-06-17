<template>
  <div class="tab-content">
    <h2 class="page-title">Vue3 自定义指令</h2>
    
    <div class="section">
      <h3>什么是自定义指令？</h3>
      <p>自定义指令是Vue3中一种扩展HTML元素功能的方式，允许我们在元素上添加自定义行为。</p>
      <p>在Vue3中，指令仍然以 <code>v-</code> 前缀命名，例如 <code>v-focus</code>、<code>v-tooltip</code> 等。</p>
    </div>

    <div class="section">
      <h3>为什么需要自定义指令？</h3>
      <ul>
        <li>当你需要直接操作DOM元素时</li>
        <li>当你需要为元素添加特定的行为时</li>
        <li>当你需要在元素上实现复杂的交互逻辑时</li>
        <li>当你需要复用DOM操作逻辑时</li>
      </ul>
    </div>

    <div class="section">
      <h3>自定义指令的生命周期钩子</h3>
      <pre><code v-prism="'typescript'">{{ directiveLifecycleCode }}</code></pre>
    </div>

    <div class="section">
      <h3>局部自定义指令</h3>
      <p>在组件内部定义的指令，只能在当前组件中使用。</p>
      <pre><code  v-prism="'typescript'">{{ localDirectiveCode }}</code></pre>
      <div class="demo">
        <h3>演示：聚焦输入框</h3>
        <input v-focus type="text" placeholder="点击按钮后会聚焦到这里" />
        <el-button @click="focusInput">聚焦输入框</el-button>
      </div>
    </div>

    <div class="section">
      <h3>全局自定义指令</h3>
      <p>在应用级别定义的指令，可以在整个应用中使用。</p>
      <pre><code  v-prism="'typescript'">{{ globalDirectiveCode }}</code></pre>
    </div>

    <div class="section">
      <h3>带参数的自定义指令</h3>
      <pre><code  v-prism="'typescript'">{{ directiveWithArgsCode }}</code></pre>
      <div class="demo">
        <h3>演示：带颜色的指令</h3>
        <div v-color="'red'" class="color-box">红色背景</div>
        <div v-color="'blue'" class="color-box">蓝色背景</div>
        <div v-color="'green'" class="color-box">绿色背景</div>
      </div>
    </div>

    <div class="section">
      <h3>使用场景</h3>
      <ul>
        <li><strong>表单验证</strong>：自定义指令可以用于验证表单输入</li>
        <li><strong>权限控制</strong>：根据用户权限显示或隐藏元素</li>
        <li><strong>动画效果</strong>：添加进入/离开动画</li>
        <li><strong>工具提示</strong>：为元素添加悬停提示</li>
        <li><strong>拖拽功能</strong>：实现元素的拖拽效果</li>
        <li><strong>滚动监听</strong>：监听元素的滚动事件</li>
        <li><strong>输入格式化</strong>：实时格式化输入内容</li>
      </ul>
    </div>

    <div class="section">
      <h3>常见错误</h3>
      <ul>
        <li><strong>生命周期钩子使用错误</strong>：例如在mounted钩子中访问尚未存在的DOM元素</li>
        <li><strong>指令参数类型错误</strong>：传递了错误类型的参数</li>
        <li><strong>内存泄漏</strong>：没有在unmounted钩子中清理事件监听器</li>
        <li><strong>指令重名</strong>：与内置指令或其他自定义指令重名</li>
        <li><strong>过度使用</strong>：在可以使用组件的情况下使用指令</li>
      </ul>
    </div>

    <div class="section">
      <h3 style="color: red;">注意点</h3>
      <ul>
        <li>自定义指令应该 <span style="color: red;">只用于DOM操作</span>，逻辑复杂的功能应该使用组件</li>
        <li>在使用指令时，要注意性能影响，避免在指令中执行耗时操作</li>
        <li>要正确处理指令的生命周期，特别是清理工作</li>
        <li>指令名称应该使用kebab-case（短横线分隔）命名</li>
        <li style="color: red;">在组合式API中，局部指令需要在setup函数中通过defineExpose暴露</li>
      </ul>
    </div>

    <div class="section">
      <h3>Vue2 vs Vue3 自定义指令的区别</h3>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>特性</th>
            <th>Vue2</th>
            <th>Vue3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>生命周期钩子</td>
            <td>bind, inserted, update, componentUpdated, unbind</td>
            <td>created, beforeMount, mounted, beforeUpdate, updated, beforeUnmount, unmounted</td>
          </tr>
          <tr>
            <td>指令定义方式</td>
            <td>选项式API: directives 选项</td>
            <td>组合式API: setup中定义并暴露</td>
          </tr>
          <tr>
            <td>参数传递</td>
            <td>binding对象</td>
            <td>binding对象（保持兼容）</td>
          </tr>
          <tr>
            <td>全局注册</td>
            <td>Vue.directive()</td>
            <td>app.directive()</td>
          </tr>
          <tr>
            <td>指令钩子参数</td>
            <td>el, binding, vnode, oldVnode</td>
            <td>el, binding, vnode, prevVnode</td>
          </tr>
          <tr>
            <td>指令简写</td>
            <td>支持函数简写</td>
            <td>支持函数简写</td>
          </tr>
          <tr>
            <td>指令优先级</td>
            <td>与其他指令的优先级规则</td>
            <td>与其他指令的优先级规则</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h3>完整示例：拖拽指令</h3>
      <pre><code v-prism="'typescript'">{{ dragDirectiveCode }}</code></pre>
      <div class="demo">
        <h3>演示：拖拽元素</h3>
        <div v-drag class="draggable-box">拖拽我</div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';

// 局部自定义指令：聚焦
const vFocus = {
  mounted(el: HTMLElement) {
    el.focus();
  }
};

// 局部自定义指令：颜色
const vColor = {
  mounted(el: HTMLElement, binding: any) {
    el.style.backgroundColor = binding.value;
  },
  updated(el: HTMLElement, binding: any) {
    el.style.backgroundColor = binding.value;
  }
};

// 局部自定义指令：拖拽
const vDrag = {
  mounted(el: HTMLElement) {
    const startDrag = (e: MouseEvent) => {
      const startX = e.clientX;
      const startY = e.clientY;
      const startLeft = el.offsetLeft;
      const startTop = el.offsetTop;

      const onDrag = (e: MouseEvent) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        el.style.left = (startLeft + dx) + 'px';
        el.style.top = (startTop + dy) + 'px';
      };

      const stopDrag = () => {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDrag);
      };

      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDrag);
    };

    el.addEventListener('mousedown', startDrag);
  }
};

// 聚焦输入框的方法
const focusInput = () => {
  const input = document.querySelector('input') as HTMLElement;
  input?.focus();
};

// 代码示例
const directiveLifecycleCode = `const myDirective = {
  // 指令创建时调用
  created() {
    console.log('指令创建');
  },
  //当指令第一次绑定到元素并且在挂载父组件之前调用。
  beforeMount(el, binding, vnode, prevVnode) {
    console.log('指令绑定到元素');
  },
  // 指令绑定到元素时调用
  mounted(el, binding, vnode, prevVnode) {
    // 执行初始化操作
  },
  // 元素更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {
    console.log('元素更新前');
  },
  // 元素更新时调用
  updated(el, binding, vnode, prevVnode) {
    // 执行更新操作
  },
  // 元素卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {
    console.log('元素卸载前');
  },
  // 元素卸载时调用
  unmounted(el, binding, vnode, prevVnode) {
    // 执行清理操作
  }
};`;

const localDirectiveCode = `<!-- 模板部分 -->
<template>
  <input v-focus type="text" />
</template>

<!-- 脚本部分 -->
<script setup>
// 定义局部指令
const vFocus = {
  mounted(el) {
    el.focus();
  }
};

// 在setup中返回指令
defineExpose({
  vFocus
});
<\/script>`;

const globalDirectiveCode = `// main.ts
import { createApp } from 'vue'
// import App from './App.vue'

const app = createApp(App)

// 注册全局指令
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.mount('#app')`;

const directiveWithArgsCode = `<!-- 模板部分 -->
<template>
  <div v-color="'red'">红色背景</div>
</template>

<!-- 脚本部分 -->
<script setup>
const vColor = {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value
  },
  updated(el, binding) {
    el.style.backgroundColor = binding.value
  }
};

// 在setup中返回指令
defineExpose({
  vColor
});
<\/script>`;

const dragDirectiveCode = `<!-- 模板部分 -->
<template>
  <div v-drag class="draggable">拖拽我</div>
</template>

<!-- 脚本部分 -->
<script setup>
const vDrag = {
  mounted(el) {
    const startDrag = (e) => {
      const startX = e.clientX;
      const startY = e.clientY;
      const startLeft = el.offsetLeft;
      const startTop = el.offsetTop;

      const onDrag = (e) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        el.style.left = (startLeft + dx) + 'px';
        el.style.top = (startTop + dy) + 'px';
      };

      const stopDrag = () => {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDrag);
      };

      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDrag);
    };

    el.addEventListener('mousedown', startDrag);
  }
};

// 在setup中返回指令
defineExpose({
  vDrag
});
<\/script>

<!-- 样式部分 -->
<style scoped>
.draggable {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
}
<\/style>`;

// 暴露指令供模板使用
defineExpose({
  vFocus,
  vColor,
  vDrag
});
</script>

<style lang="scss" scoped>
@use "./v3Note.scss";



.demo {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.color-box {
  width: 100px;
  height: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 10px;
  border-radius: 4px;
}

.draggable-box {
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

:deep(.el-button) {
  margin-left: 18px;
}
</style>