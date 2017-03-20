var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var PROD = process.env.NODE_ENV === "production";

const extractLess = new ExtractTextPlugin({filename: "./bundle.css"});

module.exports = {
    entry: ['./client/app.client.js'],
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    plugins: PROD
        ? [
            new webpack
                .optimize
                .UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                })
        ]
        : [],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }, {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [
                        {
                            loader: "css-loader"
                        }, {
                            loader: "less-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }

        ]
    },
    plugins: [extractLess]
}