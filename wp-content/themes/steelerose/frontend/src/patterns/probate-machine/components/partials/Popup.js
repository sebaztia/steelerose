import {h, Component, render } from 'preact';
import Modal from 'react-modal';

const modalStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        maxWidth                : '500px',
        minWidth                :'300px',
        maxHeight: '100%',
        overflow: 'scroll'
    }
};

Modal.setAppElement('#block-probate-machine-5e4575fc217f0');

export default class Popup extends Component {

    render() {
        const { title, content, respond, open } = this.props;

        return (
            <Modal
                isOpen={open}
                onAfterOpen={(respond ? (el) => respond(el, 'open') : false)}
                onRequestClose={(respond ? (el) => respond(el, 'closed') : false)}
                style={modalStyles}
                contentLabel={title}
            >
                <div>{content}</div>
            </Modal>
        );
    }
}