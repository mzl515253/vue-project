<template>
  <div class="vue3-knowledge">
    <!-- Element Plus 导航标签 -->
    <el-tabs v-model="activeTab" type="border-card" class="knowledge-tabs">
      <el-tab-pane  
      v-for="tabPane in tabPaneList" 
      :key="tabPane.name" 
      :name="tabPane.name"   
      :label="tabPane.label" >
        <component :is="tabPane.component"  />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import Vue3CompositionApi from '@/components/Vue3NoteBook/Vue3CompositionApi.vue';
import Vue3Responsive from '@/components/Vue3NoteBook/Vue3Responsive.vue';
import Vue3SetupSyntacticSugar from '@/components/Vue3NoteBook/Vue3SetupSyntacticSugar.vue';
import Vue3LifeCycle from '@/components/Vue3NoteBook/Vue3LifeCycle.vue';
import Vue3ResPonApi from '@/components/Vue3NoteBook/Vue3ResPonApi.vue';
import Vue3ComponentCommunication from '@/components/Vue3NoteBook/Vue3ComponentCommunication.vue';
import Vue3Teleport from '@/components/Vue3NoteBook/Vue3Teleport.vue';
import Vue3Suspense from '@/components/Vue3NoteBook/Vue3Suspense.vue';
import Vue3ResPonCache from '@/components/Vue3NoteBook/Vue3ResPonCache.vue';
import Vue3Fragment from '@/components/Vue3NoteBook/Vue3Fragment.vue';
import Vue3Router from '@/components/Vue3NoteBook/Vue3Router.vue';
import Vue3Directives from '@/components/Vue3NoteBook/Vue3Directives.vue';

import {storeToRefs} from 'pinia'
import { useResApiInteractionStore } from '@/stores/resApiInteraction'  

const resApiInteractionStore = useResApiInteractionStore()
const {NameApiKey, NameToolKey} = storeToRefs(resApiInteractionStore)

const activeTab = ref('composition-api')
const tabPaneList= reactive([
  {
    label: '1. Composition API',
    component: Vue3CompositionApi,
    name: 'composition-api',
  },
  {
    label: '2. Setup 语法糖',
    component: Vue3SetupSyntacticSugar,
    name: 'setup-syntax',
  },
  
  {
    label: '3.响应式系统',
    component: Vue3Responsive,
    name: 'reactive-system',
  },
    {
    label: '4. 响应式 API',
    component: Vue3ResPonApi,
    name: 'reactive-api',
  },
  {
    label: '5. 响应式缓存',
    component: Vue3ResPonCache,
    name: 'reactive-cache',
  },
  {
    label: '6. 自定义指令',
    component: Vue3Directives,
    name: 'directives',
  },
  {
    label: '7. 生命周期钩子',
    component: Vue3LifeCycle,
    name: 'lifecycle',
  },
  {
    label: '8. 组件通信',
    component: Vue3ComponentCommunication,
    name: 'component-communication',
  },
  {
    label: '9. 路由',
    component: Vue3Router,
    name: 'router',
  },

  {
    label: '10. Teleport',
    component: Vue3Teleport,
    name: 'teleport',
  },
  {
    label: '11. Suspense',
    component: Vue3Suspense,
    name: 'suspense',
  },
  {
    label: '12. Fragment',
    component: Vue3Fragment,
    name: 'fragment',
  },
])
  watchEffect(() => {
    if(NameApiKey.value || NameToolKey.value) {
      activeTab.value = 'reactive-api'
    }else{
      activeTab.value = 'composition-api'
    }
  })
</script>

<style lang="scss" scoped>
.vue3-knowledge {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.knowledge-tabs {
  margin-top: 20px;
}

.tab-content {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 0 0 8px 8px;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #42b983;
}

h3 {
  color: #444;
  margin-top: 25px;
  margin-bottom: 15px;
}

h4 {
  color: #555;
  margin-top: 20px;
  margin-bottom: 10px;
}

p {
  line-height: 1.6;
  margin-bottom: 15px;
  color: #666;
}

.code-block {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 4px;
  margin: 15px 0;
  overflow-x: auto;
}

pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

code {
  color: #333;
}

ul {
  margin: 10px 0;
  padding-left: 20px;
  color: #666;
}

li {
  margin-bottom: 8px;
  line-height: 1.5;
}

strong {
  color: #42b983;
  font-weight: 600;
}

ol {
  margin: 10px 0;
  padding-left: 20px;
  color: #666;
}

ol li {
  margin-bottom: 8px;
  line-height: 1.5;
}
</style>