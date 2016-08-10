/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-13 17:03
#
# Description:	
#
=============================================================================*/

export const SET_SIGN_UP = Symbol();
export const setSignUp = isSignUp=> ({
    type: SET_SIGN_UP,
    isSignUp
});

export const SET_ERROR_TEXT = Symbol();
export const setErrorText = errorText => ({
    type: SET_ERROR_TEXT,
    errorText
});

export const SET_SIGN_LOADING = Symbol();
export const setSignLoading = isSignLoading => ({
    type: SET_SIGN_LOADING,
    isSignLoading
});

export const SET_SNACK_MESSAGE = Symbol();
export const showSnack = snackMessage => ({
    type: SET_SNACK_MESSAGE,
    snackMessage
});
export const hideSnack = _ => showSnack('');


export const SET_DRAWER_OPEN = Symbol();
export const setDrawerOpen = isDrawerOpen => ({
    type: SET_DRAWER_OPEN,
    isDrawerOpen
});

export const SET_PROGRESS_LOADING = Symbol();
export const setProgressLoading = isProgressLoading => ({
    type: SET_PROGRESS_LOADING,
    isProgressLoading
});

export const SET_DIALOG_DATA = Symbol();
export const hideDialog = _ => ({
    type: SET_DIALOG_DATA,
    dialogData: {isShow: false}
});
export const showDialog = dialogData => ({
    type: SET_DIALOG_DATA,
    dialogData: Object.assign({}, dialogData, {isShow: true})
});

export const SET_MESSAGE_KEYBOARD_OPEN = Symbol();
export const setMessageKeyboardOpen = isKeyboardOpen => ({
    type: SET_MESSAGE_KEYBOARD_OPEN,
    isKeyboardOpen
});
export const SET_MESSAGE_TRAGET_DEVICE_ID = Symbol();
export const setMessageTargetDeviceId = targetDeviceId => ({
    type: SET_MESSAGE_TRAGET_DEVICE_ID,
    targetDeviceId
});
export const MESSAGE_TYPE = Symbol();
export const messageType = value => ({
    type: MESSAGE_TYPE,
    value
});
export const MESSAGE_DELETE = Symbol();
export const messageDelete = _ => ({
    type: MESSAGE_DELETE
});
