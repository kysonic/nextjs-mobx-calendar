import NavigationStore from '../../stores/navigation';
import axios from 'axios';
import {autorun} from 'mobx';

const NAVIGATION_INITIAL_DATA = [
    {
        "id": "home",
        "title": "Home",
        "href": "/"
    },
    {
        "id": "calendar",
        "title": "Calendar",
        "href": "/calendar"
    }
];

jest.mock('axios');
axios.get.mockResolvedValue({data: NAVIGATION_INITIAL_DATA});

describe('Test NavigationStore', () => {
    const initialData = {items: NAVIGATION_INITIAL_DATA};
    let navigationStore = null;

    beforeEach(() => {
        navigationStore = new NavigationStore(initialData);
    });

    test('Check initial data', () => {
        expect(navigationStore.items[0].title).toBe('Home');
    });

    test('Check set items', (done) => {
        navigationStore.setItems([{id:"Test", title: "Test", href: "/test"}]);
        autorun(() => {
            expect(navigationStore.items[0].title).toBe('Test');
            done();
        });
    });

    test('Check fetch', async (done) => {
        const data = await navigationStore.fetch();
        expect(data).toEqual(NAVIGATION_INITIAL_DATA);
        autorun(() => {
            expect(navigationStore.items[0].title).toBe('Home');
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/static/data/navigation.json');
            done();
        });
    });
});
