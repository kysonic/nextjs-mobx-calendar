import TextStore from '../../../stores/text';
import axios from 'axios/index';

const DEFAULT_TEXT = 'Default text';
const TEXT_DATA = {
    "text": "Welcome to the Mobx Calendar"
};

jest.mock('axios');
axios.get.mockResolvedValue({data: TEXT_DATA});

describe('Test TextStore', () => {
    const initialData = {text: DEFAULT_TEXT};
    let textStore = null;

    beforeEach(() => {
        textStore = new TextStore(initialData);
    });

    test('Initialize store', () => {
        let textStore = new TextStore(initialData);
        expect(textStore.text).toBe(DEFAULT_TEXT);
    });

    test('Set Text', () => {
        textStore.setText('New Text');
        expect(textStore.text).toBe('New Text');
    });

    test('Fetch text', async () => {
        const data = await textStore.fetch();
        expect(data).toBe(TEXT_DATA);
        expect(textStore.text).toBe('Welcome to the Mobx Calendar');
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('/static/data/text.json');
    });
});
