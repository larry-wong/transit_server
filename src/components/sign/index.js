/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-02 15:56
#
# Description:	
#
=============================================================================*/

import React from 'react';
import { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import { grey800 } from 'material-ui/styles/colors';
import routerConfig from 'components/routerConfig';
import Logo from 'components/logo'
import './index.scss';

export default class Sign extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    render() {
        console.log(`render sign...`);
        let {isSignUp, isSignLoading, errorText, setSignUp, signAction} = this.props;
        return (
            <div
                className = {`sign ${isSignLoading ? 'loading' : isSignUp ? ''
                    : 'sign-in'}`}>
                <Logo className = 'logo' />
                <TextField
                    ref = 'usernameIpt'
                    hintText = 'Account'
                    floatingLabelText = 'Account'
                    fullWidth = {true}
                    errorText = {errorText.username}
                    defaultValue = {localStorage.getItem('username')}
                />
                <TextField
                    ref = 'passwordIpt'
                    hintText = 'Password'
                    floatingLabelText = 'Password'
                    type = 'password'
                    fullWidth = {true}
                    errorText = {errorText.password}
                />
                <TextField
                    ref = 'confirmIpt'
                    hintText = 'Confirm'
                    floatingLabelText = 'Confirm'
                    type = 'password'
                    fullWidth = {true}
                    className = 'confirm-ipt'
                    errorText = {errorText.confirm}
                />
                <div>
                    <RaisedButton
                        icon = {isSignUp ? <ExpandMore /> : <ExpandLess />}
                        className = 'toggle-btn'
                        onTouchTap = {_ => setSignUp(!isSignUp)}
                    />
                    <RaisedButton
                        label = {isSignUp ? 'SIGN UP' : 'SIGN IN'}
                        primary = {true}
                        className = 'sign-btn'
                        onTouchTap = {_ => signAction(
                            this.refs.usernameIpt.input.value,
                            this.refs.passwordIpt.input.value,
                            this.refs.confirmIpt.input.value,
                            this.props.isSignUp,
                            _ => this.context.router.replace(routerConfig[0].path)
                        )}
                    />
                </div>
            </div>
        );
    }

    // Reset sign flag when unmount.
    componentWillUnmount() {
        let {setSignUp, setSignLoading} = this.props;
        setSignUp(false);
        setSignLoading(false);
    }
}
