// @flow

import React from 'react';
import {observer} from 'mobx-react';
import TextStore from '../../../stores/text';

opaque type TextProps = {
    textStore: TextStore
};

const Text = observer(({textStore}: TextProps) => (
    <div className="text" data-testid="text">
        {textStore.text}
        <style jsx>
            {`
                padding: 20px;
                color: #aaa;
            `}
        </style>
    </div>
));

export default Text;
