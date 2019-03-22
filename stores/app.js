import {configure} from 'mobx';
import Navigation from './navigation';
import {useStaticRendering} from 'mobx-react';
import {toJS} from 'mobx';

configure({ enforceActions: "observed" });

const isServer = !process.browser;
useStaticRendering(isServer);

class App {
    constructor() {
        this.navigation = new Navigation();
    }
}

export default App;

export function initializeStore(initialData) {
    if (isServer) {
        return new App(initialData);
    }
    if (window.appStore === null) {
        window.appStore = new App(initialData);
    }
    return window.appStore;
}
