import {observable, action, configure} from 'mobx';
import fetch from 'isomorphic-unfetch';

class Navigation {
    constructor(appStore) {
        this.appStore = appStore;
    }
    @observable items = [];

    @action
    setItems(items) {
        this.items = items;
    }
}

export default Navigation;
