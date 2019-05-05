import CalendarStore from '../../stores/calendar';
import axios from 'axios';
import {autorun} from 'mobx';

const INITIAL_DATE = "2019-02-10T00:00:00.000Z";

const INITIAL_ITEM = {
    "id": "abcd1",
    "title": "Test tile",
    "description": "Test description"
};

const INITIAL_ITEMS = {
    [INITIAL_DATE]: [INITIAL_ITEM]
};

const CALENDAR_DATA = {
    "2019-04-10T00:00:00.000Z": [
        {
            "id": "abcde1",
            "title": "Action 1",
            "description": "Description of action 1"
        },
        {
            "id": "abcde2",
            "title": "Action 2",
            "description": "Description of action 2"
        }
    ],
    "2019-03-11T00:00:00.000Z": [
        {
            "id": "abcde2",
            "title": "Action 2",
            "description": "Description of action 2"
        },
        {
            "id": "abcde3",
            "title": "Action 4",
            "description": "Description of action 4"
        }
    ]
};

jest.mock('axios');
axios.get.mockResolvedValue({data: CALENDAR_DATA});

describe('Test CalendarStore', () => {
    const initialData = {items: INITIAL_ITEMS};
    let calendarStore = null;

    beforeEach(() => {
        calendarStore = new CalendarStore(initialData);
    });

    test('Check initial data', () => {
        expect(calendarStore.items[INITIAL_DATE][0]).toEqual(INITIAL_ITEM);
    });

    test('Update event', (done) => {
        const newTitle = 'New title';
        calendarStore.updateEvent(INITIAL_DATE, INITIAL_ITEM.id, newTitle, INITIAL_ITEM.description);
        autorun(() => {
            expect(calendarStore.items[INITIAL_DATE][0].title).toBe(newTitle);
            done();
        });
    });

    test('Create event', (done) => {
        calendarStore.createEvent(INITIAL_DATE, 'abcd', 'Super', 'OMG');
        autorun(() => {
            expect(calendarStore.items[INITIAL_DATE][1]).toEqual({id: 'abcd', title: 'Super', description: 'OMG'});
            expect(calendarStore.items[INITIAL_DATE].length).toBe(2);
            done();
        });
    });

    test('Create event with error', (done) => {
        calendarStore.createEvent(INITIAL_DATE, '123', '231', '333');
        autorun(() => {
            expect(calendarStore.items[INITIAL_DATE][2]).toEqual({id: '123', title: '231', description: '3334'});
        }, {
            onError() {
                done();
            }
        });
    });

    test('Fetch data', async (done) => {
        const data = await calendarStore.fetch();
        expect(data.items).toEqual(CALENDAR_DATA);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('/static/data/calendar.json');
        autorun(() => {
            expect(calendarStore.items['2019-03-11T00:00:00.000Z'][0].title).toBe('Action 2');
            done();
        });
    });
});
