/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-12 21:41
#
# Description:	
#
=============================================================================*/

import { SET_SIGN_UP, SET_ERROR_TEXT, SET_SIGN_LOADING
    , SET_SNACK_MESSAGE, SET_DRAWER_OPEN, SET_PROGRESS_LOADING
    , SET_DIALOG_DATA
    , SET_MESSAGE_KEYBOARD_OPEN, SET_MESSAGE_TRAGET_DEVICE_ID
    , MESSAGE_TYPE, MESSAGE_DELETE}
    from 'actions/ui';

export default (state = {
    isSignUp: false,
    isSignLoading: false,
    errorText: {
        username: '',
        password: '',
        confirm: ''
    },
    snackMessage: '',
    isDrawerOpen: false,
    isProgressLoading: false,

    // We assume there is only one dialog on screen a time.
    // Use specific attr to identify defferent dialogs if you need.
    dialogData: {
        isShow: false

        // There should some other attrs here, depends on specific dialog.
    },

    // Flags for message view.
    message: {
        isKeyboardOpen: true,
        targetDeviceId: -1,
        content: []
    }
}, action) => {
    switch (action.type) {

        case SET_SIGN_UP:
            return Object.assign({}, state, {isSignUp: action.isSignUp});
        case SET_ERROR_TEXT:
            return Object.assign({}, state, {
                errorText: action.errorText,
                isSignLoading: false
            });
        case SET_SIGN_LOADING:
            return Object.assign({}, state, {
                isSignLoading: action.isSignLoading
            });
        case SET_SNACK_MESSAGE:
            return Object.assign({}, state, {
                snackMessage: action.snackMessage
            });
        case SET_DRAWER_OPEN:
            return Object.assign({}, state, {
                isDrawerOpen: action.isDrawerOpen
            });
        case SET_PROGRESS_LOADING:
            return Object.assign({}, state, {
                isProgressLoading: action.isProgressLoading
            });
        case SET_DIALOG_DATA:
            return Object.assign({}, state, {
                dialogData: Object.assign({}, state.dialogData
                    , action.dialogData)
            });
        case SET_MESSAGE_KEYBOARD_OPEN:
            return Object.assign({}, state, {
                message: Object.assign({}, state.message, {
                    isKeyboardOpen: action.isKeyboardOpen
                })
            });
        case SET_MESSAGE_TRAGET_DEVICE_ID:
            return Object.assign({}, state, {
                message: Object.assign({}, state.message, {
                    targetDeviceId: action.targetDeviceId
                })
            });
        case MESSAGE_TYPE:
            const content1 = state.message.content.slice(0);
            content1.push(action.value);
            return Object.assign({}, state, {
                message: Object.assign({}, state.message, {content: content1})
            });
            return;
        case MESSAGE_DELETE:
            const content2 = state.message.content.slice(0);
            content2.pop();
            return Object.assign({}, state, {
                message: Object.assign({}, state.message, {content: content2})
            });
            return;
        default:
            return state;
    }
};
