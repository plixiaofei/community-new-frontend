<template>
  <div class="otherUserView">
    <!--      行-->
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="6">
            <div v-if="userInfo.data.icon !== undefined" class="bigIcon">
              <el-image :src="getIcon(userInfo.data.icon)"
                        fit="contain"
                        class="bigIcon">
              </el-image>
            </div>
            <div class="nickName">
              <h1>
                {{ userInfo.data.nickName }}
              </h1>
            </div>
          </el-col>

          <!--       发过的帖子    -->
          <el-col :offset="1"
                  :span="17">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>该用户最近发帖</span>
                </div>
              </template>
              <div v-for="curQuestion in curQuestions.data" :key="curQuestion.id">
                <div class="question-title">
                  <el-button type="text" class="question-title" @click="toDetailed(curQuestion.id)">
                    {{ curQuestion.title }}
                  </el-button>
                </div>
                <div class="question-short-description">
                  {{ curQuestion.shortDescription }}
                </div>
                <div class="question-create-time">
                   发布于 {{ formatTime(curQuestion.createTime) }}
                </div>
              </div>
            </el-card>

          </el-col>
        </el-row>
      </el-main>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "OtherUserView"
}
</script>

<script setup>
import {getIcon, formatTime} from "@/config/util";
import router from "@/router";
import {onMounted, reactive} from "vue";
import {getUserInfo, listUserQuestions} from "@/config/api";

const username = router.currentRoute.value.params
let userInfo = reactive({
  data: ""
})

let curQuestions = reactive({
  data: ""
})
onMounted(() => {
  getUserInfo(username).then(res => {
    userInfo.data = res.data.data
  })
  listUserQuestions(username).then(res => {
    curQuestions.data = res.data.data
  })
})

const toDetailed = (questionId) => {
  router.push({name: "question", params: {questionId: questionId}})
}

</script>

<style scoped>
.otherUserView {
  width: 100%;
  height: 100%;
}

.bigIcon {
  width: 100%;
  border-radius: 50%;
}

.nickName {
  font-size: 24px;
  line-height: 1.25;
  text-align: left;
  margin-left: 10px;
}

/* question 相关 */
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