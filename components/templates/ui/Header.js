import Link from 'next/link';
import {observer} from 'mobx-react';

const HeaderLinkItems = (title, items) => (
    <nav>
        <span className="title">{title}</span>
        <span className="sub-items">{items.map(link => <HeaderLink key={link.id} link={link} />)}</span>
    </nav>
);

const HeaderLink = ({link}) => link.items ? HeaderLinkItems(link.title, link.items) :
    (
        <Link href={link.href}>
            <a>{link.title}</a>
        </Link>
    );

const Header = observer((props) => {
    return (
        <nav>
            {
                props.store && props.store.items && props.store.items.map((link) => (
                    <HeaderLink key={link.id} link={link} />
                ))
            }
        </nav>
    );
});

export default Header;
