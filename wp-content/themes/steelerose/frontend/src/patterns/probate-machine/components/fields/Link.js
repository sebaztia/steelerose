import {h, Component, render } from 'preact';

export default class LinkField extends Component {
    html = () => {
        const { label, id, value }
            = this.props;

        return(
            <div>
                <label id={"#probate-machine__question-label-" + id} for={id}>{label}</label>
                <div>
                    <a id={id} href={value} target="_blank">{value}</a>
                </div>
            </div>
        );
    };

    render() {
        return this.html();
    }
}
