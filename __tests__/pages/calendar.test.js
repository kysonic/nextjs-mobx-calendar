import CalendarPage from '../../pages/calendar';
import renderer from 'react-test-renderer';
import {Provider} from 'mobx-react';
import AppStore from '../../stores/app';
import {APP_INITIAL_DATA} from '../../consts/test-data';

import axios from 'axios';

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
    ]
};

jest.mock('axios');
axios.get.mockResolvedValue({data: CALENDAR_DATA});

describe('Calendar page tests', () => {
    test('Renders without crashes', () => {
        const appStore = new AppStore(APP_INITIAL_DATA);
        const tree = renderer.create(
            <Provider appStore={appStore}>
                <CalendarPage initialState={[{items: CALENDAR_DATA}]}/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

