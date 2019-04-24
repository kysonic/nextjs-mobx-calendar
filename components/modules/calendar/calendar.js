import React, {Component} from 'react';
import MonthSwitcher from './month-switcher';

export default class Calendar extends Component {
    render() {
        const {appStore: {date}} = this.props;
        return (
            <div className="calendar">
                <MonthSwitcher dateStore={date}></MonthSwitcher>
                <style jsx>
                    {`

                    `}
                </style>
            </div>
        );
    }
}
