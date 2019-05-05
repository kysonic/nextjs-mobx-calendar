// @flow

import React from 'react';
import MonthSwitcher from './month-switcher';
import CalendarTable from './calendar-table';
import type AppStore from '../../../stores/app';
import type CalendarStore from '../../../stores/calendar';

opaque type CalendarProps = {
    appStore: AppStore,
    calendarStore?: CalendarStore
};

const Calendar = (props: CalendarProps) => {
    const {appStore: {dateStore}, calendarStore} = props;
    return (
        <div className="calendar">
            <MonthSwitcher dateStore={dateStore} />
            {/* $FlowFixMe */}
            <CalendarTable calendarStore={calendarStore} dateStore={dateStore} />
        </div>
    );
};

export default Calendar;
