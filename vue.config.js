const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: ['vuetify'],
    lintOnSave: false,
    publicPath: '/republicwireless/',
    // publicPath: '/testweb/',
    devServer: {
        proxy: {
            '/dishapi': {
                target: 'https://test.api.dishcloud.io/wireless/retail/network/v1/',
                changeOrigin: true,
                pathRewrite: { '^/dishapi': '' },
            },
        },
    },
})
