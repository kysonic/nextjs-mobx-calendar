// @flow
import React from 'react';
import {MONTHS} from '../../../consts/months';
import {observer} from 'mobx-react';
import type DateStore from '../../../stores/date';

opaque type PropsType = {
    dateStore: DateStore
};

const MonthSwitcher = observer(({dateStore}: PropsType) => {
    const prevMonth = () => {
        dateStore.decMonth();
    }
    const nextMonth = () => {
        dateStore.incMonth();
    }
    return (
        <div className="month-switcher">
            <div role="button" tabIndex="0" className="arrow arrow-left" onClick={prevMonth}>{'<'}</div>
            <div className="month">{MONTHS[dateStore.month]}</div>
            <div role="button" tabIndex="0" className="arrow arrow-right" onClick={nextMonth}>{'>'}</div>
            <style jsx>
                {`
                    .month-switcher {
                        background-color: #eee;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #666;
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
});

export default MonthSwitcher;
