// @flow

import React from 'react';
import Layout from '../components/templates/layouts/default';
import Calendar from '../components/modules/calendar/calendar';
import {injectStoreHOC} from '../components/hocs/inject-store';
import CalendarStore from '../stores/calendar';
import type {Node} from 'react';
import type AppStore from '../stores/app';

opaque type Props = {
    stores: {
        calendarStore: CalendarStore
    }
};

@injectStoreHOC
class CalendarPage extends React.Component<Props> {

    static stores = {calendarStore: CalendarStore};

    render(): Node {
        return (
            <Layout title="Calendar">
                {
                    // $FlowFixMe
                    (appStore: AppStore): Node => <Calendar calendarStore={this.props.stores.calendarStore} appStore={appStore} />
                }
            </Layout>
        );
    }
}

export default CalendarPage;
