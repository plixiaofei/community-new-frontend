<template>
  <div class="login-card">
    <el-card
        shadow="hover"
        body-style="padding: 20px"
    >
      <el-form
          :label-position="labelPosition"
          :model="formLabelAlign"
          style="min-width: 300px;max-width: 460px"
      >
        <h1 style="color: var(--el-input-text-color,var(--el-text-color-regular)); margin-bottom: 40px">登陆</h1>
        <el-form-item>
          <el-input v-model="formLabelAlign.username" placeholder="123"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formLabelAlign.password" type="password" placeholder="123"/>
        </el-form-item>
        <el-button @click="submit()"
                   type="primary"
                   class="custom-button">登陆
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>


<script setup>
import {reactive, ref} from 'vue'
import {login} from "@/config/api";
import router from "@/router";
import { useStore } from "vuex"

const store = useStore();

const labelPosition = ref('right')
const formLabelAlign = reactive({
  username: '123',
  password: '123',
})
const submit = async () => {
  await login(formLabelAlign)
      .then((res) => {
        let data = res.data.data
        let userInfo = data.userInfo
        store.commit("saveUserInfo", userInfo)
        store.commit("saveToken", data.token)
        router.push("/")
      }).catch(() => {})
}
</script>

<style scoped>
.login-card {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/deep/ .el-input__inner {
  height: 40px;
}

.custom-button {
  height: 40px;
  width: 100%;
  float: right;
  margin-bottom: 20px;
}
</style>