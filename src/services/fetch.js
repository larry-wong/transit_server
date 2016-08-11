/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-08 11:37
#
# Description:	
#
=============================================================================*/

import 'fetch-ie8'
import { browserHistory } from 'react-router';
import { showSnack, setProgressLoading } from 'actions/ui';

const apiBase = `/api/v${API_VERSION}`;

let ret = ({method = 'GET', url = '', params = {}, data, dispatch} = {}) => {
    let token = localStorage.getItem('token');
    token && (params = Object.assign({}, params, {token}));
    let urlParams = Object.keys(params).reduce((previousValue, key, i) =>
        previousValue
        + `${i ? '&' : '?'}${key}=${encodeURIComponent(params[key])}`
        , '');
    let timeout;

    // Show loading progress after 600ms if it is still loading.
    dispatch && (timeout = setTimeout(_ =>
        dispatch(setProgressLoading(true)), 600));

    //const headers = new Headers();
    //headers.set('Content-Type', data instanceof Uint8Array
    //    ? 'application/octet-stream' : 'application/json');
    return fetch(`${apiBase}${url}${urlParams}`, {
        method,
        headers: {
            'Content-Type': data instanceof Uint8Array
                ? 'application/octet-stream' : 'application/json'
        },
        body: data instanceof Uint8Array ? data : JSON.stringify(data)
    }).then(res => {
        return res.json().then(data => {
            timeout && clearTimeout(timeout);
            dispatch && dispatch(setProgressLoading(false));

            // Auth failed, go to sign page.
            if ([401, 403].includes(res.status)) {
                (res.status == 401) && localStorage.removeItem('token');
                browserHistory.replace('/');

            // Show error msg if dispatch is provided.
            } else if (!res.ok) {
                dispatch && dispatch(showSnack(data.error));
            }

            return {
                ok: res.ok,
                status: res.status,
                data
            };
        });
    });
}

ret.get = (url, params, dispatch) => ret({url, params, dispatch});
ret.post = (url, data, dispatch) => ret({method: 'POST', url, data, dispatch});
ret.put = (url, data, dispatch) => ret({method: 'PUT', url, data, dispatch});
ret.delete = (url, params, dispatch) => ret({method: 'DELETE', url, params, dispatch});

export default ret;
