<template>
  <div class="reply-center">
    <h1 style="text-align: left">
      最近收到的回复
    </h1>
    <div v-for="reply in comments.data">
      <el-row>
        <el-link :underline="false" @click="toOtherUse(reply.userVO.username)" style="margin-right: 5px; font-size: 15px">
          {{ reply.userVO.username }}
        </el-link>
        于 {{ formatTime(reply.commentTime) }} 回复您的问题 "{{ reply.questionTitle }}"
      </el-row>
      <el-row class="content">
        <el-link :underline="false" @click="toQuestionPage(reply.questionId)">
          {{ reply.content }}
        </el-link>
      </el-row>
      <el-divider/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReplyCenter"
}
</script>

<script setup>
import {formatTime, toQuestionPage, toOtherUse} from "@/config/util";
import {onMounted, reactive} from "vue";
import {getCommentsByUsername, getDetailedQuestion, getNotification} from "@/config/api";

let comments = reactive({
  curPage: 1,
  data: []
})
onMounted(async () => {
  await getCommentsByUsername({
    curPage: comments.curPage
  }).then(async res => {
    comments.data = res.data.data
    for (let i = 0; i < comments.data.length; i++) {
      await getDetailedQuestion({
        questionId: comments.data[i].questionId
      }).then(res => {
        comments.data[i].questionTitle = res.data.data.title
      })
    }
  })
})

</script>

<style scoped>

.reply-center {
  padding: 20px;
}
.content {
  padding: 20px;
}
</style>