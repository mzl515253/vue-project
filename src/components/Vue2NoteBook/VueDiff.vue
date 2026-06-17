<template>
  <div class="tab-content">
    <h2>Vue Diff 算法详解</h2>
    
    <h3>定义</h3>
    <p>Diff 算法是 Vue 虚拟 DOM 系统中的核心算法，用于比较新旧虚拟 DOM 树的差异，并高效地更新真实 DOM。</p>
    
    <h3>核心概念</h3>
    <ul>
      <li><strong>虚拟 DOM</strong>：用 JavaScript 对象表示的 DOM 结构，轻量且易于操作</li>
      <li><strong>Diff 算法</strong>：比较新旧虚拟 DOM 树的差异，生成最小化的 DOM 更新操作</li>
      <li><strong>补丁（Patch）</strong>：根据 diff 结果生成的 DOM 更新操作</li>
      <li><strong>Key</strong>：用于标识节点的唯一性，帮助 diff 算法快速定位相同节点</li>
    </ul>
    
    <h3>Vue 2 vs Vue 3 Diff 算法对比</h3>
    
    <table class="comparison-table">
      <thead>
        <tr>
          <th>特性</th>
          <th>Vue 2</th>
          <th>Vue 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>算法类型</td>
          <td>双端比较算法</td>
          <td>快速 Diff 算法（基于最长递增子序列）</td>
        </tr>
        <tr>
          <td>时间复杂度</td>
          <td>O(n²)</td>
          <td>O(n log n)</td>
        </tr>
        <tr>
          <td>优化重点</td>
          <td>减少 DOM 操作</td>
          <td>减少比对次数，优化长列表性能</td>
        </tr>
        <tr>
          <td>Key 的使用</td>
          <td>推荐使用</td>
          <td>推荐使用，性能提升更明显</td>
        </tr>
        <tr>
          <td>适用场景</td>
          <td>一般场景</td>
          <td>大型列表和复杂组件树</td>
        </tr>
      </tbody>
    </table>
    
    <h3>虚拟 DOM 基础</h3>
    
    <h4>虚拟 DOM 的结构</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 虚拟 DOM 节点结构
const vnode = {
  tag: 'div', // 标签名
  props: { // 属性
    class: 'container',
    id: 'app'
  },
  children: [ // 子节点
    {
      tag: 'p',
      props: {},
      children: ['Hello, Vue!']
    }
  ],
  key: null, // 节点唯一标识
  patchFlag: 0 // Vue 3 中的优化标记
}
</code></pre>
    </div>
    
    <h4>虚拟 DOM 的优势</h4>
    <ul>
      <li><strong>减少 DOM 操作</strong>：DOM 操作成本高，虚拟 DOM 可以批量处理更新</li>
      <li><strong>跨平台</strong>：虚拟 DOM 可以渲染到不同平台（浏览器、服务器、移动设备）</li>
      <li><strong>可测试性</strong>：虚拟 DOM 是普通 JavaScript 对象，易于测试</li>
      <li><strong>性能优化</strong>：通过 diff 算法减少不必要的 DOM 更新</li>
    </ul>
    
    <h3>Vue 2 Diff 算法（双端比较）</h3>
    
    <h4>核心原理</h4>
    <p>Vue 2 的 diff 算法采用双端比较策略，同时从新旧节点的两端开始比较，减少了节点移动的次数。</p>
    
    <h4>执行过程</h4>
    <ol>
      <li><strong>初始化指针</strong>：设置新旧节点的首尾指针（oldStartIdx, oldEndIdx, newStartIdx, newEndIdx）</li>
      <li><strong>循环比较</strong>：
        <ul>
          <li>旧首 vs 新首：如果相同，两个指针都后移</li>
          <li>旧尾 vs 新尾：如果相同，两个指针都前移</li>
          <li>旧首 vs 新尾：如果相同，旧首节点移到旧尾后面，旧首指针后移，新尾指针前移</li>
          <li>旧尾 vs 新首：如果相同，旧尾节点移到旧首前面，旧尾指针前移，新首指针后移</li>
          <li>以上都不匹配：使用 key 在旧节点中查找新首节点
            <ul>
              <li>找到：将找到的节点移到旧首前面，新首指针后移</li>
              <li>没找到：创建新节点并插入到旧首前面，新首指针后移</li>
            </ul>
          </li>
        </ul>
      </li>
      <li><strong>处理剩余节点</strong>：
        <ul>
          <li>旧节点有剩余：删除剩余的旧节点</li>
          <li>新节点有剩余：创建并插入剩余的新节点</li>
        </ul>
      </li>
    </ol>
    
    <h4>代码示例</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// Vue 2 diff 算法核心逻辑（简化版）
