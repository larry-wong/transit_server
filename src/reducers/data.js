/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-13 18:20
#
# Description:	
#
=============================================================================*/

import { SET_USER, SET_DEVICES, UPDATE_DEVICE, REMOVE_DEVICE
    , CLEAR_DATA } from 'actions/data';

const initialState = {
    user: null,
    devices: null
};

export default(state = initialState, action) => {

    switch (action.type) {

        case SET_USER:
            return Object.assign({}, state, {user: action.user});
        case SET_DEVICES:
            return Object.assign({}, state, {devices: action.devices});
        case UPDATE_DEVICE:
            if (!state.devices || !state.devices.length) return state;
            const devices = state.devices.map(d => d.id == action.device.id
                ? Object.assign({}, d, action.device) : d);
            return Object.assign({}, state, {devices});
        case REMOVE_DEVICE:
            if (!state.devices || !state.devices.length) return state;
            const index = state.devices.findIndex(d => d.id == action.id);
            if (index < 0) return state;
            const d = state.devices.slice(0);
            d.splice(index, 1);
            return Object.assign({}, state, {devices: d});
        case CLEAR_DATA:
            return initialState;
        default:
            return state;
    }
};
