<template>
  <div class="list-questions">
    <div v-if="questions.data.length === 0">
      <h1>当前没有待解决问题</h1>
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
  </div>
</template>

<script>
export default {
  name: "ListQuestions"
}
</script>

<script setup>
import {defineProps, onMounted, reactive} from "vue";
import router from "@/router";
import {getUserInfo} from "@/config/api";
import {formatTime, toQuestionPage} from "@/config/util";

const props = defineProps({
  list: ""
})

let questions = reactive({
  data: props.list
})
let userInfo = reactive({
  data: []
})

onMounted(async () => {
  for (let i = 0; i < questions.data.length; i++) {
    await getUserInfo({
      username: questions.data[i].username
    }).then(res => {
      questions.data[i].username = res.data.data.username
    })
  }
})

</script>

<style scoped>
.list-questions {
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