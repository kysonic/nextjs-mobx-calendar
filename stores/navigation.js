import {observable, action, configure} from 'mobx';
import fetch from 'isomorphic-unfetch';

configure({ enforceActions: "observed" });

class Navigation {
    constructor() {
        this.init();
    }
    async init() {
        const response = await fetch('/static/data/navigation.json');
        const json = await response.json();
        this.setItems(json);
    }
    @observable items = [];

    @action
    setItems(items) {
        this.items = items;
    }
}

export default Navigation;
