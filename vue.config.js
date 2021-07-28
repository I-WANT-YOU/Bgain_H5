const path = require('path');

function resolve(dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  outputDir: 'dist',
  publicPath: '/',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          blue: '#3C64EE',
          'border-color': '#E5E9F6',
          // '@toast-background-color': '#3C64EE',
          // '@toast-text-color': '#3C64EE',
          // '@loading-text-color': 'red',
        },
      },
    },
  },
  chainWebpack: (config) => {
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all',
    });
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons/svg'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
  configureWebpack: (config) => {
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@component': path.resolve(__dirname, './src/components'),
          '@utils': path.resolve(__dirname, './src/utils'),
          '@views': path.resolve(__dirname, './src/views'),
          '@router': path.resolve(__dirname, './src/router'),
          '@api': path.resolve(__dirname, './src/api'),
          '@assets': path.resolve(__dirname, './src/assets'),
          '@modules': path.resolve(__dirname, './src/store/modules'),
        },
      },
    });
  },
  // 修改favicon.ico
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    },
  },
  devServer: {
    // 设置主机地址
    // host: 'localhost',
    // // 设置默认端口
    // port: 8080,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'https://api.fin-bee.com/',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false,
        pathRewrite: { // 路径重写，
          '^/api': 'https://api.fin-bee.com/', // 替换target中的请求地址
        },
      },
    },
  },
};
