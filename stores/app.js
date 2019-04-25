import {configure} from 'mobx';
import NavigationStore from './navigation';
import DateStore from './date';
import {useStaticRendering} from 'mobx-react';

configure({ enforceActions: "observed" });

const isServer = !process.browser;
useStaticRendering(isServer);

class App {
    constructor(initialData) {
        this.navigationStore = new NavigationStore(initialData && initialData.navigationStore);
        this.dateStore = new DateStore(new Date());
    }
}

export default App;

export function initializeStore(initialData) {
    if (isServer) {
        return new App(initialData);
    }

    if (!window.appStore) {
        window.appStore = new App(initialData);
    }
    return window.appStore;
}
