/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-19 15:13
#
# Description:	
#
=============================================================================*/

import fetch from './fetch';

export const fetchDevices = dispatch =>
fetch.get('/devices', undefined, dispatch);

export const editDevice = ({id, ...data}, dispatch) =>
fetch.put(`/devices/${id}`, data, dispatch);

export const deleteDevice = (id, dispatch) =>
fetch.delete(`/devices/${id}`, undefined, dispatch);
