import Link from 'next/link';
import {observer, inject} from 'mobx-react';

const HeaderLinkItems = (title, items) => (
    <nav>
        <span className="title">{title}</span>
        <ul className="sub-items">{items.map(link => <li key={link.id}><HeaderLink link={link} /></li>)}</ul>
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
                    background-color: #ccc;
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

const Header = inject('appStore')(observer(({appStore: {navigationStore}}) => {
    return (
        <nav>
            <ul>
                {
                    navigationStore && navigationStore.items && navigationStore.items.map((link) => (
                        <li key={link.id} ><HeaderLink link={link} /></li>
                    ))
                }
            </ul>
            <style jsx>
                {`
                    nav {
                        width: 100%;
                        height: 40px;
                        background-color: #ccc;
                        padding: 10px;
                    }
                    ul {
                        list-style: none;
                        display: inline-block;
                        margin: 0;
                        padding: 12px 0;
                    }
                    ul li {
                        display: inline-block;
                        margin: 0 0 0 10px;
                        text-transform: uppercase;
                        color: #666;
                    }
                `}
            </style>
            <style>
                {`
                     ul li:hover .sub-items {
                        display: block;
                     }
                     ul li a, ul li a:visited, ul li a:active {
                        color: #666;
                     }
                     ul li:hover a {
                        color: #444;
                     }
                `}
            </style>
        </nav>
    );
}));

export default Header;