function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let newEndIdx = newCh.length - 1
  
  let oldStartVnode = oldCh[oldStartIdx]
  let oldEndVnode = oldCh[oldEndIdx]
  let newStartVnode = newCh[newStartIdx]
  let newEndVnode = newCh[newEndIdx]
  
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (!oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 旧首 vs 新首
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // 旧尾 vs 新尾
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // 旧首 vs 新尾
      patchVnode(oldStartVnode, newEndVnode)
      nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // 旧尾 vs 新首
      patchVnode(oldEndVnode, newStartVnode)
      nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 以上都不匹配，使用 key 查找
      let idxInOld = oldCh.findIndex(node => 
        node && sameVnode(node, newStartVnode)
      )
      if (idxInOld === -1) {
        // 没找到，创建新节点
        createElm(newStartVnode, parentElm, oldStartVnode.elm)
      } else {
        // 找到，移动节点
        const vnodeToMove = oldCh[idxInOld]
        patchVnode(vnodeToMove, newStartVnode)
        oldCh[idxInOld] = undefined
        nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
  
  // 处理剩余节点
  if (oldStartIdx > oldEndIdx) {
    // 新节点有剩余，创建并插入
    addVnodes(parentElm, null, newCh, newStartIdx, newEndIdx)
  } else if (newStartIdx > newEndIdx) {
    // 旧节点有剩余，删除
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}
</code></pre>
    </div>
    
    <h3>Vue 3 Diff 算法（快速 Diff）</h3>
    
    <h4>核心原理</h4>
    <p>Vue 3 的 diff 算法采用了基于最长递增子序列的快速 diff 策略，特别优化了长列表的性能。</p>
    
    <h4>执行过程</h4>
    <ol>
      <li><strong>前置处理</strong>：
        <ul>
          <li>从头部开始比较，相同则继续，直到找到不同的节点</li>
          <li>从尾部开始比较，相同则继续，直到找到不同的节点</li>
        </ul>
      </li>
      <li><strong>处理特殊情况</strong>：
        <ul>
          <li>旧节点已处理完，新节点有剩余：创建并插入剩余节点</li>
          <li>新节点已处理完，旧节点有剩余：删除剩余旧节点</li>
        </ul>
      </li>
      <li><strong>核心 diff 逻辑</strong>：
        <ul>
          <li>构建新节点的 key-index 映射表</li>
          <li>遍历旧节点，在新节点中查找匹配的节点</li>
          <li>使用最长递增子序列算法计算出不需要移动的节点</li>
          <li>根据计算结果移动和创建节点</li>
        </ul>
      </li>
    </ol>
    
    <h4>最长递增子序列算法</h4>
    <p>最长递增子序列（LIS）算法用于找到新节点序列中最长的递增索引序列，这些节点不需要移动，其他节点则围绕它们进行移动。</p>
    
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 最长递增子序列算法（简化版）
function getSequence(arr) {
  const p = arr.slice()
  const result = [0]
  
  for (let i = 0; i < arr.length; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      const last = result[result.length - 1]
      if (arr[last] < arrI) {
        p[i] = last
        result.push(i)
        continue
      }
      
      let left = 0
      let right = result.length - 1
      while (left < right) {
        const mid = (left + right) >> 1
        if (arr[result[mid]] < arrI) {
          left = mid + 1
        } else {
          right = mid
        }
      }
      
      if (arrI < arr[result[left]]) {
        if (left > 0) {
          p[i] = result[left - 1]
        }
        result[left] = i
      }
    }
  }
  
  let i = result.length - 1
  let last = result[i]
  while (i >= 0) {
    result[i] = last
    last = p[last]
    i--
  }
  
  return result
}
</code></pre>
    </div>
    
    <h3>Key 的重要性</h3>
    
    <h4>什么是 Key</h4>
    <p>Key 是虚拟 DOM 节点的唯一标识，用于在 diff 算法中快速定位相同的节点。</p>
    
    <h4>Key 的作用</h4>
    <ul>
      <li><strong>提高 diff 效率</strong>：通过 key 可以快速找到相同的节点，避免不必要的 DOM 操作</li>
      <li><strong>保持组件状态</strong>：使用稳定的 key 可以保持组件的状态，避免不必要的组件销毁和重建</li>
      <li><strong>避免错误的节点复用</strong>：没有 key 时，Vue 会使用索引作为默认 key，可能导致错误的节点复用</li>
    </ul>
    
    <h4>Key 的使用原则</h4>
    <ul>
      <li><strong>唯一性</strong>：key 必须是唯一的</li>
      <li><strong>稳定性</strong>：key 应该是稳定的，不应该在每次渲染时变化</li>
      <li><strong>不可变性</strong>：key 不应该在组件生命周期中变化</li>
      <li><strong>合理选择</strong>：优先使用 ID 等唯一标识符，避免使用索引作为 key</li>
    </ul>
    
    <h4>Key 使用示例</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 不推荐：使用索引作为 key
&lt;div v-for="(item, index) in items" :key="index"&gt;
  <span v-pre>{{ item.name }}</span>
&lt;/div&gt;

// 推荐：使用唯一标识符作为 key
&lt;div v-for="item in items" :key="item.id"&gt;
  <span v-pre>{{ item.name }}</span>
&lt;/div&gt;

// 推荐：使用字符串拼接确保唯一性
&lt;div v-for="(item, index) in items" :key="`${item.id}-${index}`"&gt;
  <span v-pre>{{ item.name }}</span>
&lt;/div&gt;
</code></pre>
    </div>
    
    <h3>Diff 算法的优化策略</h3>
    
    <h4>1. 静态节点优化</h4>
    <p>Vue 3 中引入了静态节点标记，对于不会变化的节点，diff 算法会跳过比较，直接复用。</p>
    
    <h4>2. 动态节点优化</h4>
    <p>Vue 3 中使用 patchFlag 标记动态节点的类型，只比较变化的部分，减少比较次数。</p>
    
    <h4>3. 事件监听器优化</h4>
    <p>Vue 3 中事件监听器被缓存，避免了每次渲染都重新绑定事件。</p>
    
    <h4>4. 长列表优化</h4>
    <p>Vue 3 的快速 diff 算法特别优化了长列表的性能，减少了节点移动的次数。</p>
    
    <h4>5. 虚拟滚动</h4>
    <p>对于非常长的列表，可以使用虚拟滚动技术，只渲染可见区域的节点。</p>
    
    <h3>性能分析</h3>
    
    <h4>时间复杂度对比</h4>
    <ul>
      <li><strong>Vue 2</strong>：O(n²)，在长列表场景下性能可能下降</li>
      <li><strong>Vue 3</strong>：O(n log n)，在长列表场景下性能更稳定</li>
    </ul>
    
    <h4>性能优化建议</h4>
    <ul>
      <li><strong>使用合适的 key</strong>：为 v-for 提供唯一、稳定的 key</li>
      <li><strong>减少不必要的渲染</strong>：使用 computed、watch 等优化数据更新</li>
      <li><strong>拆分组件</strong>：将复杂组件拆分为更小的组件，减少 diff 的范围</li>
      <li><strong>使用 keep-alive</strong>：缓存组件实例，避免重复渲染</li>
      <li><strong>避免深度监听</strong>：尽量避免使用 deep 监听，减少依赖追踪的开销</li>
      <li><strong>使用虚拟滚动</strong>：对于长列表，使用虚拟滚动技术</li>
    </ul>
    
    <h3>常见问题与解决方案</h3>
    
    <h4>1. 列表渲染性能问题</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 问题：长列表渲染性能差
&lt;div v-for="item in longList" :key="index"&gt;
  <span v-pre>{{ item.name }}</span>
&lt;/div&gt;

// 解决方案：
// 1. 使用唯一 key
&lt;div v-for="item in longList" :key="item.id"&gt;
<span  v-pre>{{ item.name }}</span> 
&lt;/div&gt;

// 2. 使用虚拟滚动
&lt;RecycleScroller
  class="scroller"
  :items="longList"
  :item-size="54"
&gt;
  &lt;template v-slot="{ item }"&gt;
    &lt;div class="item"&gt; <span  v-pre>{{ item.name }}</span>&lt;/div&gt;
  &lt;/template&gt;
&lt;/RecycleScroller&gt;
</code></pre>
    </div>
    
    <h4>2. 组件状态丢失</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 问题：使用索引作为 key 导致组件状态丢失
&lt;div v-for="(item, index) in items" :key="index"&gt;
  &lt;input type="text" v-model="item.value" /&gt;
&lt;/div&gt;

// 解决方案：使用唯一 key
&lt;div v-for="item in items" :key="item.id"&gt;
  &lt;input type="text" v-model="item.value" /&gt;
&lt;/div&gt;
</code></pre>
    </div>
    
    <h4>3. 频繁的 DOM 更新</h4>
    <div class="code-block">
      <pre><code  v-prism="'typescript'">// 问题：频繁的数据变化导致频繁的 DOM 更新
&lt;div&gt; <span v-pre>{{ expensiveComputation() }}</span>&lt;/div&gt;

// 解决方案：使用计算属性缓存结果
&lt;div&gt; <span v-pre>{{ cachedResult }}</span>&lt;/div&gt;

&lt;script&gt;
export default {
  computed: {
    cachedResult() {
      return this.expensiveComputation()
    }
  }
}
&lt;/script&gt;
</code></pre>
    </div>
    
    <h3>最佳实践</h3>
    
    <h4>1. 合理使用 key</h4>
    <ul>
      <li>为 v-for 提供唯一、稳定的 key</li>
      <li>避免使用索引作为 key，特别是在列表会增删改的情况下</li>
      <li>使用字符串拼接确保 key 的唯一性</li>
    </ul>
    
    <h4>2. 优化组件结构</h4>
    <ul>
      <li>拆分复杂组件为更小的组件</li>
      <li>使用 functional 组件减少组件实例的开销</li>
      <li>合理使用 props 和 emit，避免不必要的 props 传递</li>
    </ul>
    
    <h4>3. 数据管理优化</h4>
    <ul>
      <li>使用 computed 缓存计算结果</li>
      <li>合理使用 watch 和 watchEffect</li>
      <li>避免在模板中直接使用复杂表达式</li>
      <li>使用 shallowRef 和 shallowReactive 减少响应式开销</li>
    </ul>
    
    <h4>4. 渲染优化</h4>
    <ul>
      <li>使用 v-memo 指令缓存渲染结果</li>
      <li>合理使用 v-if 和 v-show</li>
      <li>使用 KeepAlive 缓存组件实例</li>
      <li>避免在模板中使用内联样式和内联事件处理器</li>
    </ul>
    
    <h3>总结</h3>
    <p>Vue 的 diff 算法是其性能优化的核心，通过比较新旧虚拟 DOM 树的差异，最小化 DOM 更新操作，提高应用的渲染性能。</p>
    <p>Vue 2 采用双端比较算法，Vue 3 则引入了基于最长递增子序列的快速 diff 算法，进一步提升了性能，特别是在长列表场景下。</p>
    <p>正确理解和应用 diff 算法的原理，可以帮助开发者构建更加高效、流畅的 Vue 应用。通过合理使用 key、优化组件结构、管理数据更新等策略，可以显著提升应用的性能和用户体验。</p>
    <p>在实际开发中，开发者应该根据具体场景选择合适的优化策略，避免常见的性能陷阱，充分发挥 Vue 响应式系统的优势。</p>
  </div>
</template>

<style lang="scss" scoped>
@use "./v2Note.scss";
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
}
</style>