import React from 'react';
import {observer} from 'mobx-react';

let titleNode = null;
let descriptionNode = null;

const generateId = () => Math.random().toString(36).substr(2, 9);

const CalendarEvent = observer(({calendarStore, event: { event = {title: '', description: ''}, isoDate = '' }, close = () => {}}) => {
    const onSave = () => {
        event.id ? calendarStore.updateEvent(isoDate, event.id, titleNode.value, descriptionNode.value) :
        calendarStore.createEvent(isoDate, generateId(), titleNode.value, descriptionNode.value);
        close();
    };
    return (
        <div className="calendar-event">
            <input type="text" ref={(el) => {titleNode = el; el ? el.value = event.title : null}} />
            <textarea ref={(el) => {descriptionNode = el; el ? el.value = event.description : null}}></textarea>
            <button onClick={onSave}>{event.id ? 'Update' : 'Create'}</button>
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
