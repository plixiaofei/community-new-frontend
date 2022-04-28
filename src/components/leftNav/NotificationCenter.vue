<template>
  <div class="notification-center">
    <h1 style="text-align: left">
      最近收到的通知
    </h1>
    <div v-for="notification in notifications.data">
      <el-row>
        <el-link :underline="false" @click="toOtherUse(notification.fromUser)" style="margin-right: 5px; font-size: 15px">
          {{ notification.fromUser }}
        </el-link>
        于 {{ formatTime(notification.createTime) }} 通知您
      </el-row>
      <el-row class="content">
        <el-link :underline="false" @click="toQuestionPage(notification.questionId)">
          {{ notification.content }}
        </el-link>
      </el-row>
      <el-divider/>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationCenter"
}
</script>

<script setup>
import {formatTime, toQuestionPage, toOtherUse} from "@/config/util";
import {onMounted, reactive} from "vue";
import {getNotification} from "@/config/api";

let notifications = reactive({
  curPage: 1,
  data: []
})
onMounted(() => {
  getNotification({
    curPage: notifications.curPage
  }).then(res => {
    notifications.data = res.data.data
  })
})

</script>

<style scoped>

.notification-center {
  padding: 20px;
}
.content {
  padding: 20px;
}
</style>