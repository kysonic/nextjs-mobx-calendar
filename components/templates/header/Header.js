import scss from './Header.scss';
import Link from 'next/link';
import {observer} from 'mobx-react';

const Header = observer((props) => {
    return (
        <div className={scss.Header}>
            {
                props.store.items && props.store.items.map((link) => (
                    <Link href={link.href} key={link.id}>
                        <a>{link.title}</a>
                    </Link>
                ))
            }
        </div>
    );
});

export default Header;
