import {observable, action} from 'mobx';
import axios from "axios/index";

const BASE_URL = process.env.BASE_URL;

class TextStore {
    @observable text;

    constructor(initialData) {
        this.setText(initialData && initialData.text);
    }

    @action
    setText(text) {
        this.text = text;
    }

    @action
    async fetch() {
        const response = await axios.get(`${BASE_URL || ''}/static/data/text.json`);
        this.setText(response.data.text);
        return response.data;
    }
}

export default TextStore;
