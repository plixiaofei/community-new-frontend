<template>
  <div class="topNav">
    <el-menu
        :default-active="$route.name"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
    >
      <el-menu-item index="#">
        <el-image src="logo.png" style="width: 50px; height: 55px; padding: 0; margin: 0"/>
      </el-menu-item>
      <el-menu-item index="/">
        主页
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>资源</template>
        <el-menu-item index="2-1">
          主页
        </el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>

      <!--      搜索栏-->
      <div class="nav-right search"
      >
        <el-popover placement="bottom"
                    :width="300">
          <template #reference>
            <el-input v-model="word"
                      size="default"
                      style="width: 300px"
                      v-model:visible="visible"
                      @input="search(word)"
                      placeholder="请输入要搜索的内容" clearable/>
          </template>
          <div v-if="errorMsg !== ''">
            {{ errorMsg }}
          </div>
          <div v-else v-for="res in searchQuestions.data">
            <el-button type="text" @click="toDetailed(res.id)">
              {{ res.title }}
            </el-button>
          </div>
        </el-popover>
      </div>

      <div v-if="userInfo.username !== ''" class="nav-right">
        <el-sub-menu index="#">
          <template #title>
            <el-image :src="getIcon(userInfo.icon)"
                      fit="contain"
                      class="icon"/>
          </template>
          <el-menu-item index="/profiler">
            个人中心
          </el-menu-item>
          <el-menu-item index="#" @click="userLogout()">
            退出登录
          </el-menu-item>
        </el-sub-menu>
      </div>

      <div v-else class="nav-right">
        <el-menu-item index="/login">
          登陆
        </el-menu-item>
      </div>

    </el-menu>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed, reactive, ref, watch} from "vue";
import {logout, searchQuestion} from "@/config/api";
import router from "@/router";
import {getIcon} from "@/config/util";

const store = useStore();

store.commit("loadUserInfo")

const userInfo = computed(
    () => store.getters.userInfo
)

const userLogout = () => {
  logout().then(() => {
    store.commit("delToken")
    store.commit("delUserInfo")
    router.go(0)
  })
}

// 搜索相关
let word = ref("")
let visible = ref(false)
watch(word, () => {
  visible.value = false
  visible.value = word.value.length > 0
})

let searchQuestions = reactive({
  data: ""
})
let errorMsg = ref("")
const search = (word) => {
  searchQuestion({
    word: word
  }).then(res => {
    const response = res.data
    if (response.code !== 200) {
      errorMsg.value = "'" + word + "' 未被检索到"
    } else {
      errorMsg.value = ""
      searchQuestions.data = response.data
    }
  }).catch(() => {
  })
}

const toDetailed = (questionId) => {
  router.push({name: "question", params: {questionId: questionId}}).catch(() => {})
}
</script>

<style scoped>
/* 左边留白 */
.el-menu--horizontal > .el-menu-item.nav-right {
  margin-left: auto;
}

.el-menu--horizontal > .el-sub-menu.nav-right {
  margin-left: auto;
}

.nav-right {
  margin-left: auto;
}

.icon {
  width: 55px;
  height: 55px;
  margin-right: 20px;
  margin-top: 3px;
}

.search {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>