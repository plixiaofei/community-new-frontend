<template>
  <div class="question">
    <Question :id="questionId" :key="questionId"/>
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
import {ref, watch} from "vue";
let questionId = ref("")

if (router.options.history.base === "/#") {
  questionId.value = router.currentRoute.value.params
}
watch(() => router.currentRoute.value, (to, from) => {
  questionId.value = to.params
})
</script>

<style scoped>

</style>