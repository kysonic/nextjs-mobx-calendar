// @flow
import React, {Component} from 'react';
import type { AbstractComponent, Node } from 'react';

class StoreType {
    fetch: () => Promise<any>
}

export type StoresType = {
    [key: string]: StoreType
};

opaque type ComponentWithStore = AbstractComponent<any> & {stores: any};

opaque type InitialState = {
    initialState: any
};

export function injectStoreHOC(WrappedComponent: ComponentWithStore): AbstractComponent<any> {
    return class WithStores extends Component<any> {
        stores: StoresType;

        static async getInitialProps(): Promise<InitialState> {
            const result = await Promise.all(Object.values(WrappedComponent.stores).map((Store: any): Promise<any> | null => {
                const store = new Store();
                return store.fetch && typeof store.fetch === 'function' ? store.fetch() : null;
            }));
            return {initialState: result};
        }

        constructor(props: any) {
            super(props);
            this.stores = {};
            Object.keys(WrappedComponent.stores).forEach((storeName: string, index: number): void => {
                this.stores[storeName] = new WrappedComponent.stores[storeName](props.initialState ? props.initialState[index] : {});
            });
        }

        render(): Node {
            return <WrappedComponent stores={this.stores} {...this.props} />;
        }
    };
}
