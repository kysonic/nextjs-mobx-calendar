import React from 'react';
import Layout from '../components/templates/layouts/default';
import Calendar from '../components/modules/calendar/calendar';

const CalendarPage = () => {
    return (
        <Layout title={'Calendar'}>
            {(appStore) => <Calendar appStore={appStore}></Calendar>}
        </Layout>
    );
};

export default CalendarPage;
