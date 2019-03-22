import Head from 'next/head';
import Header from '../ui/Header';
import {inject} from 'mobx-react';

export default inject('appStore')((props) => (
    <div>
        <Head>
            <title>{props.title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header store={props.appStore && props.appStore.navigation}  />
        <div className="content">
            {props.children}
        </div>
    </div>
));
