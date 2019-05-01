// @flow

import {observable, action} from 'mobx';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

type Item = {
    id: string,
    title: string,
    href: string
}

class NavigationStore {
    @observable items: Item[] = [];
    @observable isInit: boolean = false;

    constructor(navigation: NavigationStore) {
        this.items = navigation ? navigation.items : [];
    }

    @action
    async fetchItems(): void {
        if (this.isInit) {
            return this.items;
        }
        const response = await axios.get(`${BASE_URL || ''}/static/data/navigation.json`);
        this.setItems(response.data);
        this.setIsInit(true);
    }

    @action
    setItems(items: Item[]): void {
        this.items = items;
    }

    @action
    setIsInit(isInit: boolean): void {
        this.isInit = isInit;
    }
}

export default NavigationStore;
