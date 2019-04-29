import React from 'react';

const CalendarCell = ({isToday, number, events}) => {
    return (
        <div className={`calendar-cell ${isToday ? 'is-today' : ''}`}>
            <div className="day">{number}</div>
            {events && (
                <ul className="events">
                    {events.map((event) => (
                        <li className="event" key={event.id}>
                            <div className="title">{event.title}</div>
                        </li>
                    ))}
                </ul>
            )}
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
                    .events {
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
};

export default CalendarCell;
