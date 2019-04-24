import {observable, computed, action} from 'mobx';

class Date {
    @observable date;

    constructor(date) {
        this.setDate(date);
    }

    @action
    setDate(date) {
        this.date = date;
    }

    @computed get month() {
        return this.date.getMonth() + 1;
    }

    @computed get day() {
        return this.date.getDay();
    }

    @computed get year() {
        return this.date.getFullYear();
    }
}

export default Date;
