const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// 修改端口
module.exports = {
  publicPath: "/",
  devServer: {
    host: "localhost",
    port: 8000,
  },
}



