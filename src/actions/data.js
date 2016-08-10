/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-13 18:22
#
# Description:	
#
=============================================================================*/

export const SET_USER = Symbol();
export const setUser = user => ({
    type: SET_USER,
    user
});

export const SET_DEVICES = Symbol();
export const setDevices = devices => ({
    type: SET_DEVICES,
    devices
});

export const UPDATE_DEVICE = Symbol();
export const updateDevice = device => ({
    type: UPDATE_DEVICE,
    device
});

export const REMOVE_DEVICE = Symbol();
export const removeDevice = id => ({
    type: REMOVE_DEVICE,
    id
});

export const CLEAR_DATA = Symbol();
export const clearData = _ => ({
    type: CLEAR_DATA
});
