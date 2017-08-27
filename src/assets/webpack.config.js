// webpack.config.js

// Check this : https://github.com/webpack-contrib/sass-loader
// and this : https://webpack.github.io/docs/tutorials/getting-started/

module.exports = {
	entry: "./main.js",
    output: {
        path: __dirname + "/bin",
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    }
};