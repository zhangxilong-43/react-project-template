import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as dotenv from "dotenv";
import { styleLoadersArray, lessRule } from "./config/style";

const path = require("path");
const envConfig = dotenv.config({
  path: path.resolve(__dirname, "./env/.env." + process.env.BASE_ENV),
});

const baseConfig: Configuration = {
  entry: path.join(__dirname, "./src/index.tsx"), // 入口文件
  // 打包出口文件
  output: {
    filename: "static/js/[name].js", // 每个输出js的名称
    path: path.join(__dirname, "./dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  // loader 配置
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: "babel-loader"
      },
      {
        test: /.css$/, //匹配 css 文件
        use: styleLoadersArray,
      },
      lessRule,
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64
          }
        },
        generator:{ 
          filename:'static/images/[hash][ext][query]', // 文件输出目录和命名
        },
      },
      {
        test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64
          }
        },
        generator:{ 
          filename:'static/fonts/[hash][ext][query]', // 文件输出目录和命名
        },
      },
      {
        test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64
          }
        },
        generator:{ 
          filename:'static/media/[hash][ext][query]', // 文件输出目录和命名
        },
      },
      {
        // 匹配json文件
        test: /\.json$/,
        loader: 'json-loader',
        type: "javascript/auto", // 将json文件视为文件类型
        generator: {
          // 这里专门针对json文件的处理
          filename: "static/json/[name].[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".css"],
    alias: {
      "@": path.join(__dirname, "./src")
    },
    modules: [path.resolve(__dirname, "./node_modules")],
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack5-react-ts",
      filename: "index.html",
      inject: true, // 自动注入静态资源
      hash: true,
      cache: false,
      // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
      template: path.join(__dirname, "./public/index.html"),
      // 压缩html资源
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true, //去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true, // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, "./node_modules"),
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(envConfig.parsed),
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ].filter(Boolean),
};

export default baseConfig
