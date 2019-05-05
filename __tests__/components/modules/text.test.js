import Text from '../../../components/modules/text/text';
import renderer from 'react-test-renderer';
import {render, cleanup} from 'react-testing-library';
import TextStore from '../../../stores/text';
import {TEXT_DATA} from '../../../consts/test-data';
import 'jest-dom/extend-expect';
import axios from 'axios';

jest.mock('axios');

axios.get.mockResolvedValueOnce({data: TEXT_DATA});

describe('Test Text component', () => {
    afterEach(cleanup);

    test('Snap Testing', () => {
        const tree = renderer.create(<Text textStore={ {text: "TEST TEXT"} } />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('UI Testing', async () => {
        const textStore = new TextStore({ text: "TEST TEXT"});
        const { getByTestId } = render(<Text textStore={textStore} />);
        expect(getByTestId('text')).toHaveTextContent('TEST TEXT');
        await textStore.fetch();
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('/static/data/text.json');
        expect(getByTestId('text')).toHaveTextContent('Welcome to the Mobx Calendar');
    });
});
