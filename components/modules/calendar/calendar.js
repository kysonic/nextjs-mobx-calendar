import React, {Component} from 'react';
import MonthSwitcher from './month-switcher';

export default class ComponentName extends Component {
    render() {
        console.log(this.props.appStore);
        return (
            <div className="calendar">
                <MonthSwitcher></MonthSwitcher>
                <style jsx>
                    {`

                    `}
                </style>
            </div>
        );
    }
}
