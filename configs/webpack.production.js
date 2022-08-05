const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: "production",
    optimization: {
        runtimeChunk: {
            name: 'runtime' 
        },
        chunkIds: 'deterministic',
        minimizer: [
        new CssMinimizerWebpackPlugin(),
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        new CssMinimizerWebpackPlugin({}),
    ]
}