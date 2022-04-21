<template>
  <div class="profiler">
    <el-container>
      <el-main>
        <!--      行-->
        <el-row>
          <el-col :span="6">
            <el-popover trigger="click"
                        width="300px"
                        placement="right">
              <template #reference>
                <el-image :src="getIcon(userInfo.icon)"
                          alt="点击修改头像"
                          fit="contain"
                          class="bigIcon">
                </el-image>
              </template>
              <el-form>
                <el-form-item>
                  <el-upload
                      ref="uploadRef"
                      class="upload-demo"
                      action="#"
                      :auto-upload="false"
                      :on-change="handleChange"
                  >
                    <template #trigger>
                      <el-button>select file</el-button>
                    </template>

                    <el-button type="primary" @click="submitUpload">
                      upload to server
                    </el-button>

                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-popover>
            <div v-if="showChangeArea === false" class="nickName">
              <h1>
                {{ userInfo.nickName }}
              </h1>
              <el-button plain
                         size="large"
                         class="changeButton"
                         @click="openChange()">
                修改个人信息
              </el-button>
            </div>
            <div v-else class="nickName">
              <el-form :model="userForm">
                <el-form-item>
                  <p class="pTag">
                    名字
                  </p>
                  <el-input :placeholder="userInfo.nickName"
                            v-model="userForm.nickName"/>
                </el-form-item>
                <el-form-item class="is-justify-space-between">
                  <el-button type="primary" @click="applyChange()">确认修改</el-button>
                  <el-button @click="cancelChange()">暂不修改</el-button>
                </el-form-item>
              </el-form>
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
  name: "ProfilerView"
}
</script>
<script setup>
import {computed, ref, reactive, onMounted} from "vue";
import {useStore} from "vuex";

import {changeUserInfo, changeUserIcon, getUserInfo, listUserQuestions} from "@/config/api";
import {getIcon, formatTime} from "@/config/util";
import router from "@/router";

const store = useStore();
store.commit("loadUserInfo")
const userInfo = computed(
    () => store.getters.userInfo
)
// ref 用 .value 取值
let showChangeArea = ref(false)

const openChange = () => {
  showChangeArea.value = true
}

// userForm
let userForm = reactive({
  username: userInfo.value.username,
  nickName: "",
})

// 提交修改
const applyChange = async () => {
  changeUserInfo(JSON.stringify(userForm))
      .then((res) => {
        store.commit("saveUserInfo", res.data.data)
      })
  showChangeArea.value = false
}


const cancelChange = () => {
  showChangeArea.value = false
}

const changeIcon = () => {
  changeUserIcon({})
}

// 上传组件
let uploadForm = new FormData()
uploadForm.append("username", userInfo.value.username)
let iconArr = []
const handleChange = (UploadFile) => {
  uploadForm.append("multipartIcon", UploadFile.raw)

}
const submitUpload = async () => {
  await changeUserIcon(uploadForm).then(() => {
        getUserInfo({
          username: userInfo.value.username
        }).then((res) => {
          store.commit("saveUserInfo", res.data.data)
        }).catch(() => {})
  })
}


// 问题组件
let curQuestions = reactive({
  data: ""
})

const toDetailed = (questionId) => {
  router.push({name: "question", params: {questionId: questionId}})
}

onMounted(() => {
  listUserQuestions({
    username: userInfo.value.username
  }).then(res => {
    curQuestions.data = res.data.data
  })
})

</script>

<style scoped>
.profiler {
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

.changeButton {
  width: 100%;
}

.pTag {
  font-size: 16px;
  line-height: 1px;
  font-weight: bold
}

/* 重点修改 */
.is-justify-space-between /deep/ .el-form-item__content {
  justify-content: space-between;;
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