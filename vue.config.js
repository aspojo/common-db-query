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
        proxy:"http://localhost:1234/",
        allowedHosts: [
            "local.beta1.fn"
        ],
        client: {
            overlay: false
        }

    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/static/db/'
        : '/'
})
