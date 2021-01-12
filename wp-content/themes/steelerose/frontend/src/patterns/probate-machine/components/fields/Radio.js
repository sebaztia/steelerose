import {h, Component, render } from 'preact';
import ErrorHelper from "../helpers/ErrorHelper";

export default class RadioField extends Component {

    state = {
        newValue : false
    };

    componentDidMount() {
        const {
            value,
            status
        } = this.props;

        if(status!=='complete') {
            this.updateApp(value);
        }
    }

    updateApp = async(value) => {
        const {
            enableConditions,
            updateLite,
            stage,
            section,
            task,
            callBack,
            createTask,
            deleteTask
        } = this.props;

        if(enableConditions) {

            let changes = [];
            enableConditions.forEach(condition => {

                if(!condition.createTask) {

                    if (value === condition.thisValueIs) {

                        if (Array.isArray(condition.target)) {
                            condition.target.forEach(t => {
                                changes.push({
                                    target: t,
                                    status: condition.updateTargetStatus,
                                    value: condition.updateTargetValue
                                });
                            });
                        } else {
                            changes.push({
                                target: condition.target,
                                status: condition.updateTargetStatus,
                                value: condition.updateTargetValue
                            });
                        }
                    }
                } else {
                    if(value===condition.createTask.deleteIfValueIs) {
                        deleteTask(condition.createTask.section, condition.createTask.target);
                    }
                    if(value===condition.createTask.createIfValueIs) {
                        createTask(condition.createTask.section, {
                            id: condition.createTask.target,
                            title: condition.createTask.title,
                            status: condition.createTask.status,
                            price: condition.createTask.price
                        })
                    }
                }
            });

            updateLite(changes, {
                stage, section, task
            });

        }

        this.setState({newValue: value});

        if(callBack) {
            callBack(value);
        }
    };

    handleChange = (e) => {


        let value =
            e.currentTarget.value;

        this.updateApp(value);

    };

    html = () => {
        let { label, options, task, errors, id, value, disabled }
            = this.props;

        let {newValue} = this.state;

        if(!value || value!==newValue) {
            if (newValue) {
                value = newValue;
            }
        }

        return (
            <div>
                <label id={"#probate-machine__question-label-" + id}>{label}</label><br />
                <div className="probate-machine__label-options">
                { options.map(o => {
                    return(
                            <label>
                                <input
                                    data-task={task}
                                    type="radio"
                                    name={id}
                                    value={o}
                                    checked={o===value}
                                    disabled={disabled}
                                    onChange={this.handleChange}
                                />{o}
                            </label>)
                }) }
                </div>
                <ErrorHelper errors={errors} />
            </div>
        )
    };

    render() {
        return this.html();
    }
}