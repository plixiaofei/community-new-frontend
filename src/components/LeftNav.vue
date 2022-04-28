<template>
  <div class="left">
    <el-menu
        :default-active="$route.name"
        class="el-menu-demo"
        mode="vertical"
        router
    >
      <el-menu-item index="/publishQuestion">
        发布问题
      </el-menu-item>
      <el-menu-item index="/">
        所有问题
      </el-menu-item>
      <el-menu-item index="/notificationCenter">
        通知中心
      </el-menu-item>
      <el-menu-item index="/replyCenter">回复中心</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "LeftNav"
}
</script>

<style scoped>
.left {
  width: 100%;
  height: 100%;
}
.normal {

}

.red {
  color: red;
}
</style>
