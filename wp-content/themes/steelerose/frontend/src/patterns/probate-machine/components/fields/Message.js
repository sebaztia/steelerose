import {h, Component, render } from 'preact';

export default class MessageField extends Component {
    html = () => {
        const { label, id, value }
            = this.props;

        return(
            <div>
                <label for={id}>{label}</label>
                <div id={id}>{value}</div>
            </div>
        );
    };

    render() {
        return this.html();
    }
}
