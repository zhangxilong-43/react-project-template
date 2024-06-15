import { Configuration, DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as dotenv from 'dotenv'
import { styleLoadersArray, lessRule } from './config/style'

const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')
const WebpackBar = require('webpackbar')

const envConfig = dotenv.config({
  path: path.resolve(__dirname, `./env/.env.${process.env.BASE_ENV}`)
})

const baseConfig: Configuration = {
  entry: path.join(__dirname, './src/index.tsx'), // 入口文件
  // 打包出口文件
  output: {
    filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
    path: path.join(__dirname, './dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/', // 打包后文件的公共前缀路径
    environment: {
      asyncFunction: true
    }
  },
  // loader 配置
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        exclude: /node_modules/,
        use: ['babel-loader']
        // use: ["thread-loader", "babel-loader"] 当项目规模到达一定程度可以考虑开启多进程打包
      },
      {
        test: /.css$/, // 匹配 css 文件
        use: styleLoadersArray
      },
      lessRule,
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 加上[contenthash:8]
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 加上[contenthash:8]
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 加上[contenthash:8]
        }
      },
      {
        // 匹配json文件
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto', // 将json文件视为文件类型
        generator: {
          // 这里专门针对json文件的处理
          filename: 'static/json/[name].[hash][ext][query]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
    alias: {
      '@': path.join(__dirname, './src')
    },
    modules: [path.resolve(__dirname, './node_modules')]
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack5-react-ts',
      filename: 'index.html',
      inject: true, // 自动注入静态资源
      hash: true,
      cache: false,
      // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
      template: path.join(__dirname, './public/index.html'),
      // 压缩html资源
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true, // 去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, './node_modules')
    }),
    new ModuleFederationPlugin({
      name: 'microApp-project',
      remotes: {
        project_container:
          'project_container@https://micro-frontend-container-88g.pages.dev/remoteEntry.js'
      },
      shared: {
        // 统一 react 等版本，避免重复加载
        react: {
          singleton: true,
          eager: true
        },
        'react-dom': {
          singleton: true,
          eager: true
        }
      }
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(envConfig.parsed),
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackBar()
  ].filter(Boolean),
  cache: {
    type: 'filesystem' // 使用文件缓存
  }
}

export default baseConfig
