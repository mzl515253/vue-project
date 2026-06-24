# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # 启动开发服务器 (Vite)
npm run build        # 类型检查 + 生产构建
npm run type-check   # 仅类型检查 (vue-tsc)
npm run test:unit    # 运行 Vitest 单元测试
npm run preview      # 预览生产构建
```

- 路径别名 `@` 指向 `src/`
- 使用 pnpm 作为包管理器

## Architecture

这是一个 Vue 3 前端学习笔记应用，使用 Element Plus 作为 UI 库，以侧边栏布局展示 Vue2/Vue3/TypeScript 知识点。

### 路由结构

单一路由入口 `/layout`，其下为侧边栏子路由：

| 路径 | 用途 |
|------|------|
| `/layout/Vue2` | Vue2 笔记 |
| `/layout/Vue3` | Vue3 笔记 |
| `/layout/ts` | TypeScript 笔记 |
| `/layout/text8` | 面试八股文 |
| `/layout/dashboard` | 仪表盘 |
| `/layout/products` | 产品管理 |

根路径 `/` 重定向到 `/layout`。

### 目录职责

- `src/pages/layout.vue` — 主布局（可折叠侧边栏 + 顶栏 + `<router-view>` 内容区），所有子页面在此渲染
- `src/pages/menus/*.vue` — 各菜单对应的路由页面，负责将组件编排为笔记章节
- `src/components/Vue2NoteBook/*.vue` — Vue2 各个知识点的笔记组件（响应式、生命周期、插槽、路由、Vuex、Diff 等）
- `src/components/Vue3NoteBook/*.vue` — Vue3 各个知识点的笔记组件（Composition API、响应式、Teleport、Suspense 等）
- `src/components/8TEXT/*.vue` — 面试八股文相关组件
- `src/stores/` — Pinia stores（`counter.ts` 示例；`resApiInteraction.ts` 存储 API/工具键名）
- `src/pages/Hooks/` — 可组合函数（`useMenusHook.ts` 定义侧边栏菜单项；`useAnchor.ts` 锚点逻辑）
- `src/directive/prism.ts` — 自定义 `v-prism` 指令，使用 PrismJS 对代码块做语法高亮
- `src/router/index.ts` — Vue Router 配置，使用 `createWebHistory`

### 关键模式

- **状态管理**: 全部使用 Pinia Setup Store 语法（`defineStore` + Composition API）
- **样式**: SCSS，组件内 `<style scoped lang="scss">`
- **测试**: Vitest + `@vue/test-utils`，测试文件位于 `src/__tests__/`
- **Element Plus**: 全局注册（`app.use(ElementPlus)`），所有组件可直接使用
- **keep-alive**: `App.vue` 中对 `<router-view>` 做了缓存
