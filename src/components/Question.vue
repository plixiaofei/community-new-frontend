<template>
  <el-card>
    <div class="question-detail-title">
      {{ detailedQuestion.data.title }}
    </div>

    <div class="question-detail-info-userInfo">
      <el-row>
        <el-col :span="2">
          <div v-if="questionUserInfo.data.username !== undefined">
            <el-image :src="getIcon(questionUserInfo.data.icon)" class="icon"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="username">
            <el-link @click="toOtherUser(detailedQuestion.data.username)">
              {{ questionUserInfo.data.username }}
            </el-link>
          </div>
        </el-col>
        <el-col :span="8" :push="10">
          <div class="createTime">
            发布于 {{ formatTime(detailedQuestion.data.createTime) }}
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="question-detail-fullDescription">
      <v-md-preview :text="detailedQuestion.data.fullDescription" />
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Question",
}
</script>

<script setup>
import {getIcon, formatTime, toOtherUser} from "@/config/util";
import {onMounted, reactive} from "vue";
import router from "@/router";
import {getDetailedQuestion, getUserInfo} from "@/config/api";

const props = defineProps({
  id: ""
})
const questionId = props.id
let detailedQuestion = reactive({
  data: ""
})

let questionUserInfo = reactive({
  data: ""
})

onMounted(async () => {
  await getDetailedQuestion(questionId).then(res => {
    detailedQuestion.data = res.data.data
  }).then(async () => {
    await getUserInfo({
      username: detailedQuestion.data.username
    }).then((res) => {
      questionUserInfo.data = res.data.data
    })
  })
})


</script>

<style scoped>
.question-detail-title {
  font-size: 40px;
  text-align: left;
  margin-bottom: 20px;
}

/* 内嵌 */
.question-detail-info-userInfo .icon {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.question-detail-info-userInfo .username {
  font-size: 15px;
  margin: 5px;
  text-align: left;
}

.question-detail-info-userInfo .createTime {
  font-size: 15px;
  margin: 5px;
}

.question-detail-fullDescription {
  font-size: 18px;
  text-align: left;
  margin: 20px 10px;
}
</style>