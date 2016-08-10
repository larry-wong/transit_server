/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-18 13:31
#
# Description:	
#
=============================================================================*/

import React from 'react';
import { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import './index.scss';

export default class Account extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
        this.props.user || this.props.fetchUserInfo();
    }

    render() {
        console.log('render account...');
        let {user} = this.props;
        return (!user ? null :
            <div className = 'account'>
                <Card className = 'card'>
                    <CardHeader title = 'Your account:' />
                    <CardText>{user.username}</CardText>
                </Card>
                <Card className = 'card'>
                    <CardHeader title = 'Your token:' />
                    <CardText>{user.token}</CardText>
                </Card>
                <RaisedButton
                    className = 'btn'
                    label = 'SIGN OUT'
                    secondary = {true}
                    icon = {<ExitToApp />}
                    fullWidth = {true}
                    onTouchTap = {this.signout.bind(this)}
                />
            </div>
        );
    }

    signout() {
        localStorage.removeItem('token');
        this.context.router.replace('/');
    }
}
