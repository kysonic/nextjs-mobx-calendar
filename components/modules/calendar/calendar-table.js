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
import CalendarCell from './calendar-cell';

const CalendarTable = observer(({dateStore}) => {
    const drawNumber = (index) => {
        return index >= dateStore.firstMonthDay && index - dateStore.firstMonthDay < dateStore.daysCount ? (index - dateStore.firstMonthDay) + 1 : '';
    };
    const getRowsCount = () => {
       return Math.ceil(DAYS_IN_MONTH / DAYS_IN_WEEK) + (dateStore.firstMonthDay === 7 ? 1 : 0);
    };
    const isToday = (day) => {
       return (dateStore.year === dateStore.yearToday) &&
              (dateStore.month === dateStore.monthToday) &&
              (day === dateStore.dayToday)
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
                    Array.from({length: getRowsCount()}).map((row, i)=>(
                        <tr key={i}>
                            {Array.from({length: DAYS_IN_WEEK}).map((cell, j)=>{
                                const number = drawNumber(j + (i*DAYS_IN_WEEK) + 1);
                                return (
                                    (
                                        <td key={j}>
                                            {number && <CalendarCell isToday={isToday(number)} number={number} />}
                                        </td>
                                    )
                                );
                            })}
                        </tr>
                    ))
                }
            </tbody>
            <style jsx>
                {`
                    .calendar-table {
                        width: 100%;
                        height: 100%;
                    }
                    thead {
                        height: 40px;
                        background-color: #aaa;
                    }
                    thead th {
                        height: 30px;
                        width: calc(100% / 7);
                        color: #fff;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    tbody td {
                        height: 60px;
                        border: 1px solid #ccc;
                    }
                `}
            </style>
        </table>
    );
});

export default CalendarTable;
