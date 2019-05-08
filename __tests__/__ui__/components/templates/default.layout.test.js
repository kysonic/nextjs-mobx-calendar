import Layout from '../../../../components/templates/layouts/default';
import renderer from 'react-test-renderer';
import AppStore from '../../../../stores/app';
import {APP_INITIAL_DATA} from '../../../../consts/test-data';
import { Provider } from 'mobx-react/index';
import {inject, observer} from "mobx-react/index";

const TestComponent = inject('appStore')(observer(({ appStore: { dateStore } }) => {
    return (
        <div>
            <div className="month">{dateStore.month}</div>
        </div>
    )
}));

describe('Test Default Layput Component', () => {
    let appStore = new AppStore(APP_INITIAL_DATA);

    test('Renders without crashes', () => {
        const tree = renderer.create(
            <Provider appStore={appStore}>
                <Layout title={'TEST LAYOUT'}>
                    <TestComponent />
                </Layout>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
