import {observable, computed, action} from 'mobx';

class Date {
    @observable.ref date;

    constructor(date) {
        this.setDate(date);
    }

    @action
    setDate(date) {
        this.date = date;
    }

    @action incMonth() {
        this.setMonth(this.month + 1);
    }

    @action decMonth() {
        this.setMonth(this.month - 1);
    }

    @action setMonth(month) {
        this.date.setMonth(month);
    }

    @computed.struct get month() {
        return this.date.getMonth();
    }

    @computed.struct get day() {
        return this.date.getDay();
    }

    @computed.struct get year() {
        return this.date.getFullYear();
    }
}

export default Date;
