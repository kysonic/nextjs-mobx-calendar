import Link from 'next/link';
import {observer} from 'mobx-react';

const HeaderLinkItems = (title, items) => (
    <nav>
        <span className="title">{title}</span>
        <ul className="sub-items">{items.map(link => <li><HeaderLink key={link.id} link={link} /></li>)}</ul>
        <style jsx>
            {`
                .title {
                    cursor: pointer;
                }
                ul.sub-items {
                    display: none;
                    position: absolute;
                    list-style: none;
                    margin: 0;
                    padding: 10px;
                    background: #ccc;
                }
                ul.sub-items li {
                    margin: 5px 0;
                }
            `}
        </style>
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
            <ul>
                {
                    props.store && props.store.items && props.store.items.map((link) => (
                        <li><HeaderLink key={link.id} link={link} /></li>
                    ))
                }
            </ul>
            <style jsx>
                {`
                    nav {
                        width: 100%;
                        height: 40px;
                        background: #ccc;
                        padding: 10px;
                    }
                    ul {
                        list-style: none;
                        display: inline-block;
                    }
                    ul li {
                        display: inline-block;
                        margin: 0 0 0 10px;
                    }
                `}
            </style>
            <style>
                {`
                     ul li:hover .sub-items {
                        display: block;
                     }
                `}
            </style>
        </nav>
    );
});

export default Header;
