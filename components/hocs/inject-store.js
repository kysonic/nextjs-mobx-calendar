import React, {Component} from 'react';

export const injectStoreHOC = WrappedComponent => {
    return class WithStores extends Component {
        static async getInitialProps() {
            const result = await Promise.all(Object.values(WrappedComponent.stores).map((Store) => {
                const store = new Store();
                return store.fetch && typeof store.fetch === 'function' ? store.fetch() : null;
            }));
            return {initialState: result};
        }
        constructor(props) {
            super(props);
            this.stores = {};
            Object.keys(WrappedComponent.stores).forEach((storeName, index) => {
               this.stores[storeName] = new WrappedComponent.stores[storeName](props.initialState[index]);
            });
        }
        render() {
            return <WrappedComponent stores={this.stores} {...this.props} />;
        }
    };
};
