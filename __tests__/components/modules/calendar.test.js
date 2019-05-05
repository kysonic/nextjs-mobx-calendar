import Calendar from '../../../components/modules/calendar/calendar';
import AppStore from '../../../stores/app';
import CalendarStore from '../../../stores/calendar';
import renderer from 'react-test-renderer';
import {APP_INITIAL_DATA, CALENDAR_INITIAL_DATA} from '../../../consts/test-data';

describe('Test Calendar component', () => {
    let appStore, calendarStore;
    beforeEach(() => {
        appStore = new AppStore(APP_INITIAL_DATA);
        calendarStore = new CalendarStore({items: CALENDAR_INITIAL_DATA});
    });
    test('Renders without crashes', () => {
        const tree = renderer.create(<Calendar appStore={appStore} calendarStore={calendarStore} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
