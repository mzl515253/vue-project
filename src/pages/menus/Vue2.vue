<template>
  <div class="vue2-knowledge">
    <!-- Element Plus 导航标签 -->
    <el-tabs v-model="activeTab" type="border-card" class="knowledge-tabs">
      <el-tab-pane v-for="item in tabPaneList"  :key="item.name" :label="item.label" :name="item.name">
        <component :is="item.component" :type="type" :items="items" :objects="objects" :message="message" :isVisible="isVisible" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import VueInstance from "@/components/Vue2NoteBook/VueInstance.vue";
import VueResponsive from "@/components/Vue2NoteBook/VueResponsive.vue";
import VueTemplateSyntax from "@/components/Vue2NoteBook/VueTemplateSyntax.vue";
import VueDirectives from "@/components/Vue2NoteBook/VueDirectives.vue";
import VueLifeCycle from "@/components/Vue2NoteBook/VueLifeCycle.vue";
import VueComputedWatch from "@/components/Vue2NoteBook/VueComputedWatch.vue";
import VueComponent from "@/components/Vue2NoteBook/VueComponent.vue";
import VueTransition from "@/components/Vue2NoteBook/VueTransition.vue";
import VueStore from "@/components/Vue2NoteBook/VueStore.vue";
import VueRouters from "@/components/Vue2NoteBook/VueRouters.vue";
import VueMixin from "@/components/Vue2NoteBook/VueMixin.vue";
import VueNextTick from "@/components/Vue2NoteBook/VueNextTick.vue";
import VuePlugin from "@/components/Vue2NoteBook/VuePlugin.vue";
import VueSlot from "@/components/Vue2NoteBook/VueSlot.vue";
import VueEngineering from "@/components/Vue2NoteBook/VueEngineering.vue";
import VueClassStyle from "@/components/Vue2NoteBook/VueClassStyle.vue";
import VueWebPack from "@/components/Vue2NoteBook/VueWebPack.vue";
import VueFilter from "@/components/Vue2NoteBook/VueFilter.vue";
import VueDiff from "@/components/Vue2NoteBook/VueDiff.vue";

export default {
  name: "Vue2Knowledge",
  data: function () {
    return {
      activeTab: "instance",
      type: "A",
      items: [
        { id: "1", name: "张三" },
        { id: "2", name: "李四" },
        { id: "3", name: "王五" },
      ],
      objects:{
        name: '张三',
        age: 18,
        sex: '男'
      },
      message: "Hello Vue!",
      isVisible: true,
      tabPaneList: [
        {
          label: "1. Vue 实例",
          name: "instance",
          component: VueInstance,
        },
        {
          label: "2. 响应式系统",
          name: "reactive",
          component: VueResponsive,
        },
        {
          label: "3. 模板语法",
          name: "template",
          component: VueTemplateSyntax,
        },  
        {
          label: "4. v-指令",
          name: "directives",
          component: VueDirectives,
        }, 
        {
          label: "5. 生命周期钩子",
          name: "lifecycle",
          component: VueLifeCycle,
        },
        {
          label: "6. 组件化开发",
          name: "component",
          component: VueComponent,
        },  
        {
          label: "7. 计算属性与监听器",
          name: "computed",
          component: VueComputedWatch,
        },  
        {
          label: "8. 过滤器",
          name: "filter",
          component: VueFilter,
        },
        {
          label: "9. 过渡与动画",
          name: "transition",
          component: VueTransition,
        },
        {
          label: "10. 动态绑定class和style",
          name: "classStyle",
          component: VueClassStyle,
        },  
        {
          label: "11. Diff 算法",
          name: "diff",
          component: VueDiff,
        },
        {
          label: "12. Vuex 状态管理",
          name: "vuex",
          component: VueStore,
        },    
        {
          label: "13. Vue Router 路由",
          name: "router",
          component: VueRouters,
        },   
        {
          label: "14. mixin混入",
          name: "mixin",
          component: VueMixin,
        },    
        {
          label: "15. $nextTick 方法",
          name: "nextTick",
          component: VueNextTick,
        },    
        {
          label: "16. 自定义插件",
          name: "plugin",
          component: VuePlugin,
        },
        {
          label: "17. 插槽",
          name: "slot",
          component: VueSlot,
        },
        {
          label: "18. Vue工程化分析",
          name: "engineering",
          component: VueEngineering,
        },
        {
          label: "19. 搭建工具配置分析",
          name: "WebPack",
          component: VueWebPack,
        },
 
      ],
    };
  },
  methods: {
    handleClick: function () {
      console.log("按钮被点击");
    },
    handleEvent: function (data) {
      console.log("接收到事件数据:", data);
    },
  },
  computed: {
  },
  watch: {
    message: function (newVal, oldVal) {
      console.log("消息变化:", newVal, oldVal);
    },
  },
  components: {
    VueInstance,
    VueResponsive,
    VueTemplateSyntax,
    VueDirectives,
    VueLifeCycle,
    VueComputedWatch,
    VueComponent,
    VueTransition,
    VueStore,
    VueRouters,
    VueMixin,
    VueNextTick,
    VuePlugin,
    VueSlot,
    VueEngineering,
    VueClassStyle,
    VueWebPack,
    VueFilter,
    VueDiff,
  },
};
</script>

<style scoped>
.vue2-knowledge {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>