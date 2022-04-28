<template>
  <div class="question">
    <Question :id="questionId" :key="questionId.questionId"/>
    <el-form>
      <el-row class="comment">
        <el-col :span="21">
          <el-input v-model="comments.content"
                    :placeholder="inputPlaceholder"
                    @keydown.enter="submitComment"
                    rows="5"/>
        </el-col>
        <el-col :span="3">
          <el-button type="primary"
                     @click="submitComment"
                     style="float:right;">
            提交评论
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <Comment :allComments="allComments.data" :key="allComments.data"/>
  </div>
</template>

<script>
export default {
  name: "QuestionView"
}
</script>
<script setup>
import Question from "@/components/Question";
import router from "@/router";
import {onMounted, reactive, ref, watch} from "vue";
import Comment from "@/components/Comment";
import {comment, getCommentsByQuestionId} from "@/config/api";

let questionId = ref("")

if (router.options.history.base === "/#") {
  questionId.value = router.currentRoute.value.params
}
watch(() => router.currentRoute.value, (to, from) => {
  questionId.value = to.params
})

// 读取所有评论
let allComments = reactive({
  data: []
})
onMounted(async () => {
  await getCommentsByQuestionId(questionId.value).then(res => {
    allComments.data = res.data.data
  })
})

// 提交
let comments = reactive({
  questionId: questionId.value.questionId,
  content: "",
})

let inputPlaceholder = ref("请输入要评论的内容")

const submitComment = () => {
  if (comments.content === "") {
    inputPlaceholder.value = "不能提交空评论"
  } else {
    comment(comments).then(res => {
      comments.content = ""
      const returnedComment = res.data.data
      allComments.data.unshift(returnedComment)
    })
  }
}



</script>

<style scoped>
.comment {
  margin: 30px 10px;
}

</style>