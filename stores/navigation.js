// @flow

import {observable, action} from 'mobx';
import axios from 'axios';
import type {AxiosResponse} from 'axios';

const BASE_URL = process.env.BASE_URL;

export type ItemType = {
    id: string,
    title: string,
    href: string,
    items?: ItemType[]
};

class NavigationStore {
    @observable items: ItemType[] = [];

    @observable isInit: boolean = false;

    constructor(navigation?: NavigationStore): void {
        this.items = navigation ? navigation.items : [];
    }

    @action
    async fetch(): any {
        if (this.isInit) {
            return this.items;
        }
        const response: AxiosResponse = await axios.get(`${BASE_URL || ''}/static/data/navigation.json`);
        this.setItems(response.data);
        this.setIsInit(true);
        return response.data;
    }

    @action
    setItems(items: ItemType[]): void {
        this.items = items;
    }

    @action
    setIsInit(isInit: boolean): void {
        this.isInit = isInit;
    }
}

export default NavigationStore;
