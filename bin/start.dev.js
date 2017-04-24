/**
 * Created by pengzhao on 16/4/3.
 */
import webpack from 'webpack'
import devConfig from './develop.config.js'
import WebpackDevServer from 'webpack-dev-server'
//console.log(devConfig)
let compiler = webpack(devConfig)
//console.log(compiler.plugin)
//let devMiddle = webpackDevMiddlerware(compiler,{
//    publicPath : devConfig.output.publicPath,
//    stats : {
//        colors : true,
//        chunks : false
//    }
//})
//let hotMiddle = webpackHotMiddlerware(compiler)
//
//
//
//let context = ''
//let proxy = HttpProxy(context,{target:'http:localhost:8080'})
//
//
//let app = express()
//
//
//compiler.plugin('compilation',function (compilation){
//    compiler.plugin('html-webpack-plugin-after-emit',function(data,cb){
//        hotMiddle.publish({action:'reload'})
//        cb()
//    })
//})
//
//
////app.use(proxy)
//app.use(HistoryApi())
//app.use(devMiddle)
//app.use(hotMiddle)
//app.use('/static',express.static('./static'))
let app = new WebpackDevServer(compiler,{
    contentBase: '/',
    hot: true,
    stats : {
        colors : true,
        chunks : false
    },
    watchOptions:{
        aggregateTimeout : 1000
    },
    bail : true
})
app.listen(8080);

//export default app.listen(8000,function (err){
//    if(err){
//        console.log(err)
//        return false
//    }
//    console.log('server run at http://localhost:8000')
//})