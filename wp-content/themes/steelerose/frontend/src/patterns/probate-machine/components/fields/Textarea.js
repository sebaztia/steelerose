import {h, Component, render } from 'preact';
import ErrorHelper from '../helpers/ErrorHelper';

export default class TextareaField extends Component {
    html = () => {
        const { label, errors, id, value }
            = this.props;

        return(
            <div>
                <label id={"#probate-machine__question-label-" + id} for={id}>{label}</label>
                <textarea
                    id={id}
                    name={id}
                    className={(errors ? 'error' : '')}
                >{value}</textarea>
                <ErrorHelper errors={errors} />
            </div>
        );
    };

    render() {
        return this.html();
    }
}