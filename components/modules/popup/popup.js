// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import type {Node} from 'react';

opaque type PopupProps = {
    ref: ?Node,
    children?: Node
};

opaque type PopupState = {
    opened: boolean
};

export function getBody(): HTMLBodyElement {
    try {
        return document.body;
    } catch(e) {}
    return null;
}

class Popup extends React.Component<PopupProps, PopupState> {
    state = {
        opened: false
    };

    open = () => {
        this.setState({opened: true});
    };

    close = () => {
        this.setState({opened: false});
    };

    render() {
        return getBody() && ReactDOM.createPortal(
            (
                <div className={`popup ${this.state.opened ? 'is-opened' : ''}`} data-testid="popup">
                    <div data-testid="popup-close" role="button" tabIndex="0" className="close" onClick={this.close}>x</div>
                    <div className="content">
                        {this.props.children}
                    </div>
                    <style jsx>
                        {`
                            .popup {
                                position: fixed;
                                width: 100vw;
                                height: 100vh;
                                background-color: rgba(256,256,256,0.6);
                                top: 0;
                                left:0;
                                display: none;
                            }
                            .popup.is-opened {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            .close {
                                position: absolute;
                                left: calc(100% - 30px);
                                font-size: 30px;
                                top: 0;
                                margin-top: 10px;
                                cursor: pointer;
                            }
                        `}
                    </style>
                </div>
            ),
            getBody()
        );
    }
}

export default Popup;
