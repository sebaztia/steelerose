import {h, Component, render } from 'preact';
import ErrorHelper from '../helpers/ErrorHelper';

export default class SelectField extends Component {

    state = {
        newValue : false
    };

    handleChange = (e) => {

        const {
            enableConditions,
            updateLite,
            stage,
            section,
            task,
            onChange
        } = this.props;

        const value =
            e.currentTarget.value;

        if(enableConditions) {

            let changes = [];
            enableConditions.forEach(condition => {
                if (value === condition.thisValueIs) {
                    changes.push({
                        target: condition.target,
                        status: condition.updateTargetStatus,
                        value: condition.updateTargetValue
                    });
                }
            });

            updateLite(changes, {
                stage, section, task
            });

            this.setState({newValue:value});
        }

        if(onChange) {
            onChange(value);
        }
    };

    html = () => {
        let { label, options, task, errors, id, value, disabled, className }
            = this.props;

        let { newValue } = this.state;
        if(newValue) {
            value = newValue;
        }

        return(
            <div className={className ? className : false}>
                {label ?
                    <label id={"#probate-machine__question-label-" + id} for={id}>{label}</label>
                    : ''}
                    <select
                    data-task={task}
                    id={id}
                    name={id}
                    disabled={disabled}
                    onChange={this.handleChange}
                    className={className ? className : false}
                >
                    <option>Please select...</option>
                    {options.map(v => {
                        return <option
                            selected={v===value}
                            value={v}>{v}</option>
                    })}
                </select>
                <ErrorHelper errors={errors} />
            </div>
        );
    };

    render() {
        return this.html();
    }
}