// @flow
import React, {useState} from 'react';
import {DAYS, DAYS_IN_MONTH, DAYS_IN_WEEK} from '../../../consts/months';
import {observer} from 'mobx-react';
import CalendarCell from './calendar-cell';
import Popup from '../popup/popup';
import CalendarEvent from './calendar-event';
import type DateStore from '../../../stores/date';
import type CalendarStore, {ItemType} from '../../../stores/calendar';
import type {Node} from 'react';

const isServer = !process.browser;
let popup: ?Popup;

opaque type PropsType = {
    dateStore: DateStore,
    calendarStore: CalendarStore,
    event: ItemType,
    setEvent: <T>(T) => T
};

const CalendarTable = observer(({dateStore, calendarStore, event, setEvent}: PropsType) => {
    const drawNumber = (index: number) => (index >= dateStore.firstMonthDay && index - dateStore.firstMonthDay < dateStore.daysCount ? (index - dateStore.firstMonthDay) + 1 : '');

    const getRowsCount = (): number => (Math.ceil(DAYS_IN_MONTH / DAYS_IN_WEEK) + (dateStore.firstMonthDay === 7 ? 1 : 0));

    const isToday = (day: number) => (
        (dateStore.year === dateStore.yearToday) &&
        (dateStore.month === dateStore.monthToday) &&
        (day === dateStore.dayToday)
    );

    const getIsoDateForDay = (day: number): string => (new Date(Date.UTC(dateStore.year, dateStore.month, day, 0, 0, 0)).toISOString());

    const onEventClick = (eventData: ItemType) => {
        setEvent(eventData);
        if (popup) {
            popup.open();
        }
    };
    const close = () => {
        if (popup) {
            popup.close();
        }
    };
    return (
        <table className="calendar-table">
            <thead>
                <tr>
                    {DAYS.map((day: number, i: number): Node => <th key={i}>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    Array.from({length: getRowsCount()}).map((row: ?number, i: number): Node => (
                        <tr key={i}>
                            {Array.from({length: DAYS_IN_WEEK}).map((cell: ?number, j: number): Node => {
                                const number = drawNumber(j + (i * DAYS_IN_WEEK) + 1);
                                return (
                                    (
                                        <td key={j}>
                                            {number &&
                                            (
                                                <CalendarCell
                                                    onEventClick={onEventClick}
                                                    events={calendarStore.items[getIsoDateForDay(number + 1)]}
                                                    isoDate={getIsoDateForDay(number + 1)}
                                                    isToday={isToday(number)}
                                                    number={number}
                                                />
                                            )}
                                        </td>
                                    )
                                );
                            })}
                        </tr>
                    ))
                }
            </tbody>
            {!isServer && (
                <Popup ref={(el: ?Popup) => popup = el}>
                    <CalendarEvent event={event} close={close} calendarStore={calendarStore} />
                </Popup>
            )}
            <style jsx>
                {`
                    .calendar-table {
                        width: 100%;
                        height: 100%;
                    }
                    thead {
                        height: 40px;
                        background-color: #aaa;
                    }
                    thead th {
                        height: 30px;
                        width: calc(100% / 7);
                        color: #fff;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    tbody td {
                        height: 60px;
                        border: 1px solid #ccc;
                    }
                `}
            </style>
        </table>
    );
});

opaque type CalendarProviderPropsType = {
    dateStore: DateStore,
    calendarStore: CalendarStore
};

const CalendarTableStateProvider = ({dateStore, calendarStore}: CalendarProviderPropsType) => {
    const [event, setEvent] = useState(0);
    return (
        <CalendarTable
            event={event}
            setEvent={setEvent}
            dateStore={dateStore}
            calendarStore={calendarStore}
        />
    );
};

export default CalendarTableStateProvider;
