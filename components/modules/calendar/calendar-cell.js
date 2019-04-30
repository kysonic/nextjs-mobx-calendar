import React from 'react';
import {observer} from 'mobx-react';

const CalendarCell = observer(({isToday, number, events, isoDate, onEventClick = () => {}}) => {
    return (
        <div className={`calendar-cell ${isToday ? 'is-today' : ''}`}>
            <div className="day">{number}</div>
            {events && (
                <ul className="events">
                    {events.map((event) => (
                        <li className="event" key={event.id}>
                            <div className="title" onClick={()=>onEventClick({event, isoDate})}>{event.title}</div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="plus" onClick={()=>onEventClick({event: undefined, isoDate})}>+</div>
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
    );
});

export default CalendarCell;
