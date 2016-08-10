/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-29 16:59
#
# Description:	
#
=============================================================================*/

import fetch from './fetch';

export const sendMessage = (array, dispatch) =>
fetch.post(`/messages`, array, dispatch);

