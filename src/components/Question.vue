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
          <div class="nickName">
            <el-link @click="otherUserInfo(detailedQuestion.data.username)">
              {{ questionUserInfo.data.nickName }}
            </el-link>
          </div>
        </el-col>
        <el-col :span="8">
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
import {getIcon, formatTime} from "@/config/util";
import {onMounted, reactive} from "vue";
import router from "@/router";
import {getDetailedQuestion, getUserInfo} from "@/config/api";

const props = defineProps({
  id: ""
})
const questionId = props.id
console.log(questionId)
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

// 其他用户, 用户名唯一
const otherUserInfo = (username) => {
  router.push({name: 'user', params: {username: username}})
}
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

.question-detail-info-userInfo .nickName {
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