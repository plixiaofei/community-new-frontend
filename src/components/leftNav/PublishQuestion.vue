<template>
  <div class="publish-question">
    <el-form :model="questionInfo"
             :rules="rules"
             ref="ruleFormRef"
    >
      <el-form-item label="问题标题" prop="title">
        <el-input v-model="questionInfo.title"
                  placeholder="请输入问题标题（可被搜索的字段）"
        />
      </el-form-item>
      <el-form-item label="简单说明" prop="shortDescription">
        <el-input v-model="questionInfo.shortDescription"
                  placeholder="请输入问题简单描述（可被搜索的字段）"
        />
      </el-form-item>
      <el-form-item class="md" prop="fullDescription">
        <v-md-editor v-model="questionInfo.fullDescription"
                     @upload-image="handleUploadImage"
                     placeholder="请输入问题详细描述"
                     :disabled-menus="[]"
                     height="500px"
                     />

      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary"
                   @click="submitForm(ruleFormRef)">
          提交问题
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "PublishQuestion"
}
</script>

<script setup>

import {reactive, ref, watch} from "vue";
import {publishQuestion, uploadImg} from "@/config/api";
import {getQuestionCallBack} from "@/config/util";
import {ElMessage} from "element-plus";
import router from "@/router";


// 问题相关
let questionInfo = reactive({
  title: "",
  shortDescription: "",
  fullDescription: "",
})
watch(questionInfo, () => {
  console.log(questionInfo.fullDescription)
})

const handleUploadImage = async (event, insertImage, files) => {
  if (files[0].size / 1000 / 1000 > 2) {
    ElMessage({
      message: "上传图片不能超过 2 M",
      type: "warning"
    })
  } else {
    // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
    let uploadForm = new FormData();
    let imgUrl = ""
    uploadForm.append("questionImg", files[0])
    await uploadImg(uploadForm).then(res => {
      imgUrl = getQuestionCallBack(res.data.data);
      console.log(imgUrl)
    })

    // 此处只做示例
    insertImage({
      url: imgUrl,
      desc: 'Description',
      // width: 'auto',
      // height: 'auto',
    })
  }
}

// 表格验证
const ruleFormRef = ref()
const rules = reactive({
  title: [
    {
      required: true,
      message: "请输入问题标题",
      trigger: "blur"
    },
    {
      min: 3,
      max: 20,
      message: "标题必须控制在 3 - 20 字之内",
      trigger: "blur"
    }
  ],
  shortDescription: [
    {
      required: true,
      message: "请输入问题简单描述",
      trigger: "blur"
    },
    {
      min: 3,
      max: 20,
      message: "问题简单描述必须控制在 3-20 字之内",
      trigger: "blur"
    }
  ],
  fullDescription: [
    {
      required: true,
      message: "问题详细描述不能为空",
      trigger: "blur"
    }
  ]
})
// 提交问题
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      publishQuestion(questionInfo).then(res => {
        ElMessage({
          message: "问题发布成功，即将跳转到主页",
          type: "success"
        })
        router.push("/")
      })
    }
  })
}


</script>

<style scoped>
.md {
  text-align: left;
}
</style>