<script setup lang="ts"></script>

<template>
<div>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>

</template>

<script setup lang="ts">
import { onActivated,onDeactivated} from "vue";


onActivated(() => {
  console.log('组件被激活了')
})
onDeactivated(() => {
  console.log('组件被停用了')
})  
</script>

<style  lang="scss" scoped>

 * {
  margin: 0px;
  padding: 0px;
  background: red;
}

</style>
