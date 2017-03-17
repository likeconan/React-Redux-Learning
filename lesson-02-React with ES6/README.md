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

    </html>