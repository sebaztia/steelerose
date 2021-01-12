import {h, Component, render } from 'preact';
import ErrorHelper from '../helpers/ErrorHelper';

export default class MultipleField extends Component {

    state = {
        newValue : []
    };

    constructor(props) {
        super(props);

        const { value } = this.props;

        this.state = {
            newValue : value.split(',')
        }
    }

    handleChange = async(e) => {

        const {checked, value} = e.target;
        let {newValue} = this.state;

        if (checked) {
            newValue.push(value);
        } else {
            const position =
                newValue.indexOf(value);
            newValue.splice(position, 1);
        }

        const {
            enableConditions,
            updateLite,
            stage,
            section,
            task
        } = this.props;

        if(enableConditions) {
           /*  const value =
                e.currentTarget.value; */

            let changes = [];
            enableConditions.forEach(condition => {

                const values =
                    condition.thisValueIs;

                if(Array.isArray(condition.target)) {
                    condition.target.forEach(t => {
                        changes.push({
                            target: t,
                            status : 'disabled'
                        });
                    });
                } else {
                    changes.push({
                        target: condition.target,
                        status: 'disabled'
                    });
                }

                values.forEach(v => {
                    if(newValue.includes(v)) {
                        if(Array.isArray(condition.target)) {
                            condition.target.forEach(t => {
                                changes.push({
                                    target: t,
                                    status: 'enabled'
                                });
                            });
                        } else {
                            changes.push({
                                target: condition.target,
                                status: 'enabled'
                            });
                        }
                    }
                });

            });

            updateLite(changes, {
                stage, section, task
            });
        }

        this.setState({newValue});
    };

    html = () => {
        let { label, options, task, errors, id, value, disabled }
            = this.props;

        let { newValue } = this.state;
        value = newValue;

        if(value.length<2) {
            value = "";
        }

        return(
            <div>
                <label id={"#probate-machine__question-label-" + id}>{label}&nbsp;</label><br />
                <div className="probate-machine__label-options">
                    <input type="hidden" name={id} value={value} />
                    { options.map(o => {
                        return(
                            <label>
                                <input
                                    data-task={task}
                                    type="checkbox"
                                    value={o}
                                    checked={value.length>0 && !!value.includes(o)}
                                    disabled={disabled}
                                    onChange={(e) => this.handleChange(e)}
                                />{o}
                                <br />
                            </label>)
                    }) }
                </div>
                <ErrorHelper errors={errors} />
            </div>
        );
    };

    render() {
        return this.html();
    }
}