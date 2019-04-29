import React from 'react';
import Layout from '../components/templates/layouts/default';
import Calendar from '../components/modules/calendar/calendar';
import {injectStoreHOC} from '../components/hocs/inject-store';
import CalendarStore from '../stores/calendar';

@injectStoreHOC
class CalendarPage extends React.Component {
    static stores = {calendarStore: CalendarStore};
    render() {
        return (
            <Layout title={'Calendar'}>
                {(appStore) => <Calendar calendarStore={this.props.stores.calendarStore} appStore={appStore}></Calendar>}
            </Layout>
        );
    }
};

export default CalendarPage;
