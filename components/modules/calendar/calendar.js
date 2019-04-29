import React, {Component} from 'react';
import MonthSwitcher from './month-switcher';
import CalendarTable from './calendar-table';
import {observer} from 'mobx-react';

@observer
export default class Calendar extends Component {
    render() {
        const {appStore: {dateStore}, calendarStore} = this.props;
        return (
            <div className="calendar">
                <MonthSwitcher dateStore={dateStore}></MonthSwitcher>
                <CalendarTable calendarStore={calendarStore} dateStore={dateStore}></CalendarTable>
            </div>
        );
    }
}
