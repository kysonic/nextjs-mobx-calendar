// @flow
import {observable, action} from 'mobx';
import axios, {AxiosResponse} from "axios/index";

const BASE_URL = process.env.BASE_URL;

opaque type InitialData = {
    text: string
}

class TextStore {
    @observable text: string;

    constructor(initialData: InitialData) {
        this.setText(initialData && initialData.text);
    }

    @action
    setText(text: string) {
        this.text = text;
    }

    @action
    async fetch(): Promise<void> {
        const response: AxiosResponse = await axios.get(`${BASE_URL || ''}/static/data/text.json`);
        this.setText(response.data.text);
        return response.data;
    }
}

export default TextStore;
