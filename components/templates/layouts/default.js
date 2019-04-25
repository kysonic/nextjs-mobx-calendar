import Head from 'next/head';
import Header from '../ui/Header';
import {inject} from 'mobx-react';

export default inject('appStore')((props) => (
    <div>
        <Head>
            <title>{props.title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <div className="content">
            {props.children && typeof props.children === 'function' ? props.children(props.appStore) : props.children}
        </div>
        <style jsx global>
            {`
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Open Sans', sans-serif;
                }
            `}
        </style>
    </div>
));
