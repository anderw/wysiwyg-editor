/**
 * Created by pengzhao on 16/3/28.
 */

import path from 'path'
import webpack from 'webpack'
import config from '../config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

//const CommonsChunkPlugin =  webpack.optimize.CommonsChunkPlugin,
//    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
//    OccurrenceOrderPlugin =  webpack.optimize.OccurrenceOrderPlugin,
//    DedupePlugin =  webpack.optimize.DedupePlugin,
//    DefinePlugin = webpack.DefinePlugin,
//    paths = config.get('utils_paths');

let [CommonsChunkPlugin,
     OccurrenceOrderPlugin,
     DedupePlugin,
     DefinePlugin,
     paths
    ] = [
        webpack.optimize.CommonsChunkPlugin,
        webpack.optimize.OccurrenceOrderPlugin,
        webpack.optimize.DedupePlugin,
        webpack.DefinePlugin,
        config.get('utils_paths')
    ]
//console.log(config.get('dir_dist'))

export default {
        entry : {
                app : ['example/index.js'],
                vendor : config.get('vendor_dependencies'),
        },
        output  : {
                path :paths.dist(),
                filename : '[name].js',
                hash: true,
                publicPath : config.get('public_path')
        },
        resolve : {
                extensions : [ '' , '.jsx' , '.js' ] ,
                modulesDirectories: ['node_modules', config.get('dir_src')],
                alias : config.get('utils_aliases')
        },
        module : {
                loaders: [
                        {
                                test: /\.jsx?$/,
                                exclude : /node_modules/,
                                loader: 'babel',
                                query: {
                                        presets: ['react','es2015', 'stage-0']
                                }
                        },

                        {
                                test: /\.css$/,
                                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                        },
                        {
                                test: /\.(sass|scss)$/,
                                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                        },
                        // Optionally extract less files
                        // or any other compile-to-css language
                        {
                                test: /\.less$/,
                                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                        },
                        {
                                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                                loader: "url-loader?limit=10000&minetype=application/font-woff"
                        },
                        { test: /\.json$/, loader: 'json-loader' },
                        {
                                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                                loader: "file-loader"
                        }, {
                                test: /\.(png|jpg)$/,
                                loader: "url-loader?limit=8192"
                        }
                ]
        },
        plugins: [
                new DefinePlugin(config.get('globals')),
                new ExtractTextPlugin('[name].bundle.css?[contenthash:8]', {allChunks: true}),
                new CommonsChunkPlugin({
                        name : 'vendor',
                        filename: "[name].js"
                }),
                new OccurrenceOrderPlugin(),
                new DedupePlugin(),
                //new UglifyJsPlugin({
                //    minimize: true,
                //    compress: {
                //        warnings: false
                //    }
                //
                //}),
                // new HtmlWebpackPlugin({
                //         template : paths.src('index.html'),
                //         hash     : true,
                //         filename : 'index.html',
                //         title : 'My App Site',
                //         inject   : 'body',
                //         chunks: ['app','vendor']
                // })
        ]
}
//console.log(paths)
