// @flow
import {observable, action} from 'mobx';
import axios, {AxiosResponse} from "axios/index";

const BASE_URL = process.env.BASE_URL;

export type ItemType = {
    id?: string,
    title: string,
    description: string
};

opaque type ItemsType = {
   [date: string]: ItemType[]
};

opaque type InitialData = {
    items: ItemsType
};

class CalendarStore {
    @observable items: ItemsType = {};

    constructor(initialData: InitialData) {
        this.setItems(initialData && initialData.items);
    }

    @action
    setItems(items: ItemsType) {
        this.items = items;
    }

    @action
    updateEvent(isoDate: string, id: string, title: string, description: string) {
        const item: ItemType | any = this.items[isoDate].find((item: ItemType): boolean => item.id === id);
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
