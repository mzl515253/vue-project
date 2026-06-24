<template>
  <div  class="text8-knowledge" >
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

<script setup lang='ts'>
import { reactive, toRefs } from 'vue'
import Vue2_8text from '@/components/8TEXT/Vue2_8text.vue'
import Vue3_8text from '@/components/8TEXT/Vue3_8text.vue'
import TS_8text from '@/components/8TEXT/TS_8text.vue'



const data= reactive({
  activeTab: 'tab1',
  tabPaneList:[
    {
      name:'tab1',
      label:'Vue2_八股系列',
      component:Vue2_8text
    },
    {
      name:'tab2',
      label:'Vue3_八股系列',
      component:Vue3_8text
    },
    {
      name:'tab3',
      label:'TS_八股系列',
      component:TS_8text
    },
  ]

})
const {activeTab,tabPaneList}= toRefs(data)
</script>

<style lang='scss' scoped>

</style>