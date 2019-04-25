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
import {DAYS, DAYS_IN_MONTH, DAYS_IN_WEEK} from '../../../consts/months';
import {observer} from 'mobx-react';

const CalendarTable = observer(({dateStore}) => {
    const drawNumber = (index) => {
        return index >= dateStore.firstMonthDay && index - dateStore.firstMonthDay < dateStore.daysCount ? (index - dateStore.firstMonthDay) + 1 : '';
    };
    const getRows = () => {
       return Math.ceil(DAYS_IN_MONTH / DAYS_IN_WEEK) + (dateStore.firstMonthDay === 7 ? 1 : 0);
    };
    return (
        <table className="calendar-table">
            <thead>
                <tr>
                    {DAYS.map((day, i) => <th key={i}>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    Array.from({length: getRows()}).map((row, i)=>(
                        <tr key={i}>
                            {Array.from({length: DAYS_IN_WEEK}).map((cell, j)=>(<td key={j}>{drawNumber(j + (i*DAYS_IN_WEEK) + 1)}</td>))}
                        </tr>
                    ))
                }
            </tbody>
            <style jsx>
                {`

                `}
            </style>
        </table>
    );
});

export default CalendarTable;
