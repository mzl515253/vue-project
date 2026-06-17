<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->

    <aside class="sidebar" :class="{ 'collapsed': isMenuCollapsed }">
      <div class="sidebar-header">
        <h1 class="logo">
          <span v-show="!isMenuCollapsed">前端笔记菜单</span>
          <span v-show="isMenuCollapsed">前</span>
        </h1>
      </div>
      <nav class="menu">
        <ul>
          <template v-for="menu in menus" :key="menu.path">
            <li :class="['menu-item', {'active': menu.path === route.path}]">
              <router-link :to="menu.path">
                <i class="icon">{{ menu.icon }}</i>
                <span v-if="!isMenuCollapsed">{{ menu.title }}</span>
              </router-link>
            </li>
          </template>
        </ul>
      </nav>
    </aside>
    
    <!-- 右侧内容 -->
    <main class="content">
      <!-- 顶部导航 -->
      <header class="content-header">
        <div class="header-left">
          <button class="menu-toggle" @click="toggleMenu">☰</button>
          <h2 class="page-title">
            {{ pageTitle }}
          </h2>
        </div>
        <div class="header-right">
          <div class="user-info">
            <span class="user-name">Admin</span>
            <div class="user-avatar">A</div>
          </div>
        </div>
      </header>
      <!-- 内容区域 -->
      <div class="content-body">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import useMenusHook from '@/pages/Hooks/useMenusHook'

const {menus} = useMenusHook()

const route = useRoute()

// 根据当前路由计算页面标题
const pageTitle = computed(() => {
  const titleMap: Record<string, string> = {
    '/layout/Vue2': 'Vue2笔记',
    '/layout/Vue3': 'Vue3笔记',
    '/layout/ts': 'TS笔记',
    '/layout/dashboard': '仪表盘',
    '/layout/text8': '7+1股文',
    '/layout/products': '产品管理',
    
  }
  return titleMap[route.path] || '后台管理'
})

// 菜单展开/收起状态
const isMenuCollapsed = ref(false)

// 切换菜单展开/收起
const toggleMenu = () => {
  isMenuCollapsed.value = !isMenuCollapsed.value
}
</script>

<style lang='scss' scoped>
.layout-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
  
  .sidebar {
      width: 250px;
      background-color: #2c3e50;
      color: #ecf0f1;
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;
      
      &.collapsed {
        width: 80px;
        
        .sidebar-header {
          padding: 20px 0;
          text-align: center;
          
          .logo {
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
          }
        }
        
        .menu {
          .menu-item {
            a {
              justify-content: center;
              
              .icon {
                margin-right: 0;
              }
            }
          }
        }
      }
      
      .sidebar-header {
        padding: 20px;
        border-bottom: 1px solid #34495e;
        transition: all 0.3s ease;
        
        .logo {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
          transition: all 0.3s ease;
        }
      }
    
    .menu {
      flex: 1;
      padding: 20px 0;
      
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .menu-item {
        margin: 5px 0;
        
        a {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: #bdc3c7;
          text-decoration: none;
          transition: all 0.3s ease;
          
          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            color: #ecf0f1;
          }
          
          .icon {
            margin-right: 12px;
            font-size: 18px;
          }
        }
        
        &.active {
          a {
            background-color: #3498db;
            color: #ffffff;
          }
        }
      }
    }
  }
  
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f5f7fa;
    overflow: hidden;
    
    .content-header {
      height: 60px;
      background-color: #ffffff;
      border-bottom: 1px solid #e4e7ed;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      
      .header-left {
        display: flex;
        align-items: center;
        
        .menu-toggle {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          margin-right: 20px;
          color: #606266;
        }
        
        .page-title {
          font-size: 18px;
          font-weight: 500;
          margin: 0;
          color: #303133;
        }
      }
      
      .header-right {
        .user-info {
          display: flex;
          align-items: center;
          
          .user-name {
            margin-right: 10px;
            color: #606266;
          }
          
          .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: #409eff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
    
    .content-body {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
  }
}

// 路由切换动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>