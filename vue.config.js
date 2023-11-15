const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    css: {
        extract: false,
    },
    configureWebpack: {
        optimization: {
            splitChunks: false,
        },
        output: {
            filename: 'js/[name].js',
        }
    },
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
