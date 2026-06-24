import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css' // 引入主题样式
import 'prismjs/components/prism-javascript' // 引入需要的语言包
import 'prismjs/components/prism-typescript'
// import 'prismjs/components/prism-html'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-bash'
// 可以继续引入其他需要的语言包

// 自定义指令
const PrismDirective = {
  mounted(el: HTMLElement, binding: { value: string }): void {
    highlight(el, binding)
  },
  updated(el: HTMLElement, binding: { value: string }): void {
    highlight(el, binding)
  }
}

function highlight(el: HTMLElement, binding: { value: string }): void {
  // 从绑定值获取语言类型，或从 class 属性提取
  const language = binding.value ||
    el.className.match(/language-(\w+)/)?.[1] ||
    'markup'

  // 移除旧的 language-* 类，添加新的（保留其他 CSS 类不被覆盖）
  el.classList.forEach(cls => {
    if (cls.startsWith('language-')) {
      el.classList.remove(cls)
    }
  })
  el.classList.add(`language-${language}`)

  try {
    Prism.highlightElement(el)
  } catch (e) {
    console.warn('Prism highlight failed:', e)
  }
}

export default PrismDirective
