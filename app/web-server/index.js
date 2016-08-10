/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-06-23 12:02
#
# Description:	Web server, contains API & static web page.
#
=============================================================================*/

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const tokenAuthMiddleware = require('./token-auth-middleware');
const users = require('./users');
const sessions = require('./sessions');
const devices = require('./devices');
const messages = require('./messages');
const config = global.require('/config.json');

const apiBase = `/api/v${config.API_VERSION}`;
const [,,env] = process.argv;

if (env === 'dev') {
    const webpack = require("webpack");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const webpackConfig = global.require('/build/webpack-dev.config');
}

module.exports = {

    init: _ => {

        let app = express();

        // Web server is made up of 3 parts:
        // 1. APIs;
        app.use(`${apiBase}/users`, bodyParser.json(), users);
        app.use(`${apiBase}/sessions`, bodyParser.json()
            , sessions);
        app.use(`${apiBase}/devices`, tokenAuthMiddleware
            , bodyParser.json(), devices);
        app.use(`${apiBase}/messages`, tokenAuthMiddleware
            , bodyParser.raw({limit: '1kb'}), messages);

        // 2. Webpack hot middleware if in dev mode.
        if (env === 'dev') {
            let compiler = webpack(webpackConfig);
            app.use(webpackDevMiddleware(compiler, {
                noInfo: true
            }));
            app.use(webpackHotMiddleware(compiler));
        }

        // 3. Static html, css & js;
        app.use('*', express.static(path.resolve(__dirname, '../../www')));

        let port = config.HTTP_PORT || 80;
        app.listen(port);
        console.log(`Web server is listening on port ${port}...`);
    }
};
