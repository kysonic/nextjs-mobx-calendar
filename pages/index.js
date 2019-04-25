import React from 'react';
import Layout from '../components/templates/layouts/default';
import Text from '../components/modules/text/text';
import TextStore from '../stores/text';
import {injectStoreHOC} from '../components/hocs/inject-store';

@injectStoreHOC
class Index extends React.Component {
    static stores = {textStore: TextStore};
    render() {
       return (
           <Layout title={'Welcome!'}>
               <Text textStore={this.props.stores.textStore}></Text>
           </Layout>
       );
    }
};


export default Index;
