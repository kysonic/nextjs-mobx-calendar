// @flow

import React from 'react';
import {observer} from 'mobx-react';
import type {Item} from '../../../stores/calendar';

opaque type CalendarCellProps = {
    isToday: boolean,
    number: number,
    events: Item[],
    isoDate: string,
    onEventClick: ({event?: Item, isoDate: string}) => {}
};

const CalendarCell = observer(({isToday, number, events, isoDate, onEventClick}: CalendarCellProps) => (
    <div className={`calendar-cell ${isToday ? 'is-today' : ''}`}>
        <div className="day">{number}</div>
        {events && (
            <ul className="events">
                {events.map((event: Item) => (
                    <li className="event" key={event.id}>
                        <div role="button" tabIndex="0" className="title" onClick={() => onEventClick({event, isoDate})}>{event.title}</div>
                    </li>
                ))}
            </ul>
        )}
        <div role="button" className="plus" onClick={() => onEventClick({event: undefined, isoDate})}>+</div>
        <style jsx>
            {`
                    .calendar-cell {
                        width: 100%;
                        height: 100%;
                    }
                    .day {
                        text-align: right;
                        margin-right: 20px;
                    }
                    .calendar-cell.is-today {
                        background-color: #eee;
                    }
                    .event, .plus {
                        cursor: pointer;
                        list-style: none;
                        text-transform: lowercase;
                        font-size: 11px;
                        text-align: right;
                        margin-right: 20px;
                    }
                `}
        </style>
    </div>
));

export default CalendarCell;
