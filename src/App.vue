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
          <el-main>
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

.header {
  padding: 0 !important;
}

.container {
  height: 100%;
  width: 100%;
}

.left-nav {
  margin: 50px 10px
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