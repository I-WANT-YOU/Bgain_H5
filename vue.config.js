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
