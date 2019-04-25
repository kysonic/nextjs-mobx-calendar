import React, {Component} from 'react';
import MonthSwitcher from './month-switcher';

export default class Calendar extends Component {
    render() {
        const {appStore: {dateStore}} = this.props;
        return (
            <div className="calendar">
                <MonthSwitcher dateStore={dateStore}></MonthSwitcher>
                <style jsx>
                    {`

                    `}
                </style>
            </div>
        );
    }
}
