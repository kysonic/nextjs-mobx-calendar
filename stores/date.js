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

    @computed get month() {
        return this.date.getMonth();
    }

    @computed get day() {
        return this.date.getDay();
    }

    @computed get year() {
        return this.date.getFullYear();
    }

    @computed get daysCount() {
        return new Date(this.year, this.month + 1, 0).getDate();
    }

    @computed get firstMonthDay() {
        const day = new Date(this.year, this.month, 1).getDay();
        return day ? day : 7;
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
}

export default DateStore;
