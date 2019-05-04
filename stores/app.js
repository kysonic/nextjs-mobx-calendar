// @flow

import {configure} from 'mobx';
import NavigationStore from './navigation';
import DateStore from './date';
import {useStaticRendering} from 'mobx-react';

configure({ enforceActions: 'observed' });
// $FlowFixMe
const isServer: boolean = !process.browser;
useStaticRendering(isServer);

opaque type InitialDataType = {
    navigationStore: NavigationStore,
    dateStore: DateStore
};

class AppStore {

    navigationStore: NavigationStore;

    dateStore: DateStore;

    constructor(initialData?: InitialDataType) {
        this.navigationStore = new NavigationStore(initialData && initialData.navigationStore);
        this.dateStore = new DateStore(new Date().toISOString());
    }
}

export default AppStore;

export function initializeStore(initialData?: InitialDataType) {
    if (isServer) {
        return new AppStore(initialData);
    }

    if (!window.appStore) {
        window.appStore = new AppStore(initialData);
    }
    return window.appStore;
}
