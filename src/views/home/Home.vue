<template>
  <el-container>
    <el-header>BLOG Manage</el-header>
    <el-container>
      <el-aside width="210px">
        <el-menu
          :uniqueOpened="true"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          router
          active-text-color="#ffd04b"
          :default-active="activePath">
          <el-sub-menu index="1">
            <template #title>
              <i style="color: #ffffff" class="el-icon-setting"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/write" @click="saveNavState('/write')">
              <i class="el-icon-edit"></i>
              <span>增加新的</span>
            </el-menu-item>
            <el-menu-item index="/edit" @click="saveNavState('/edit')">
              <i class="el-icon-edit-outline"></i>
              <span>修改已有</span>
            </el-menu-item>
            <el-menu-item index="/categroy" @click="saveNavState('/categroy')">
              <i class="el-icon-s-operation"></i>
              <span>分类管理</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <i style="color: #ffffff" class="el-icon-setting"></i>
              <span>选项XX2</span>
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <i style="color: #ffffff" class="el-icon-setting"></i>
              <span>选项XX3</span>
            </template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view  v-slot="{ Component }">
            <keep-alive include="WriteArticle">
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
        </el-main>
        <el-footer>
          <i class="el-icon-lollipop"></i>
          <span>&nbsp;&nbsp;i&nbsp;ZhaoXin</span>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      activePath: ""
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  }
};
</script>

<style scoped lang="scss">
.el-header, .el-footer {
  background-color: #6d84a2;
  color: #ffffff;
  text-align: center;
  height: 60px;
  line-height: 60px;
}

.el-aside {
  //background-color: #545c64;
  text-align: center;
  line-height: 200px;

  .el-menu {
    height: 100%;

    .el-menu-item {
      font-size: 10px;
      float: right;
    }
  }
}

.el-main {
  background-color: #ffffff;
  color: var(--el-text-color-primary);
  min-height: calc(100vh - 120px);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
