import React from 'react';
import {injectStoreHOC} from '../../../components/hocs/inject-store';
import renderer from 'react-test-renderer';
import TextStore from '../../../stores/text';
import DateStore from '../../../stores/date';

class TestTextComponent extends React.Component {
    render() {
        return (
            <>
                <h1>TEST REACT COMPONENT</h1>
                <div className="content" dangerouslySetInnerHTML={ {__html: this.props.stores.textStore.text} } />
            </>
        )
    }
}

class TestDateComponent extends React.Component {
    render() {
        return (
            <>
                <h1>TEST DATE COMPONENT</h1>
                <div className="date">{this.props.stores.dateStore.month}</div>
                <TestTextComponent {...this.props} />
            </>
        )
    }
}

describe('Inject store test', () => {

    test('Inject one store', () => {
        TestTextComponent.stores = {textStore: TextStore};
        const TestComponentWithStore = injectStoreHOC(TestTextComponent);
        const tree = renderer.create(<TestComponentWithStore initialState={ [{text: "<p>123</p>"}] }/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Inject few stores', () => {
        TestDateComponent.stores = {textStore: TextStore, dateStore: DateStore};
        const TestComponentWithStore = injectStoreHOC(TestDateComponent);
        const tree = renderer.create(<TestComponentWithStore initialState={ [{text: "<p>123</p>"}, "2019-04-10T00:00:00.000Z"] }/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

