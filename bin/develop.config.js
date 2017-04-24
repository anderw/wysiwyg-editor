/**
 * Created by pengzhao on 16/3/28.
 */
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './base.config.js'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from '../config'


let [HotModuleReplacementPlugin,
    OccurrenceOrderPlugin,
    NoErrorsPlugin,
    paths
    ] = [
    webpack.HotModuleReplacementPlugin,
    webpack.optimize.OccurrenceOrderPlugin,
    webpack.NoErrorsPlugin,
    config.get('utils_paths')
]
//
//Object.keys(baseConfig.entry).forEach((name) =>{
//    baseConfig.entry[name].unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server")
//})
baseConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server")
//baseConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
export default merge(baseConfig,{
    devtool : 'source-map',
    output : {
        publicPath : '/'
    },
    plugins:[
        new OccurrenceOrderPlugin(),
        new NoErrorsPlugin(),
        new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template : paths.src('example/index.html'),
            hash     : true,
            filename : 'index.html',
            title : 'My App Site',
            inject   : true,
            cache: false,
            chunks: ['app','vendor']
        })
    ]
})
