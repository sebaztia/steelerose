import {h, Component, render } from 'preact';

export default class FieldRequiredHelper extends Component {

    render() {
        return(
            <span className="field-required">
                <small> * required</small>
            </span>
        )
    }
}