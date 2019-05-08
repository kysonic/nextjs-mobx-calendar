import Calendar from '../../../components/modules/calendar/calendar';
import MonthSwitcher from '../../../components/modules/calendar/month-switcher';
import AppStore from '../../../stores/app';
import CalendarStore from '../../../stores/calendar';
import 'jest-dom/extend-expect';
import {APP_INITIAL_DATA, CALENDAR_INITIAL_DATA} from '../../../consts/test-data';
import {render, fireEvent, cleanup, waitForDomChange} from 'react-testing-library';
import {useStaticRendering} from 'mobx-react';

// Otherwise observer's re-rendering won't be called
useStaticRendering(false);

// Mocks
const ReactDOM = jest.genMockFromModule('react-dom');
function mockCreatePortal(element, target) {
    return (element);
}
ReactDOM.createPortal = mockCreatePortal;

beforeEach(cleanup);

describe("Test Calendar component", () => {
    const appStore = new AppStore(APP_INITIAL_DATA);
    const calendarStore = new CalendarStore({items: CALENDAR_INITIAL_DATA});

    test("Month switcher: Click on arrows", async () => {
        const {getByText, getByTestId} = render(<MonthSwitcher dateStore={appStore.dateStore} />);

        expect(getByTestId("month")).toHaveTextContent('January');
        fireEvent.click(getByText('>'));
        expect(getByTestId("month")).toHaveTextContent('February');
        fireEvent.click(getByText('>'));
        expect(getByTestId("month")).toHaveTextContent('March');
        fireEvent.click(getByText('<'));
        fireEvent.click(getByText('<'));
        expect(getByTestId("month")).toHaveTextContent('January');
    });

    test("Month switcher: Click on arrows and check calendar table", () => {
        const {getByText, getByTestId} = render(<Calendar appStore={appStore} calendarStore={calendarStore}/>);

        expect(getByTestId("table")).toBeInTheDocument();
        expect(getByTestId("table-head")).toBeInTheDocument();
        expect(getByTestId("Monday")).toBeInTheDocument();
        expect(getByTestId("table-cell-0-1")).toMatchSnapshot();
        expect(getByTestId("table-cell-4-3")).toMatchSnapshot();
        fireEvent.click(getByText('>'));
        expect(getByTestId("table")).toBeInTheDocument();
        expect(getByTestId("table-head")).toBeInTheDocument();
        expect(getByTestId("Monday")).toBeInTheDocument();
        expect(getByTestId("table-cell-0-4")).toMatchSnapshot();
        expect(getByTestId("table-cell-4-4")).toMatchSnapshot();
        fireEvent.click(getByText('<'));
    });

    test("Popup: Open / close", async () => {
        const {getByTestId} = render(<Calendar appStore={appStore} calendarStore={calendarStore}/>);

        fireEvent.click(getByTestId('add-event-2019-01-02T00:00:00.000Z'));

        expect(getByTestId('popup')).toBeVisible();
        expect(getByTestId('popup-close')).toBeVisible();

        fireEvent.click(getByTestId('popup-close'));

        expect(getByTestId("popup")).not.toBeVisible();
    });

    test("Popup: Form", async () => {
        const {getByTestId} = render(<Calendar appStore={appStore} calendarStore={calendarStore}/>);

        fireEvent.click(getByTestId('add-event-2019-01-02T00:00:00.000Z'));

        expect(getByTestId('form')).toBeVisible();
        expect(getByTestId('form-input')).toBeVisible();
        expect(getByTestId('form-textarea')).toBeVisible();
        expect(getByTestId('form-button')).toBeVisible();

        fireEvent.change(getByTestId("form-input"), {
            target: { value: "Test title 1" }
        });

        expect(getByTestId("form-input").value).toBe('Test title 1');

        fireEvent.change(getByTestId("form-textarea"), {
            target: { value: "Test description 1" }
        });

        expect(getByTestId("form-textarea").value).toBe('Test description 1');

        fireEvent.click(getByTestId('form-button'));

        expect(getByTestId("table")).toMatchSnapshot();

        fireEvent.click(getByTestId('Test title 1-2019-01-02T00:00:00.000Z'));

        expect(getByTestId('form')).toBeVisible();
        expect(getByTestId('form-input')).toBeVisible();
        expect(getByTestId('form-textarea')).toBeVisible();
        expect(getByTestId('form-button')).toBeVisible();

        expect(getByTestId("form-input").value).toBe('Test title 1');
        expect(getByTestId("form-textarea").value).toBe('Test description 1');

        fireEvent.change(getByTestId("form-input"), {
            target: { value: "Test title upd" }
        });

        expect(getByTestId("form-input").value).toBe('Test title upd');

        fireEvent.change(getByTestId("form-textarea"), {
            target: { value: "Test description upd" }
        });

        expect(getByTestId("form-textarea").value).toBe('Test description upd');

        fireEvent.click(getByTestId('form-button'));

        expect(getByTestId("table")).toMatchSnapshot();
    });
});
