import Head from 'next/head';
import Header from '../header/Header';
import NavigationStore  from '../../../stores/navigation';
import scss from './default.scss';

const navigationStore = new NavigationStore();

export default (props) => (
    <div>
        <Head>
            <title>{props.title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header store={navigationStore}  />
        <div className="content">
            {props.children}
        </div>
    </div>
)
