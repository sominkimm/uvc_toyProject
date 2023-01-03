const path = require('path')
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VUE_APP_SET_CPS_WEB_PROTOCOL, VUE_APP_LOCAL_IP, VUE_APP_SET_CPS_SERVER_PORT } = process.env
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  filenameHashing: true,
  integrity: true,
  configureWebpack: {
    devtool: 'source-map',
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js'
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/')
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  devServer: {
    clientLogLevel: 'warning',
    disableHostCheck: true,
    hot: true,
    contentBase: 'dist',
    compress: true,
    open: false,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: /node_modules/
    },
    proxy: {
      '/api': { /* apiv1 */
        target: `${VUE_APP_SET_CPS_WEB_PROTOCOL}://${VUE_APP_LOCAL_IP}:${VUE_APP_SET_CPS_SERVER_PORT}`, // environment
        changeOrigin: true, /*  Cors 에러를 막기위한 옵션 */
        secure: false
      }
    }
  },
  /** 웹 팩 설정 */
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          chunkFilter: () => false // <-- set to false
        })
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require("node-sass"),
        additionalData: `
          @import "@/assets/styles/sass/themes/_colors.scss";
        `
      }
    }
  },
  productionSourceMap: false,
  // assetsDir: "./assets/",
  // configureWebpack: {
  //   plugins: [
  //     new CopyWebpackPlugin([
  //       {from: "src/assets/images", to: "assets/img"},
  //     ])
  //   ]
  // },
  lintOnSave: true,
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  transpileDependencies: ['vue-echarts', 'resize-detector']
}
