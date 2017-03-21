# React with ES6

## Start with express

* ### Init the project

Open with Visual Studio code under your project directory and open the terminal, type in below command to install express-generator

    npm install express-generator -g

After the installation,the next thing you need to do is typing this command

    express

    npm install

Then you will see the project is created with this structure

    -bin
    -public
    -routes
    -views
    -app.js
    -package.json

Because we prefer to create a single page application, just remvoe the public,routes and views directory.

And then type into the terminal with below command:

    npm install --save connect-history-api-fallback

After the installation, open app.js file and make the code looks like below with some edit:

    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var history = require('connect-history-api-fallback');

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(history({verbose: true}));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname)));

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
    // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req
            .app
            .get('env') === 'development'
            ? err
            : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    module.exports = app;


When you are done, don't forget to create index.html under the root directory with the content like below:

    <!DOCTYPE html>
    <html>

    <head>
        <title>React Tutorial</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,initial-scale=1,user-scalable=no">
    </head>

    <body>
        <div id="root"></div>
    </body>
    <script src="./build/bundle.js" async></script>
    </html>

The script used in index.html will be created later.

* ### Install essential packages for building a real application

Open the terminal inside the Visual Studio Code, type the command below to install the packages

    npm install --save babel-cli babel-core babel-preset-es2015 babel-preset-react babel-preset-stage-0 react react-dom

    npm install --save-dev nodemon webpack concurrently babel-loader extract-text-webpack-plugin less-loader less style-loader css-loader

The babels packages is used to transfer es6 and react into original plain js, the nodemon is used for restarting when
the file changes, the webpack,extract-text-webpack-plugin,less-loader,css-loader,style-loader are used for packing js/css/less/sass files into one file, 
concurrently is used for executing mutiple commands

## Start a component with ES6

* ### create directories and component

> * Create /client directory under the root
> * Create a file named app.client.js under /client directory
> * Create /components directory under the /client directory
> * Create a directory named robot-chatroom under the /components directory
> * Create a file named robot-chatroom.js under the /robot-chatroom directory

Make the robot-chatroom.js code like below:

    import React, { Component } from 'react';

    class RobotChatRoom extends Component {
        render() {
            return (
                <div>
                    Welcome to Robot Chat Room
                </div>
            );
        }
    }

    export default RobotChatRoom;

And then Make the app.client.js code like below:

    import React from 'react'
    import ReactDOM from 'react-dom';
    import RobotChatRoom from './components/robot-chatroom/robot-chatroom';

    ReactDOM.render(
        <RobotChatRoom/>, document.getElementById('root'));

* ### Use webpack to pack your code

Creating the webpack.config.js file under the root to pack all your frontend files,
this config is used in webpack-version 2, you can check the <a href='https://webpack.js.org/' target="_blank">document</a> and the code of it like below:

    
    var webpack = require('webpack');
    var PROD = process.env.NODE_ENV === "production";

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
        plugins: PROD ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            })
        ] : [],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react', 'stage-0'],
                    }
                }
            
            ]

        }
    }

The Last thing is editing your package.json file, and add start property to get your project work right.

    "start": "concurrently \"webpack --config webpack.config.js\" \"webpack --watch \" \"nodemon ./bin/www\" "

You can try type npm start in the terminal and open the browser with localhost:3000 to see the result.

## Use less with react component

* Create robot-chatroom.less file under /robot-chatroom directory and code like below:

    .text-center {
        text-align: center;
    }

* And then edit the webconfig.js like this:

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

* Add link tag in index.html like this:

    <link rel="stylesheet" href="./build/bundle.css" />

* Try with npm start and also open the browser with localhost:3000, you will see the text is aligned into center

## Use state


