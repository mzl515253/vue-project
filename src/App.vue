<template>
<div>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>

</template>

<script setup lang="ts">
// App.vue 是根组件，<keep-alive> 包裹的是其子组件 <router-view>，
// 而非 App 自身，因此 onActivated/onDeactivated 不会触发，无需引入。
</script>

<style  lang="scss" scoped>

 * {
  margin: 0px;
  padding: 0px;
}
 
</style>
