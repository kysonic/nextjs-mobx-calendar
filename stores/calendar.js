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
    async fetch() {
        const response = await axios.get(`${BASE_URL || ''}/static/data/calendar.json`);
        this.setItems(response.data);
        return {items: response.data};
    }
}

export default CalendarStore;
