import {h, Component, render } from 'preact';
import { v4 as uuidv4 } from 'uuid';
import Accordions from "../../accordion/accordion.jsx";
import VarHelper from "./helpers/VarHelper";
import Task from "./Task";
import Status from "./partials/Status";
import AddToTaskBasket from "./partials/AddToTaskBasket";
import CompleteTaskLink from "./partials/CompleteTaskLink";
import Tooltip from './partials/Tooltip.js';
import Stage from "./Stage";

export default class Section extends Component {

    state = {
        id : uuidv4(),
        expanded : false
    };

    componentDidMount() {
        if(this.isCurrent()) {
            this.openSection();
        }
    }

    expanded = (e, id) => {
            const el = $(e.target).parent().parent().parent().parent().parent();
            if(el.hasClass('bs-active')) {
                this.setState({
                    expanded : false
                })
            } else {
                this.setState({
                    expanded : true
                })
            }
    };

    render() {

        const { expanded } = this.state;

        const {
            stage,
            section,
            tasks,
            update,
            updateLite,
            updateObj,
            getObj,
            createTask,
            deleteTask,
            deleteQuestion,
            clearTask
        } = this.props;

        if(this.allTasksComplete()) {
            this.closeSection();
        }

        const accordions =
            tasks.map((k, i) => {
                if(k.status!=='disabled') {

                    let disableAccordion = false;
                    let helperText = false;
                    if(!k.questions /* || k.questions.length<2 */) {
                        disableAccordion = true;
                    } else {

                        //if(expanded) {
                          //  helperText = 'FILL OUT LATER';
                        //} else {
                         //   helperText = 'FILL OUT NOW';
                        //}
                        if(k.status === 'complete') {
                            helperText = 'VIEW NOW';
                        }
                    }

                    const helperWrapper = (
                        <small className="small-text"><br/>
                            {helperText}
                        </small>
                    );

                    let statusSlot =
                        <Status type={k.status} />;
                    if(k.price && (k.status!=='complete' && k.status!=='waiting' && k.status!=='purchased')) {
                        statusSlot = <div>
                            {k.price>-1 ? <p>
                                <AddToTaskBasket
                                    stage={stage}
                                    section={section}
                                    price={k.price}
                                    task={i}
                                    taskSchemaId={k.id}
                                    update={(stage, section, task, questions, skipValidation) =>
                                        update(stage, section, task, questions, skipValidation)}
                                    updateLite={(id, status) =>
                                        updateLite(id, status)}
                                />
                            </p> : false}
                            <p>
                            <CompleteTaskLink
                                stage={stage}
                                section={section}
                                price={k.price}
                                task={i}
                                taskSchemaId={k.id}
                                update={(stage, section, task, questions, skipValidation) =>
                                    update(stage, section, task, questions, skipValidation)}
                                updateLite={(id, status) =>
                                    updateLite(id, status)}
                                callback={k.callback}
                            />
                            </p>
                        </div>;

                    }

                    if(k.id) {
                        return {
                            status: k.status,
                            title:
                                <div className={k.status}>
                                    <div className="probate-machine__title-wrapper">
                                        <div
                                            onClick={(e) => this.expanded(e, '#probate-machine__task-title-' + k.id)}
                                            className="probate-machine__task-title">
                                            <strong
                                                id={"probate-machine__task-title-" + k.id}
                                            >
                                                {VarHelper(k.title, "#probate-machine__task-title-" + k.id)}
                                                {(k.tooltip ?
                                                        <Tooltip content={k.tooltip}/> :
                                                        false
                                                )}
                                            </strong>
                                            {helperWrapper}
                                        </div>
                                        <div className="probate-machine__task-status">
                                            {statusSlot}
                                        </div>
                                    </div>
                                </div>,
                            content:
                                <div className={k.status} id={k.id}>
                                    {(k.status === 'waiting' ?
                                            (<div className="cover"/>) : false
                                    )}
                                    <Task
                                        stage={stage}
                                        section={section}
                                        task={i}
                                        taskSchemaId={k.id}
                                        update={(stage, section, task, questions, skipValidation) =>
                                            update(stage, section, task, questions, skipValidation)}
                                        updateLite={(id, status) =>
                                            updateLite(id, status)}
                                        updateObj={(taskId, props) =>
                                            updateObj(taskId, props)}
                                        getObj={(id) => getObj(id)}
                                        createTask={(sectionId, props) =>
                                            createTask(sectionId, props)}
                                        deleteTask={(taskId, value) =>
                                            deleteTask(taskId, value)}
                                        deleteQuestion={(questionId) =>
                                            deleteQuestion(questionId)}
                                        clearTask={(stage, section, task) => clearTask(stage, section, task)}
                                        {...k}
                                    />
                                </div>,
                            disable: disableAccordion
                        }
                    }
                }

                return false;
            });

        return <div className="probate-machine__tasks-wrapper" id={this.state.id}>
            <Accordions embed={true} accordions={accordions.filter(Boolean)} />
        </div>;
    }

    allTasksComplete() {
        const { tasks } = this.props;
        const count = tasks.length;

        let i = 0;
        tasks.forEach(t => {
            if(t.status==='complete') {
                i++;
            }
        });

        return i === count;
    }

    isCurrent() {
        const { current } = this.props;
        return current;
    }

    openSection() {
        const { id } =
            this.state;
        const el =
            document.getElementById(id);
        const parent =
            el.querySelector('div')
                .closest(".bs-accordion-container");

        parent.style.height='auto';
    }

    closeSection() {
        /*const { id } =
            this.state;
        const el =
            document.getElementById(id);
        const parent =
            el.querySelector('div')
                .closest(".bs-accordion-container");

        parent.style.height=0; */
    }
}