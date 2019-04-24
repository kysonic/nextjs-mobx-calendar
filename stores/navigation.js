import {observable, action} from 'mobx';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

class Navigation {
    @observable items = [];

    constructor(navigation) {
        this.items = navigation ? navigation.items : [];
    }

    @action
    async fetchItems() {
        const response = await axios.get(`${BASE_URL || ''}/static/data/navigation.json`);
        this.items = response.data;
    }

    @action
    setItems(items) {
        this.items = items;
    }
}

export default Navigation;
