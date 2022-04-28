<template>
  <div class="comment">
    <div v-for="comment in comments">
      <div class="comment">
        <el-row>
          <el-col :span="2">
            <div v-if="comment.userVO.username !== undefined">
              <el-image :src="getIcon(comment.userVO.icon)" class="icon"/>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="username">
              <el-link @click="toOtherUse(comment.userVO.username)">
                {{ comment.userVO.username }}
              </el-link>
            </div>
          </el-col>
          <el-col :span="8" :push="11">
            <div class="comment-time">
              发布于 {{ formatTime(comment.commentTime) }}
            </div>
          </el-col>
        </el-row>
        <el-row class="comment-text">
          {{ comment.content }}
        </el-row>
      </div>
      <el-divider/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment"
}
</script>
<script setup>
import {defineProps} from "vue"
import {formatTime, getIcon, toOtherUse} from "@/config/util";

const props = defineProps({
  allComments: Array
})
const comments = props.allComments

</script>

<style scoped>
.comment {
  margin: 30px 10px;
}
.username {
  font-size: 15px;
  margin: 5px;
  text-align: left
}

.icon {
  width: 30px;
  height: 30px;
}

.comment-time {
  font-size: 15px;
  margin: 5px;
}
.comment-text {
  margin: 10px 20px;
}
</style>