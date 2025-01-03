const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //proxy: 'https://khmenu.cloud',
    //proxy: 'http://localhost:4000/',
    proxy: process.env.VUE_APP_DOMAIN_NAME,
  },
})
