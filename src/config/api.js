import {GET, POST, POST_H} from "@/config/axios";

// 方式就是 const 定义方法，返回 GET/POST
// 用户
export const index = (params) => {
    return GET("index", params)
}

export const register = (data) => {
    return POST("register", data)
}

export const login = (data) => {
    return POST("login", data)
}

export const logout = () => {
    return GET("logout")
}

export const changeUserInfo = (data) => {
    return POST("changeUserInfo", data)
}

export const getUserInfo = (params) => {
    return GET("getUserInfo", params)
}

export const changeUserIcon = (data) => {
    return POST_H("changeUserIcon", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

// 问题
export const listQuestion = (params) => {
    return GET("listQuestion", params)
}

export const getDetailedQuestion = (params) => {
    return GET("getDetailedQuestion", params)
}

export const listUserQuestions = (params) => {
    return GET("listUserQuestions", params)
}

export const searchQuestion = (params) => {
    return GET("searchQuestion", params)
}
