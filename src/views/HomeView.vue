<template>
  <div class="home">
    <el-container class="container">
      <el-aside>
        <LeftNav />
      </el-aside>

      <el-main>
        <ContentView />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeView"
}
</script>

<script setup>
import { useStore } from 'vuex'
import ContentView from "@/views/home/ContentView";
import LeftNav from "@/components/LeftNav";
const store = useStore();
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
}
</style>