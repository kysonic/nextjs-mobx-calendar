import DateStore from '../../stores/date';

const INITIAL_DATE = new Date();

describe('Test NavigationStore', () => {
    let dateStore = null;

    beforeEach(() => {
        dateStore = new DateStore(INITIAL_DATE.toISOString());
    });

    test('Check initial state', () => {
        expect(dateStore.date).toEqual(INITIAL_DATE);
        expect(dateStore.dateToday).toEqual(INITIAL_DATE);
    });

    test('Check daysCount', () => {
        dateStore.setISODate('2019-04-10T00:00:00.000Z');
        expect(dateStore.daysCount).toBe(30);
        dateStore.setISODate('2019-05-10T00:00:00.000Z');
        expect(dateStore.daysCount).toBe(31);
        dateStore.setISODate('2019-02-10T00:00:00.000Z');
        expect(dateStore.daysCount).toBe(28);
    });

    test('Check firstMonthDay', () => {
        dateStore.setISODate('2019-04-10T00:00:00.000Z');
        expect(dateStore.firstMonthDay).toBe(1);
        dateStore.setISODate('2019-05-10T00:00:00.000Z');
        expect(dateStore.firstMonthDay).toBe(3);
        dateStore.setISODate('2019-02-10T00:00:00.000Z');
        expect(dateStore.firstMonthDay).toBe(5);
    });

    test('Check months', () => {
        dateStore.setISODate('2019-04-10T00:00:00.000Z');
        dateStore.incMonth();
        expect(dateStore.month).toBe(4);
        dateStore.decMonth();
        dateStore.decMonth();
        expect(dateStore.month).toBe(2);
    });
});
