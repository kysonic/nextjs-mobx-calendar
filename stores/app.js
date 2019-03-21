import {configure} from 'mobx';
import Navigation from './navigation';

configure({ enforceActions: "observed" });

class App {
    constructor() {
        this.navigation = new Navigation(this);
    }
}

export default App;
