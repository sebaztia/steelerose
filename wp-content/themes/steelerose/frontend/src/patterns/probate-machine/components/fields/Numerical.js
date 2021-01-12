import {h, Component, render } from 'preact';
import ErrorHelper from '../helpers/ErrorHelper';

export default class NumericalField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newValue : false
        }
    }

    validate = e => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({newValue: e.target.value})
        }
    };

    html = () => {
        const { label, errors, id }
            = this.props;
        let { value } =
            this.props;
        const { newValue } =
            this.state;

        if(!value) {
            value = newValue;
        }

        return(
            <div>
                <label id={"#probate-machine__question-label-" + id} for={id}>{label}</label>
                <input
                    type="number"
                    id={id}
                    name={id}
                    value={value}
                    className={(errors ? 'error' : '')}
                />
                <ErrorHelper errors={errors} />
            </div>
        );
    };

    render() {
        return this.html();
    }
}