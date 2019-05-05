import Header from '../../../components/templates/ui/Header';
import renderer from 'react-test-renderer';
import AppStore from '../../../stores/app';
import {APP_INITIAL_DATA} from '../../../consts/test-data';


describe('Test Header Component', () => {
    let appStore = new AppStore(APP_INITIAL_DATA);
    test('Renders without crashes', () => {
        const tree = renderer.create(<Header appStore={ appStore } />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
