import {
    h,
    Component,
    render
} from 'preact';

export default class Button extends Component {
    render() {

        const { label, onClick } = this.props;

        return <button
            className="dpl-button"
            onClick={onClick}
           > {label}
        </button>
    }
}