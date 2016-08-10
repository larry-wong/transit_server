/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-02 13:56
#
# Description:	Webpack config for prduction.
#
=============================================================================*/

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildPath = path.resolve(__dirname, '../www');
const nodeModulesPath = path.resolve(__dirname, '../node_modules');

module.exports = {
    entry: [path.resolve(__dirname, '../src/index.js')],
    //devtool: 'source-map',
    resolve: {
        root: path.resolve(__dirname, '../src')
    },
    output: {
        path: buildPath,
        filename: 'app.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            API_VERSION: JSON.stringify(config.API_VERSION),
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('app.css')
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            exclude: [nodeModulesPath]
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }]
    }
};
