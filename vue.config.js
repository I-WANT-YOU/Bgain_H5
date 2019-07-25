const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const path = require('path');

module.exports = {
  outputDir: 'dist',
  publicPath: '/',
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            selectorBlackList: ['van-circle__layer'], // 该项仅在使用 Circle 组件时需要
          }),
        ],
      },
    },
    // extract: true
  },
  chainWebpack: (config) => {
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all',
    });
  },
  configureWebpack: (config) => {
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@comp': path.resolve(__dirname, './src/components'),
          '@utils': path.resolve(__dirname, './src/utils'),
          '@views': path.resolve(__dirname, './src/views'),
          '@router': path.resolve(__dirname, './src/router'),
          '@api': path.resolve(__dirname, './src/api'),
          '@assets': path.resolve(__dirname, './src/assets'),
          '@store': path.resolve(__dirname, './src/store'),
        },
      },
    });
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    // proxy: {
    //   // 设置代理
    //   "/api": {
    //     target: "http://localhost:3000", //真实请求的目标地址
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/api": ""
    //     }
    //   }
    // }
  },
};
