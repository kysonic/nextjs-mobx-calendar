import React from 'react';
import {observer} from 'mobx-react';

const Text = observer(({textStore}) => {
    return (
        <div className="text">
            {textStore.text}
            <style jsx>{`
                padding: 20px;
                color: #aaa;
            `}</style>
        </div>
    );
});

export default Text;
