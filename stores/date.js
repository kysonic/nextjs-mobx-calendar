import {observable, computed, action} from 'mobx';

class DateStore {
    @observable ISODate: string;
    @observable ISODateToday: string;

    constructor(date: string) {
        this.setISODate(date);
        this.setISODateToday(date);
    }

    @computed get date(): Date {
        return new Date(Date.parse(this.ISODate));
    }

    @computed get month(): number {
        return this.date.getMonth();
    }

    @computed get day(): number {
        return this.date.getDay();
    }

    @computed get year(): number {
        return this.date.getFullYear();
    }

    @computed get monthToday(): number {
        return this.dateToday.getMonth();
    }

    @computed get dayToday(): number {
        return this.dateToday.getDate();
    }

    @computed get yearToday(): number {
        return this.dateToday.getFullYear();
    }

    @computed get daysCount(): number {
        return new Date(this.year, this.month + 1, 0).getDate();
    }

    @computed get firstMonthDay(): number {
        const day: number = new Date(this.year, this.month, 1).getDay();
        return day ? day : 7;
    }

    @computed get dateToday(): Date {
        return new Date(this.ISODateToday);
    }

    @action
    setISODate(ISODate: string): void {
        this.ISODate = ISODate;
    }

    @action
    setISODateToday(ISODate: string): void {
        this.ISODateToday = ISODate;
    }

    @action incMonth(): void {
        this.setMonth(this.month + 1);
    }

    @action decMonth(): void {
        this.setMonth(this.month - 1);
    }

    @action setMonth(month: number): void {
        this.date.setMonth(month);
        this.setISODate(this.date.toISOString());
    }
}

export default DateStore;
