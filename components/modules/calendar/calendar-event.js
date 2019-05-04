// @flow
import React from 'react';
import {observer} from 'mobx-react';
import type CalendarStore, {ItemType} from '../../../stores/calendar';

opaque type PropsType = {
    calendarStore: CalendarStore,
    event: {
        event: ItemType,
        isoDate: string
    },
    close: <T>() => T
};

let titleNode: ?HTMLInputElement;
let descriptionNode: ?HTMLTextAreaElement;

const generateId = (): string => Math.random().toString(36).substr(2, 9);

const CalendarEvent = observer(({calendarStore, event: { event = {title: '', description: ''}, isoDate = '' }, close = () => {}}: PropsType) => {
    const onSave = () => {
        if (event.id) {
            calendarStore.updateEvent(isoDate, event.id, titleNode ? titleNode.value : '', descriptionNode ? descriptionNode.value : '');
        } else {
            calendarStore.createEvent(isoDate, generateId(), titleNode ? titleNode.value : '', descriptionNode ? descriptionNode.value : '');
        }
        close();
    };
    return (
        <div className="calendar-event">
            <input
                type="text"
                ref={(el: HTMLInputElement | null): void => {
                    titleNode = el;
                    if (el) {
                        el.value = event.title;
                    }
                }}
            />
            <textarea
                ref={(el: HTMLTextAreaElement | null): void => {
                    descriptionNode = el;
                    if (el) {
                        el.value = event.description;
                    }
                }}
            />
            <button type="button" onClick={onSave}>{event.id ? 'Update' : 'Create'}</button>
            <style jsx>
                {`
                    .calendar-event {
                        display: flex;
                        flex-direction: column;
                        padding: 20px;
                        background-color: #ccc;
                        width: 40vw;
                    }
                    .calendar-event > * {
                        padding: 5px 0;
                        margin: 10px 0;
                    }
                    button {
                        cursor: pointer;
                    }
                `}
            </style>
        </div>
    );
});

export default CalendarEvent;
