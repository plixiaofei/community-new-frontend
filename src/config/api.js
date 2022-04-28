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

export const listQuestionWithoutComment = (params) => {
    return GET("listQuestionWithoutComment", params)
}

export const getDetailedQuestion = (params) => {
    return GET("getDetailedQuestion", params)
}

export const getQuestionCount = () => {
    return GET("getQuestionCount", null)
}

export const listUserQuestions = (params) => {
    return GET("listUserQuestions", params)
}

export const searchQuestion = (params) => {
    return GET("searchQuestion", params)
}

export const publishQuestion = (data) => {
    return POST("publishQuestion", data)
}

export const uploadImg = (data) => {
    return POST_H("uploadImg", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

// comment
export const comment = (data) => {
    return POST("comment", data)
}

export const getCommentsByQuestionId = (params) => {
    return GET("getCommentsByQuestionId", params)
}

export const getCommentsByUsername = (params) => {
    return GET("getCommentsByUsername", params)
}


// 通知
export const getNotification = (params) => {
    return GET("getNotification", params)
}

export const commentExists = () => {
    return GET("commentExists", null)
}
