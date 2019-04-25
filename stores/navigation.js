import {observable, action} from 'mobx';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

class NavigationStore {
    @observable items = [];
    @observable isInit = false;

    constructor(navigation) {
        this.items = navigation ? navigation.items : [];
    }

    @action
    async fetchItems() {
        if (this.isInit) {
            return this.items;
        }
        const response = await axios.get(`${BASE_URL || ''}/static/data/navigation.json`);
        this.setItems(response.data);
        this.setIsInit(true);
    }

    @action
    setItems(items) {
        this.items = items;
    }

    @action
    setIsInit(isInit) {
        this.isInit = isInit;
    }
}

export default NavigationStore;
