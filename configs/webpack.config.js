const resolveApp = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin, ProvidePlugin } = require('webpack')
const { merge } = require('webpack-merge')
const devConfig = require('./webpack.development.js')
const prodConfig = require('./webpack.production.js')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


console.log(process.env.NODE_ENV)

module.exports = (env) => {
    const configModule = {
        entry: './src/index.js',
        output: {
            filename: 'js/[name]_[contenthash:6]_bundle.js',
            path: resolveApp('build'),
            publicPath: env.production ? './' : '/',
            chunkFilename: 'js/chunk_[contenthash:6]_[name].js'
        },
        module: {
            rules:[
                {
                    test: /\.css$/,
                    use: [
                        env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                esModule: false,
                            }
                        },
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.styl$/,
                    use: [
                        env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader',
                        'stylus-loader'
                    ]

                },
                {
                    test: /\.(ttf|woff2?)$/,
                    type: 'asset',
                    generator: {
                        filename: 'font/[name].[contenthash:8].[ext]'
                    }
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'img/[name].[contenthash:8].[ext]',
                    },
                    parser: {
                        dataUrlCondition: {
                            maxSize: 20 * 1024
                        }
                    }
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|public)/,
                    loader: 'babel-loader'
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            mainFiles: ['index'],
            alias: {
              '@': resolveApp('src'),
              '@pages': resolveApp('src/pages'),
              '@com': resolveApp('src/components'),
              '@public': resolveApp('public'),
              '@common': resolveApp('src/common')
            },
        },
        optimization: {
            // runtimeChunk: true,  // 使用runtimeChunk则devtool无法使用
            minimizer: [
                new TerserWebpackPlugin({
                    extractComments: false,
                })      
            ],
            splitChunks: {
                chunks: 'all',
                minSize: 20000,
                maxSize: 20000,
                minChunks: 1,
                cacheGroups: {
                  defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: 'js/[name]_[contenthash:8]_vendor.js',
                    priority: -10,
                    reuseExistingChunk: true,
                  },
                  default: {
                    minChunks: 1,
                    priority: -20,
                    filename: 'js/[name]_[contenthash:8]_chunk.js',
                    reuseExistingChunk: true,
                  },
                },
              },
        },
        externals: {
            antd: 'antd',
            react: 'React',
            'react-dom': 'ReactDOM',
            // 'react-router-dom': 'ReactRouterDOM',
            lodash: '_',
            moment: 'moment'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                scriptLoading: 'defer',
                title: '彩票后台',
            }),
            new DefinePlugin({
                Node_TAG: '"./"',
            }),
            new ProvidePlugin({
                moment: 'moment',
                _: 'lodash'
            }),
            new CopyWebpackPlugin({
                patterns:[{
                    from: resolveApp('./public'),
                    to: resolveApp('./build/public'),
                    // globOptions: {
                    //     ignore: ['**/index.html']
                    // }
    
                }]
            }),
        ],
    }
    const  configMergeData = env.production ? merge(prodConfig, configModule) : merge(devConfig, configModule) 
    console.log(configMergeData.module.rules)
    return configMergeData
} 