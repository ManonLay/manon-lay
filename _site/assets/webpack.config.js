const path = require('path');
var webpack = require('webpack');

const FONTS_BIN_PATH = "name=fonts/[hash].[ext]";
const FONTS_PUBLIC_PATH = "publicPath=assets/bin/";

module.exports = {
    entry: [
        "./main.js"
    ],
    output: {
        path: path.resolve(__dirname, "bin"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles SASS to CSS
                }]
            },
            // FONT LOADERS
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&"+FONTS_PUBLIC_PATH+"&"+FONTS_BIN_PATH
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?"+FONTS_PUBLIC_PATH+"&"+FONTS_BIN_PATH
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({   
            jQuery: 'jquery',
            $: 'jquery',
            Popper: ['popper.js', 'default'],
            Util: "exports-loader?Util!bootstrap/js/dist/util"
        })
    ]
};