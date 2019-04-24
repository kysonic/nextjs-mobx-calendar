/*
 * Copyright (c) 2019 Omnigon Communications, LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of Omnigon Communications, LLC
 * ("Confidential Information"). You shall not disclose such Confidential Information and shall access and use it only
 * in accordance with the terms of the license agreement you entered into with Omnigon Communications, LLC, its
 * subsidiaries, affiliates or authorized licensee. Unless required by applicable law or agreed to in writing, this
 * Confidential Information is provided on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the license agreement for the specific language governing permissions and limitations.
 */

import React from 'react';
import {MONTHS} from '../../../consts/months';

const MonthSwitcher = ({dateStore}) => {
    const prevMonth = () => {
        dateStore.decMonth();
    }
    const nextMonth = () => {
        dateStore.incMonth();
    }
    return (
        <div className="month-switcher">
            <div className="arrow arrow-left" onClick={prevMonth}>{'<'}</div>
            <div className="month">{MONTHS[dateStore.month]}</div>
            <div className="arrow arrow-right" onClick={nextMonth}>{'>'}</div>
            <style jsx>
                {`
                    .month-switcher {
                        background-color: #eee;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .month {
                        text-transform: uppercase;
                        margin: 0 10px;
                    }
                    .arrow {
                        cursor: pointer;
                    }
                `}
            </style>
        </div>
    );
};

export default MonthSwitcher;
