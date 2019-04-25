import React, {Component} from 'react';
import MonthSwitcher from './month-switcher';
import CalendarTable from './calendar-table';

export default class Calendar extends Component {
    render() {
        const {appStore: {dateStore}} = this.props;
        return (
            <div className="calendar">
                <MonthSwitcher dateStore={dateStore}></MonthSwitcher>
                <CalendarTable dateStore={dateStore}></CalendarTable>
                <style jsx>
                    {`

                    `}
                </style>
            </div>
        );
    }
}
