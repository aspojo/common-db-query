const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        allowedHosts: [
            "local.beta1.fn"
        ]
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/static/db/'
        : '/'
})
