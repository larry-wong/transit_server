/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-04 16:27
#
# Description:	
#
=============================================================================*/

import { connect } from 'react-redux';
import Sign from 'components/sign';
import { signIn, signUp} from 'services/sign.service';
import { setSignUp, setErrorText, setSignLoading } from 'actions/ui';
import { setUser } from 'actions/data';

const mapStateToProps = ({ui}) => ({
    isSignUp: ui.isSignUp,
    isSignLoading: ui.isSignLoading,
    errorText: ui.errorText
});

const signImpl = (username, password, isSignUp, onSuccess, dispatch) => {
    const signUpImpl = _ => signUp(username, password).then(res => {
        if (res.ok) dispatch(setUser(res.data));
        else return Promise.reject(res.data.error);
    });

    const signInImpl = _ => signIn(username, password).then(res => {
        if (res.ok) {
            localStorage.setItem('username', username);
            localStorage.setItem('token', res.data.token);
        } else {
            return Promise.reject(res.data.error);
        }
    })

    dispatch(setSignLoading(true));

    let p;

    // Sign up, then sign in.
    if (isSignUp) p = signUpImpl().then(signInImpl);

    // Sigin in, then fetch user info.
    else p = signInImpl();
    
    p.then(_ => {
        onSuccess && onSuccess();
    }).catch(error => {
        let errorText = {username: '', password: ''};
        if (error.match(/username/i)) errorText.username = error;
        else if (error.match(/password/i)) errorText.password = error;
        dispatch(setErrorText(errorText));
    });
};

const signAction = (username, password, confirm, isSignUp, onSuccess, dispatch) => {

    // Check whether inputs are valid.
    let errorText = {
        username: '',
        password: '',
        confirm: ''
    };
    if (!username) {
        errorText.username = 'Empty!';
    } else if (!password) {
        errorText.password = 'Empty!';
    } else if (isSignUp && !confirm) {
        errorText.confirm = 'Empty!';
    } else if (isSignUp && password != confirm) {
        errorText.confirm = 'Dismatch!';
    } else {

        // Everything is valid, start to send request.
        signImpl(username, password, isSignUp, onSuccess, dispatch);
        return;
    }
    dispatch(setErrorText(errorText));
};
const mapDispatchToProps = dispatch => ({
    setSignUp: isSignUp => dispatch(setSignUp(isSignUp)),
    setSignLoading: isSignLoading => dispatch(setSignLoading(isSignLoading)),
    signAction: (account, password, confirm, isSignUp, onSuccess) =>
        signAction(account, password, confirm, isSignUp, onSuccess, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sign);
