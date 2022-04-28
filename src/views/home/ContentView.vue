<template>
  <div class="container">
    <el-container style="height: 100%">
      <el-main>
        <div v-if="questions.data === null">
          <el-skeleton :rows="2" animated/>
        </div>
        <div v-else v-for="question in questions.data">
          <div class="question-card">
            <div class="question-title">
              <el-button type="text" class="question-title" @click="toQuestionPage(question.id)">
                {{ question.title }}
              </el-button>
            </div>
            <div class="question-short-description">
              {{ question.shortDescription }}
            </div>
            <div class="question-create-time">
              {{ question.username }} 发布于 {{ formatTime(question.createTime) }}
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div v-if="questions.count !== -1">
          <el-pagination
              layout="prev, pager, next"
              :total="pages.totalCount"
              :page-size="pages.pageSize"
              @current-change="handleCurrentChange"
          />
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "ContentView"
}
</script>

<script setup>
import {onMounted, reactive} from "vue";
import {getQuestionCount, getUserInfo, listQuestion} from "@/config/api";
import {formatTime, toQuestionPage} from "@/config/util";
import router from "@/router";

let questions = reactive({
  data: []
})

let userInfo = reactive({
  data: []
})

let pages = reactive({
  pageSize: 8,
  curPage: 1,
  totalCount: 1
})

// 吐槽自己，可以在后端返回 VO 时加一列 username
onMounted(async () => {
  await listQuestion({
    curPage: pages.curPage
  }).then(async (res) => {
    questions.data = res.data.data
    for (let i = 0; i < questions.data.length; i++) {
      await getUserInfo({
        username: questions.data[i].username
      }).then(res => {
        questions.data[i].username = res.data.data.username
      })
    }
  })
  getQuestionCount().then(res => {
    pages.totalCount = res.data.data
  })
})


const handleCurrentChange = async (page) => {
  await listQuestion({
    curPage: page
  }).then(async (res) => {
    questions.data = res.data.data
    for (let i = 0; i < questions.data.length; i++) {
      await getUserInfo({
        username: questions.data[i].username
      }).then(res => {
        questions.data[i].username = res.data.data.username
      })
    }
  })
}

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.question-title {
  font-size: 24px;
  text-align: left;
}

.question-short-description {
  text-align: left;
  line-height: 30px;
}

.question-create-time {
  text-align: right;
  font-size: 10px;
}

</style>