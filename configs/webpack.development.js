const resolveApp = require('./paths')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    target: 'web',
    mode: 'development',
    devtool: "cheap-module-source-map",
    optimization: {
        // runtimeChunk: true,  // 使用runtimeChunk则devtool无法使用
        minimize: false, //    minimize为false
    },
    devServer: {
        static:{
            directory: resolveApp('public'),
            watch: true,
            publicPath: '/'
        },
        historyApiFallback: {
            disableDotRule: true,
            rewrites: [
                // { from: /\/layout/, to: './pubilc' },
              ],
        },
        client: {
            overlay: {
                errors: true,
                warnings: false
            },
            progress: true
        },
        hot: true,
        compress: true,
        proxy:{
            '/api':{
                target: 'https://webapi.sporttery.cn/',
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
            }
        },
        host: '127.0.0.1',
        port: 4000,
        setupMiddlewares: (middlewares, devServer) =>{
            if (!devServer) {
              throw new Error('webpack-dev-server is not defined');
            }
            devServer.app.get('/setup-middleware/some/path', (_, response) => {
              response.send('setup-middlewares option GET');
            });
      
            // 如果你想在所有其他中间件之前运行一个中间件或者当你从 `onBeforeSetupMiddleware` 配置项迁移时，
            // 可以使用 `unshift` 方法
            middlewares.unshift({
              name: 'fist-in-array',
              // `path` 是可选的
              path: '/foo/path',
              middleware: (req, res) => {
                res.send('Foo!');
              },
            });
      
            // 如果你想在所有其他中间件之后运行一个中间件或者当你从 `onAfterSetupMiddleware` 配置项迁移时，
            // 可以使用 `push` 方法
            middlewares.push({
              name: 'hello-world-test-one',
              // `path` 是可选的
              path: '/foo/bar',
              middleware: (req, res) => {
                res.send('Foo Bar!');
              },
            });
      
            middlewares.push((req, res) => {
              res.send('Hello World1!');
            });
      
            return middlewares;
          },
    },
    plugins: [
        new ReactRefreshWebpackPlugin()
    ]
}