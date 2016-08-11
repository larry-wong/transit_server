/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-12 18:09
#
# Description:	
#
=============================================================================*/

import React from 'react';
import { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import Logo from 'components/logo';
import LinearProgress from 'material-ui/LinearProgress';
import { orange500 } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import routerConfig from 'components/routerConfig';
import './index.scss';

export default class Main extends Component {
/**
    componentWillReceiveProps(nextProps) {
        (nextProps.children === this.props.children)
            || this.props.setDrawerOpen(false);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.children === this.props.children;
    }*/

    render() {
        console.log('render main....');
        let {snackMessage, isDrawerOpen, isProgressLoading
            ,  hideSnack, showSnack, setDrawerOpen, children} = this.props;
        return (
            <div
                className = 'main'
            >
                <AppBar
                    title = {routerConfig.find(c => c.path == children.props.route.path).title}
                    onLeftIconButtonTouchTap = {_ => setDrawerOpen(true)}
                />
                <LinearProgress
                    className = {isProgressLoading ? '' : 'transparent'}
                    mode = 'indeterminate'
                    color = {orange500}
                />
                <Drawer
                    docked = {false}
                    width = {200}
                    open = {isDrawerOpen}
                    onRequestChange = {open => setDrawerOpen(open)}
                >
                    <Logo
                        className = 'logo'
                    />
                    {routerConfig.map((c, i) =>
                        <Link
                            key = {i}
                            to = {c.path}
                            activeClassName = 'active'
                        >
                            <MenuItem
                                leftIcon = {c.icon}
                                primaryText = {c.title}
                                onTouchTap = {_ => setDrawerOpen(false)}
                            />
                        </Link>
                    )}
                </Drawer>
                <Snackbar
                    open = {!!snackMessage}
                    message = {snackMessage}
                    autoHideDuration = {4000}
                    onRequestClose = {hideSnack}
                />
                {children}
            </div>
        );
    }

    componentWillUnmount() {

        // Leaving this page, we should reset the drawer state and clear data.
        this.props.setDrawerOpen(false);
        this.props.clearData();
    }
}
