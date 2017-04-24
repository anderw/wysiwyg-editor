/**
 * Created by pengzhao on 16/4/10.
 */
import webpack from 'webpack'
import devConfig from './production.configLO'
import WebpackDevServer from 'webpack-dev-server'
//console.log(devConfig)
let compiler = webpack(devConfig,{

})