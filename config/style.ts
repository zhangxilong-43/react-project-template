const lessRegex = /\.less$/;

export const styleLoadersArray = [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        modules: {
          localIdentName: "[path][name]__[local]--[hash:5]", 
          // 配置生成的css类名组成（path路径，name文件名，local原来的css类名, hash: base64:5拼接生成hash值5位，具体位数可根据需要设置。
          // 既能达到scoped的效果，又保留原来的css类名(edit)
        },
      },
    },
    'postcss-loader'
];

export const lessRule = {
    test: lessRegex,
    use: [
      ...styleLoadersArray,
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            importLoaders: 2,
            // 可以加入modules: true，这样就不需要在less文件名加module了
            modules: true,
            // 如果要在less中写类型js的语法，需要加这一个配置
            javascriptEnabled: true
          },
        },
      },
    ],
};