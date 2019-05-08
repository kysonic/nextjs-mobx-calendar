import IndexPage from '../../../pages';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react/index';
import AppStore from '../../../stores/app';
import {APP_INITIAL_DATA, TEXT_DATA} from '../../../consts/test-data';

import axios from 'axios/index';

jest.mock('axios');
axios.get.mockResolvedValue({data: TEXT_DATA});

describe('Index page tests', () => {
    test('Renders without crashes', () => {
        const appStore = new AppStore(APP_INITIAL_DATA);
        const tree = renderer.create(
            <Provider appStore={appStore}>
                <IndexPage initialState={ [{text: TEXT_DATA.text}] } />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

