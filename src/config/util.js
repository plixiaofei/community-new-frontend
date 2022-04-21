export const getIcon = (icon) => {
    return 'http://localhost:8080/user/avatar/' + icon.split('avatar/')[1]
}

export const formatTime = (date) => {
    // 参数是后台返回的Object对象，不是字符串
    // Object对象转为日期格式
    date = new Date(date);
    let strDate = date.getFullYear() + "-";
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    //格式化日期,月日时分秒保持两位
    strDate = strDate + (month > 8 ? month : "0" + month) + "-"
        + (day > 9 ? day : "0" + day) + " "
        + (hours > 9 ? hours : "0" + hours) + ":"
        + (minutes > 9 ? minutes : "0" + minutes) + ":"
        + (seconds > 9 ? seconds : "0" + seconds)
    return strDate;
}