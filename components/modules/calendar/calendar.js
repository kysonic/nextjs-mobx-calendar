import React from 'react';
import MonthSwitcher from './month-switcher';
import CalendarTable from './calendar-table';

const Calendar = (props) => {
    const {appStore: {dateStore}, calendarStore} = props;
    return (
        <div className="calendar">
            <MonthSwitcher dateStore={dateStore}></MonthSwitcher>
            <CalendarTable calendarStore={calendarStore} dateStore={dateStore}></CalendarTable>
        </div>
    );
};

export default Calendar;
