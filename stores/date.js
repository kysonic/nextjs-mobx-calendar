import {observable, computed, action} from 'mobx';

class DateStore {
    @observable ISODate;
    @observable ISODateToday;

    constructor(date) {
        this.setISODate(date);
        this.setISODateToday(date);
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

    @computed get monthToday() {
        return this.dateToday.getMonth();
    }

    @computed get dayToday() {
        return this.dateToday.getDate();
    }

    @computed get yearToday() {
        return this.dateToday.getFullYear();
    }

    @computed get daysCount() {
        return new Date(this.year, this.month + 1, 0).getDate();
    }

    @computed get firstMonthDay() {
        const day = new Date(this.year, this.month, 1).getDay();
        return day ? day : 7;
    }

    @computed get dateToday() {
        return new Date(this.ISODateToday);
    }

    @action
    setISODate(ISODate) {
        this.ISODate = ISODate;
    }

    @action
    setISODateToday(ISODate) {
        this.ISODateToday = ISODate;
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
