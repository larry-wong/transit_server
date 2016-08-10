/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-02 13:51
#
# Description:	Webpack config for dev.
#
=============================================================================*/

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = global.require('/config.json');

const buildPath = path.resolve(__dirname, '../www');
const nodeModulesPath = path.resolve(__dirname, '../node_modules');

module.exports = {
    entry: [
        path.resolve(__dirname, '../src/index.js'),
        'webpack-hot-middleware/client?reload=true'
    ],
    resolve: {
        root: path.resolve(__dirname, '../src')
    },
    devtool: 'eval',
    output: {
        path: buildPath,
        filename: 'app.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            API_VERSION: JSON.stringify(config.API_VERSION)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('app.css')
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel-loader'],
            exclude: [nodeModulesPath]
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass?sourceMap')
        }]
    }
};
