/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-14 15:18
#
# Description:	
#
=============================================================================*/

import React from 'react';
import Send from 'material-ui/svg-icons/content/send';
import Message from 'containers/message';
import Router from 'material-ui/svg-icons/hardware/router';
import Devices from 'containers/devices';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Account from 'containers/account';

export default [{
    title: 'Send',
    path: '/message',
    icon: <Send />,
    component: Message
}, {
    title: 'Devices',
    path: '/devices',
    icon: <Router />,
    component: Devices
}, {
    title: 'Account',
    path: '/account',
    icon: <AccountBox />,
    component: Account
}]
