<template>
  <el-container>
    <el-header>BLOG Admin</el-header>
    <el-container>
      <el-aside width="210px">
        <el-menu
          :uniqueOpened="true"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-sub-menu index="1">
            <template #title>
              <i style="color: #ffffff" class="el-icon-setting"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-edit"></i>
              <span>开始创作</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-edit-outline"></i>
              <span>修改已有</span>
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
        <el-main>Main</el-main>
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
  components: {}
};
</script>

<style scoped lang="scss">
.el-header, .el-footer {
  background-color: #86a8d3;
  color: #ffffff;
  text-align: center;
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
  text-align: center;
  line-height: 160px;
  height: 100vh;
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
