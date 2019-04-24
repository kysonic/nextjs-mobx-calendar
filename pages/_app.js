import App, { Container } from 'next/app';
import React from 'react';
import {initializeStore} from '../stores/app';
import { Provider } from 'mobx-react';

class CalendarApp extends App {
    static async getInitialProps(appContext) {
        const appStore = initializeStore();
        // Initialize all stores
        await appStore.navigation.fetchItems();
        // Get app props
        const appProps = await App.getInitialProps(appContext);
        return {
            ...appProps,
            initialState: appStore
        };
    }

    constructor(props) {
        super(props);
        this.appStore = initializeStore(props.initialState);
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Provider appStore={this.appStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default CalendarApp;
