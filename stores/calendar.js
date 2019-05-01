// @flow
import {observable, action} from 'mobx';
import axios, {AxiosResponse} from "axios/index";

const BASE_URL = process.env.BASE_URL;

opaque type Item = {
    id: string,
    title: string,
    description: string
}

opaque type Items = {
   [date: string]: Item[]
}

opaque type InitialData = {
    items: Items
}

class CalendarStore {
    @observable items: Items = {};

    constructor(initialData: InitialData) {
        this.setItems(initialData && initialData.items);
    }

    @action
    setItems(items: Items) {
        this.items = items;
    }

    @action
    updateEvent(isoDate: string, id: string, title: string, description: string) {
        const item: Item | any = this.items[isoDate].find((item: Item): boolean => item.id === id);
        item.title = title;
        item.description = description;
    }

    @action
    createEvent(isoDate: string, id: string, title: string, description: string) {
        const item = {id, title, description};
        const array = this.items[isoDate] || [];
        array.push(item);
        if (array.length === 1) {
            this.items[isoDate] = array;
        }
    }

    @action
    async fetch(): Promise<any> {
        const response: AxiosResponse = await axios.get(`${BASE_URL || ''}/static/data/calendar.json`);
        this.setItems(response.data);
        return {items: response.data};
    }
}

export default CalendarStore;
