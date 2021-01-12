import {h, Component, render } from 'preact';
import SubmitField from './fields/Submit.js';
import Question from './Question.js';

export default class Task extends Component {
    render() {
        const {
            stage,
            section,
            task,
            taskSchemaId,
            questions,
            status,
            update,
            updateLite,
            updateObj,
            getObj,
            createTask,
            deleteTask,
            deleteQuestion,
            clearTask
        } = this.props;

        let
            disabled = false,
            submit =
                <SubmitField section={section}
                             stage={stage}
                             task={task}
                             update={(stage, section, task, questions, skipValidation) =>
                                 update(stage, section, task, questions, skipValidation)}
                             label="Submit"
                />,
            saveProgress =
                <SubmitField section={section}
                    stage={stage}
                    task={task}
                    update={(stage, section, task, questions, skipValidation) =>
                        update(stage, section, task, questions, skipValidation)}
                    skipValidation={true}
                    label="Save progress"
                />,
            devClearTask =
                <p style="clear:right; text-align:right; text-decoration:underline"><small
                    onClick={() => clearTask(stage, section, taskSchemaId)}
                ><b>DEBUG:</b> Click to clear Task</small></p>;

        if(status==='complete') {
            disabled = true;
            submit = false;
            saveProgress = false;
        }

        if(status==='waiting') {
            submit = false;
            saveProgress = false;
        }

        let questionList = false;
        if(questions) {
            questionList =
                questions.map(k => {
                    return <Question
                        updateLite={(id, status) =>
                            updateLite(id, status)}
                        update={(stage, section, task, questions, skipValidation) =>
                            update(stage, section, task, questions, skipValidation)}
                        updateObj={(taskId, props) =>
                            updateObj(taskId, props)}
                        getObj={(id) => getObj(id)}
                        createTask={(sectionId, props) =>
                            createTask(sectionId, props)}
                        deleteTask={(taskId, value) =>
                            deleteTask(taskId, value)}
                        deleteQuestion={(questionId) =>
                            deleteQuestion(questionId)}
                        disabled={disabled}
                        section={section}
                        stage={stage}
                        task={task}
                        taskSchemaId={taskSchemaId}
                        {...k}
                    />
            });

            //if (questionList.length < 2) {
               // saveProgress = false;
                // submit = false;
            //}
        }

        if(questionList) {
            return (
                <div className={status}>
                    <div className="clearfix">
                        <form
                            autocomplete="off"
                            data-stage={stage}
                            data-section={section}
                            data-task={task}
                            className={(disabled ? 'disabled' : '')}
                        >
                            <div className="probate-machine__questions">
                                {questionList}
                                <div className="clearfix">
                                    {submit} {saveProgress} {devClearTask}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}