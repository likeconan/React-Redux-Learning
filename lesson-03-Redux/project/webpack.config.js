var webpack = require('webpack');
var path = require("path");
module.exports = {
    entry: {
        app: [//"./client/app.client.js",
            //"./client/combine.reducer.js",
            "./client/applyMiddleware.js"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    plugins: [],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }

        ]
    }
}