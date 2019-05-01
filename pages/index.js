// @flow

import React from 'react';
import type {Node} from 'react';
import Layout from '../components/templates/layouts/default';
import Text from '../components/modules/text/text';
import TextStore from '../stores/text';
import {injectStoreHOC} from '../components/hocs/inject-store';
import type {StoresType} from '../components/hocs/inject-store';

opaque type Props = {
    stores: StoresType
};

@injectStoreHOC
class Index extends React.Component<Props> {
    static stores = {textStore: TextStore};

    render(): Node {
        return (
            <Layout title="Welcome!">
                <Text textStore={this.props.stores.textStore} />
            </Layout>
        );
    }
}

export default Index;
