/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-18 15:06
#
# Description:	
#
=============================================================================*/

import fetch from './fetch';

export const fetchUserInfo = dispatch => fetch.get('/users', undefined, dispatch);
