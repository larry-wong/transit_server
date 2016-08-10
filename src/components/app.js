/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-02 15:22
#
# Description:	
#
=============================================================================*/

import React from 'react';
import { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Sign from 'containers/sign';
import Main from 'containers/main';
import routerConfig from 'components/routerConfig';
import './app.scss';

const onMainEnter = (nextStage, replace) => {
    console.log('on main enter')
    localStorage.getItem('token') || replace('/');
};

const onSignEnter = (nextStage, replace) => {
    console.log('on sign enter')
    localStorage.getItem('token') && replace(routerConfig[0].path);
};

const onOtherEnter = (nextStage, replace) => {
    console.log('on other enter')
    replace('/');
};

export default class App extends Component {

    render() {
        console.log('render app...');
        return (
            <MuiThemeProvider muiTheme = {getMuiTheme(darkBaseTheme)}>
                <Router history = {browserHistory} >
                    <Route path = '/' component = {Sign} onEnter = {onSignEnter} />
                    <Route component = {Main} >
                        {routerConfig.map((c, i) =>
                            <Route
                                key = {i}
                                path = {c.path}
                                component = {c.component}
                                onEnter = {onMainEnter}
                            />
                        )}
                    </Route>
                    <Route path = '/*' onEnter = {onOtherEnter} />
                </Router>
            </MuiThemeProvider>
        );
    }
}
