const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './dist'), // 打包后的代码放在dist目录下
    filename: '[name].[hash:8].js', // 打包的文件名
  },
  mode: process.env.NODE_ENV, // 开发模式
  ...(process.env.NODE_ENV === 'development' ? {
    devServer: {
        open: true, // 编译完自动打开浏览器
      port: 8080,
    }, 
    devtool: 'source-map'
  } : {}),
  resolve: {
    // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
    extensions: ['.mjs','.js', '.json', '.jsx', '.ts', '.tsx'], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
  },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead', // 根据项目去配置
                                    useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
                                    corejs: 3, // 使用 core-js@3 版本
                                }
                            ],
                            ['@babel/preset-react'],
                            ['@babel/preset-typescript']
                        ]
                    }
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './index.html'), // 使用自定义模板
        }),
      ],
}

