import {h, Component, render } from 'preact';
import ErrorHelper from '../helpers/ErrorHelper';

export default class TextField extends Component {
    html = () => {
        const { label, errors, id, value, name, className, onKeyUp, maxLength }
            = this.props;

        return(
            <div className={className ? className : false}>
                {label ?
                    <label id={"#probate-machine__question-label-" + id} for={id}>{label}</label>
                    : ''}
                <input
                    type="text"
                    id={id}
                    name={(name ? name : id)}
                    value={value}
                    className={className + (errors ? ' error' : '')}
                    onKeyUp={onKeyUp ? onKeyUp : false}
                    maxLength={maxLength ? maxLength : 9999}
                />
                <ErrorHelper errors={errors} />
            </div>
        );
    };

    render() {
        return this.html();
    }
}