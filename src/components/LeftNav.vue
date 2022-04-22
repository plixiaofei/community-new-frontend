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
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
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
  background-color: rgb(67, 74, 80);
}
</style>
