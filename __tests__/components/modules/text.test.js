import Text from '../../../components/modules/text/text';
import renderer from 'react-test-renderer';

describe('Test Text component', () => {
    test('Renders without crashes', () => {
        const tree = renderer.create(<Text textStore={ {text: "TEST TEXT"} } />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
