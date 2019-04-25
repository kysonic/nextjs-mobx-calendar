import {observable, computed, action} from 'mobx';

class DateStore {
    @observable ISODate;

    constructor(date) {
        this.setISODate(date);
    }

    @action
    setISODate(ISODate) {
        this.ISODate = ISODate;
    }

    @computed get date() {
        return new Date(Date.parse(this.ISODate));
    }

    @action incMonth() {
        this.setMonth(this.month + 1);
    }

    @action decMonth() {
        this.setMonth(this.month - 1);
    }

    @action setMonth(month) {
        this.date.setMonth(month);
        this.setISODate(this.date.toISOString());
    }

    @computed get month() {
        return this.date.getMonth();
    }

    @computed get day() {
        return this.date.getDay();
    }

    @computed get year() {
        return this.date.getFullYear();
    }
}

export default DateStore;
