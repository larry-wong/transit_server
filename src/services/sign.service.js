/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-08 11:39
#
# Description:	
#
=============================================================================*/

import fetch from './fetch';

export const signIn = (username, password) => fetch.post('/sessions', {
    username, password
});

export const signUp = (username, password) => fetch.post('/users', {
    username, password
});
