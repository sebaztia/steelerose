import {h, Component, render } from 'preact';
import Section from './Section.js';
import Accordions from "../../accordion/accordion.jsx";
import NextStage from "./partials/NextStage.js";
import VarHelper from "./helpers/VarHelper";

export default class Stage extends Component {

    render() {
        const {
            stage,
            sections,
            icon,
            title,
            titlePrefix,
            update,
            updateLite,
            updateObj,
            getObj,
            createTask,
            deleteTask,
            deleteQuestion,
            clearTask,
            status
        } = this.props;
        let $output;

        let nextStageBtn = false;
        if(status==='complete') {
            nextStageBtn =
                <NextStage current={stage} />
        }

        if(sections) {
            const accordions =
                sections.map((k, i) => {

                    /*const totalCount =
                        k.tasks.length;*/

                    let totalCount = 0;

                    let completedCount = 0;
                    k.tasks.map((k, i) => {
                        if (k.status === 'complete') {
                            completedCount++;
                        }
                        if(k.status!=='disabled') {
                            totalCount++;
                        }
                    });

                    if (k.status !== 'disabled') {
                        return {
                            status : k.status,
                            title:
                                <div className="probate-machine__section-title">
                                    <i className="probate-machine__badge">{i + 1}</i>
                                    <strong id={"probate-machine__section-title-" + k.id}>
                                        {VarHelper(k.title, "#probate-machine__section-title-" + k.id)}
                                    </strong>

                                    <div className="probate-machine__count">
                                        {(completedCount===totalCount ? 'COMPLETED' :
                                            <div>
                                            {completedCount}
                                            <div className="probate-machine__count-divider"/>
                                                {totalCount}
                                            </div>
                                            )}
                                        </div>
                                    </div>,
                            content: <Section
                                title={VarHelper(k.title, "#probate-machine__section-title-" + k.id)}
                                stage={stage}
                                section={i}
                                current={k.current}
                                update={(stage, section, task, questions, skipValidation) =>
                                    update(stage, section, task, questions, skipValidation)}
                                updateLite={(id, status) =>
                                    updateLite(id, status)}
                                updateObj={(taskId, props) =>
                                    updateObj(taskId, props)}
                                getObj={(id) =>
                                    getObj(id)}
                                createTask={(sectionId, props) =>
                                    createTask(sectionId, props)}
                                deleteTask={(taskId, value) =>
                                    deleteTask(taskId, value)}
                                deleteQuestion={(questionId) =>
                                    deleteQuestion(questionId)}
                                clearTask={(stage, section, task) =>
                                    clearTask(stage, section, task)}
                                {...k}
                            />
                        }
                    }

                    return false;
                });

            $output =
                <div className="container">
                    <div className="probate-machine__stage-title">
                        {(icon) ? <span className="probate-machine__stage-title-icon">
                            <svg className={"icon " + icon}>
                                <use xlink:href={"#" + icon} />
                            </svg>
                        </span> : ''}
                        {(titlePrefix) ? <b>{titlePrefix}&nbsp;</b> : ''}{title}
                    </div>
                    <Accordions embed={true} accordions={accordions.filter(Boolean)}/>
                    {nextStageBtn}
                </div>;

            return $output;
        }

        return false;

    }
}
