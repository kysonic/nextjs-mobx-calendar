// @flow
import React from 'react';
import Link from 'next/link';
import {observer, inject} from 'mobx-react';
import type AppStore from '../../../stores/app';
import type {ItemType} from '../../../stores/navigation';
import type {Node} from 'react';

const HeaderLinkItems = (title: string, items: ItemType[]): Node => (
    <nav>
        <span className="title">{title}</span>
        <ul className="sub-items">{items.map((link: ItemType): Node => <li key={link.id}><HeaderLink link={link} /></li>)}</ul>
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

opaque type HeaderLinkProps = {
    link: ItemType
};

const HeaderLink = ({link}: HeaderLinkProps): Node => {
    if (link.items && link.items.length) {
        return HeaderLinkItems(link.title, link.items);
    }

    return (
        <Link href={link.href}>
            <span>{link.title}</span>
        </Link>
    );
};

opaque type HeaderProps = {
    appStore: AppStore
};

const Header = inject('appStore')(observer(({ appStore: { navigationStore } }: HeaderProps) => (
    <nav>
        <ul>
            {
                navigationStore && navigationStore.items && navigationStore.items.map((link: ItemType) => (
                    <li key={link.id}>
                        <HeaderLink link={link} />
                    </li>
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
)));

export default Header;
