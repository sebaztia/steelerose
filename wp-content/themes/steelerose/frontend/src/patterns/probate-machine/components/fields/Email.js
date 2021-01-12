import {h, Component, render } from 'preact';
import ErrorHelper from '../helpers/ErrorHelper';

export default class EmailField extends Component {
    html = () => {
        const { label, id, errors }
            = this.props;

        return(
            <div>
                <label id={"#probate-machine__question-label-" + id} for={id}>{label}</label>
                <input
                    type="email"
                    id={id}
                    name={id}
                />
                <ErrorHelper errors={errors} />
            </div>
        );
    };

    render() {
        return this.html();
    }
}