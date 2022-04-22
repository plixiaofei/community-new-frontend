import axios from "axios";
import {ElMessage} from "element-plus";

// 创建 axios 配置
const config = {
    baseURL: "http://localhost:8080/api/",
    timeout: 3000,
}

// 创建 axios 实例
const service = axios.create(config);

// 设置头文件
// service.defaults.headers.post['Content-Type'] = "application/json"

service.interceptors.response.use(response => {
    let data = response.data
    if (data.code !== 200) {
        if (data.code === 20002) {
            return response
        } else {
            ElMessage({
                message: data.message,
                type: "warning"
            })
        }
    } else {
        return response
    }
})

service.interceptors.request.use(request => {
    const token = localStorage.getItem("token")
    if (token) {
        request.headers.Authorization = token;
    }
    return request
})

// 包装，get 方法 params 只能写到 config
export function GET(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

// 应该说除了 post data 写在外面，其他几种方法都只能写到 config 里面
export function POST(url, data) {
    return new Promise((resolve, reject) => {
        service.post(url, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function POST_H(url, data, config) {
    return new Promise((resolve, reject) => {
        service.post(url, data, config)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

// 导出 axios 实例 service 组件
export default service
