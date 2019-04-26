import React from 'react';

const CalendarCell = (props) => {
    return (
        <div className={`calendar-cell ${props.isToday ? 'is-today' : ''}`}>
            <div className="day">{props.number}</div>
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
                `}
            </style>
        </div>
    );
};

export default CalendarCell;
