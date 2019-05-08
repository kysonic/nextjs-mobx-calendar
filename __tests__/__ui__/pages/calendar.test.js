import CalendarPage from '../../../pages/calendar';
import renderer from 'react-test-renderer';
import {Provider} from 'mobx-react/index';
import AppStore from '../../../stores/app';
import {APP_INITIAL_DATA} from '../../../consts/test-data';
import axios from 'axios/index';
import ReactDOM from "react-dom";
import {mockCreatePortal} from '../../__mocks__/react-dom.mock';

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

// Mocks
jest.mock('axios');
axios.get.mockResolvedValue({data: CALENDAR_DATA});
jest.mock('react-dom');
ReactDOM.createPortal = jest.fn(mockCreatePortal);

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

