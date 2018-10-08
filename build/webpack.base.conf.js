const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Path = require('path');
const Merge = require('webpack-merge');

const developmentConfig = require('./webpack.dev.conf.js');
const productionConfig = require('./webpack.prod.conf.js');

const scriptLoader = require('./loader.script.js');
const cssLoader = require('./loader.css.js');
const lessLoader = require('./loader.less.js');
const imagesLoader = require('./loader.images.js');
const htmlLoader = require('./loader.html.js');
const fontsLoader = require('./loader.fonts.js');

const generateConfig = (env) => {
    console.log(env)
    return {        
        entry: {
            index: './src/page/index/index.js',
            list: './src/page/list/index.js',
        },
        output: {
            path: Path.resolve(__dirname, '../dist'),
            filename: 'static/js/[name].js',
            publicPath: env === 'development' ? '/' : './'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [
                        Path.resolve(__dirname, 'node_modules'),
                        Path.resolve(__dirname, 'src/lib'),
                    ],
                    use: scriptLoader(env),
                },
                {
                    test: /\.css$/,
                    use: cssLoader(env)
                },
                {
                    test: /\.less$/,
                    use: lessLoader(env)
                },
                {
                    test: /\.html$/,
                    use: htmlLoader(env)
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: imagesLoader(env)
                },
                {
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    use: fontsLoader(env)
                }
            ]
        },
        resolve: {
            alias: {
                node_modules: __dirname + '/node_modules',
                common:      Path.resolve(__dirname, '../src/common'),
                images:      Path.resolve(__dirname, '../src/images'),
                page:         __dirname + '/src/page',
                service:      __dirname + '/src/service'
            }
        },
        plugins: [
            new Webpack.ProvidePlugin({
                $: 'jquery'
            }),
            new HtmlWebpackPlugin(getHtmlConfig('index', 'aaa', env)),
            new HtmlWebpackPlugin(getHtmlConfig('list', 'bbb', env))

        ]
    }
}
module.exports = (env) => {
    let config = env === 'production' ? productionConfig : developmentConfig;
    return Merge(generateConfig(env), config)
}

function getHtmlConfig (name, title, env='production') {
    return {
        filename: `${name}.html`,
        template: Path.resolve(__dirname, `../src/view/${name}.ejs`),
        minify: {
            collapseWhitespace: env === 'production' ? true : false
        },
        title: title,
        chunks: ['manifest', 'vendor', name],
        hash: true,
        favicon: './favicon.ico'
    }
}
