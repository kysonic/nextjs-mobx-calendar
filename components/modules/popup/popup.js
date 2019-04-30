import React from 'react';
import ReactDOM from 'react-dom';

class Popup extends React.Component {
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
        return ReactDOM.createPortal(
            (
                <div className={`popup ${this.state.opened ? 'is-opened' : ''}`}>
                    <div className="close" onClick={this.close}>x</div>
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
            document.body
        );
    }
};

export default Popup;
