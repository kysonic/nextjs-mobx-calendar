import {observable, action} from 'mobx';
import axios from "axios/index";

const BASE_URL = process.env.BASE_URL;

class CalendarStore {
    @observable items = {};

    constructor(initialData) {
        this.setItems(initialData && initialData.items);
    }

    @action
    setItems(items) {
        this.items = items;
    }

    @action
    updateEvent(isoDate, id, title, description) {
        const item = this.items[isoDate].find(item => item.id === id);
        item.title = title;
        item.description = description;
    }

    @action
    createEvent(isoDate, id, title, description) {
        const item = {id, title, description};
        const array = this.items[isoDate] || [];
        array.push(item);
        if (array.length === 1) {
            this.items[isoDate] = array;
        }
    }

    @action
    async fetch() {
        const response = await axios.get(`${BASE_URL || ''}/static/data/calendar.json`);
        this.setItems(response.data);
        return {items: response.data};
    }
}

export default CalendarStore;
