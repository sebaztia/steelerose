import {h, Component, render } from 'preact';
import ErrorHelper from "../helpers/ErrorHelper";

export default class BoolField extends Component {


    handleChange = (e) => {

        const { enableConditions, updateLite, stage, section, task } = this.props;

        if(enableConditions) {
            const value =
                e.currentTarget.checked;

            let changes = [];
            enableConditions.forEach(condition => {
                if (value===condition.thisValueIs
                ) {
                    changes.push({
                        target : condition.target,
                        status : condition.updateTargetStatus,
                        value : condition.updateTargetValue
                    });
                }
            });

            updateLite(changes, {
                stage, section, task
            });
        }
    };

    html = () => {
        const { label, task, errors, id, value }
            = this.props;

        return(
            <div>
                <label for={id}>
                    <input
                        data-task={task}
                        type="checkbox"
                        id={id}
                        name={id}
                        value={value}
                        onChange={this.handleChange}
                    />
                    <span id={"#probate-machine__question-label-" + id}>{label}</span>
                </label>
                <ErrorHelper errors={errors} />
            </div>
        );
    };

    render() {
        return this.html();
    }
}