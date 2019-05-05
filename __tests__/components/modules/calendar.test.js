import Calendar from '../../../components/modules/calendar/calendar';
import MonthSwitcher from '../../../components/modules/calendar/month-switcher';
import AppStore from '../../../stores/app';
import CalendarStore from '../../../stores/calendar';
import renderer from 'react-test-renderer';
import 'jest-dom/extend-expect';
import {APP_INITIAL_DATA, CALENDAR_INITIAL_DATA} from '../../../consts/test-data';
import {render, fireEvent, waitForElement, cleanup} from 'react-testing-library';
import {autorun} from 'mobx';

describe("Test Calendar component", () => {
    const appStore = new AppStore(APP_INITIAL_DATA);
    const calendarStore = new CalendarStore({items: CALENDAR_INITIAL_DATA});

    test("Snap testing", () => {
        const tree = renderer
            .create(<Calendar appStore={appStore} calendarStore={calendarStore}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});


describe("UI Testing", () => {
    afterEach(cleanup);

    const appStore = new AppStore(APP_INITIAL_DATA);
    const calendarStore = new CalendarStore({items: CALENDAR_INITIAL_DATA});

    test("Month switcher: Click on arrows", async (done) => {
        const {getByTestId} = render(<MonthSwitcher dateStore={appStore.dateStore}/>);
        expect(getByTestId("month")).toHaveTextContent('January');
        appStore.dateStore.incMonth();

    });
});
