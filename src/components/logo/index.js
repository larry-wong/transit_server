/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-05 22:28
#
# Description:	
#
=============================================================================*/

import React from 'react';
import { Component } from 'react';

export default class Logo extends Component {

    render() {
        return (
            <svg
                xmlns = 'http://www.w3.org/2000/svg'
                viewBox='0 0 100 100'
                className = {this.props.className}
                stroke = '#0097A7'
                strokeWidth = '3'
                strokeLinecap = 'round'
                fill = 'none'
            >
                <path d = 'M5 55L50 10L95 55M20 25V40'></path>
                <path className = 'arc3' d = 'M15 65A50 50 0 0 1 85 65'></path>
                <path className = 'arc2' d = 'M25 75A40 40 0 0 1 75 75'></path>
                <path className = 'arc1' d = 'M35 85A24 24 0 0 1 65 85'></path>
            </svg>
        );
    }
}
