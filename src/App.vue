<template>
  <div id="app" class="app">
    <el-container class="container">
      <el-header class="header">
        <TopNav />
      </el-header>
        <el-container>
          <el-aside width="250px" class="left-nav">
            <LeftNav />
          </el-aside>
          <el-main class="main">
            <router-view />
          </el-main>
        </el-container>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app {
  height: 100%;
  width: 100%;
  min-width: 800px;
  min-height: 600px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  height: 100%;
  width: 100%;
}

.header {
  padding: 0 !important;
  position: relative;
  width: 100%;
  height: 60px;
}

.left-nav {
  margin: 50px 10px;
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}

.main {
  position: absolute;
  left: 270px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}
</style>
<script>
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer"
import LeftNav from "@/components/LeftNav";

export default {
  components: {LeftNav, TopNav, Footer}
}
</script>