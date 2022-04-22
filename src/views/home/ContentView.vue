<template>
  <div class="container">
    <div v-if="questions.data === null">
      <el-skeleton :rows="2" animated/>
    </div>
    <div v-else v-for="question in questions.data">
      <div class="question-card">
        <div class="question-title">
          <el-button type="text" class="question-title" @click="toDetailed(question.id)">
            {{ question.title }}
          </el-button>
        </div>
        <div class="question-short-description">
          {{ question.shortDescription }}
        </div>
        <div class="question-create-time">
          {{ question.nickName }} 发布于 {{ formatTime(question.createTime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentView"
}
</script>

<script setup>
import {onMounted, reactive} from "vue";
import {getUserInfo, listQuestion} from "@/config/api";
import {formatTime} from "@/config/util";
import router from "@/router";

let questions = reactive({
  data: []
})

let userInfo = reactive({
  data: []
})

// 吐槽自己，可以在后端返回 VO 时加一列 nickName
onMounted(async () => {
  console.log("==")
  await listQuestion({
    curPage: 1
  }).then(async (res) => {
    questions.data = res.data.data
    for (let i = 0; i < questions.data.length; i++) {
      await getUserInfo({
        username: questions.data[i].username
      }).then(res => {
        questions.data[i].nickName = res.data.data.nickName
      })
    }
  })
})

const toDetailed = (questionId) => {
  router.push({name: "question", params: {questionId: questionId}})
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

.question-title-style {
  color: black;
}
</style>