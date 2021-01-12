import {
    h,
    Component,
    render
} from 'preact';
import Tabs from "../../tabs/tabs.jsx";
import Button from "../../button/button.jsx";
import Stage from "./Stage.js";
import Stage0 from "../schema/stage0.json";
import Stage1 from "../schema/stage1.json";
import Stage2 from "../schema/stage2.json";
import Stage3 from "../schema/stage3.json";
import Stage4 from "../schema/stage4.json";
import Stage5 from "../schema/stage5.json";
import Validate from "./helpers/Validate";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import DataHandler from "./helpers/DataHandler";
import { changeProps, removeObject, returnFound } from "find-and";

const endpoints = {
    nonce : Globals.api_url + "pmachine/form/get-nonce/",
    get : Globals.api_url + "pmachine/form/get/",
    update : Globals.api_url + "pmachine/form/update/"
};

const headers = new Headers(
    {
        'content-type': 'application/json',
        'X-WP-Nonce' : Globals.rest_nonce
    });

export default class App extends Component {

    state = {
        stages : [Stage0, Stage1, Stage2, Stage3, Stage4, Stage5],
        updated : false
    };

    componentDidMount () {

        document.dispatchEvent(
            new CustomEvent('probate-machine-rendered')
        );

        document.addEventListener('tasks-updated', async() => {
            await this.initSetData();
        });
    }

    initSetData = async() => {

        let { stages } = this.state;

        let fetchData = {
            method: 'get',
            credentials: 'include',
            mode: 'cors',
            headers
        };

        const req =
            await fetch(endpoints.get, fetchData);
        const res =
            await req.json();

        if(res.result) {
            let subQs = [],
                addTs = [];

            const strReplacementRegex =
                /\{{.*?\}}/g;

            for(const prop in res.form) {

                if(prop.includes('__') && !prop.startsWith('t')) {
                    let a =
                        prop.split('__');

                    if(!subQs[a[0]]) {
                        subQs[a[0]] = [];
                    }

                    subQs.push({
                        parent : a[0],
                        parentQId : a[1],
                        thisQId : a[2],
                        completeId : prop
                    });
                }

                const { status, value } =
                    res.form[prop];

                let replaceProps = {};
                if(status) {
                    replaceProps.status = status;
                }
                if(value) {
                    replaceProps.value = value;
                }

                stages =
                    changeProps(stages,
                        {id:prop},
                        replaceProps
                    );

                if(prop.includes('__') && prop.startsWith('t')) {
                    let a =
                        prop.split('__');

                    addTs.push({
                        parent: a[0],
                        parentQId : a[1],
                        thisTId : a[2],
                        completeId : prop
                    });
                }
            }

            if(subQs.length>0) {
                let questions = [];

                for(let i=0; i<subQs.length; i++) {

                    let origin =
                        Object.assign({},
                            returnFound(stages,
                            {id:subQs[i].parentQId}
                        ));

                    let { status, value } =
                        res.form[subQs[i].completeId];

                    origin.id =
                        subQs[i].completeId;

                    if(value) {
                        origin.value =
                            value;
                    }

                    let label =
                        origin.label.slice(0);
                    const strReplacementLabelMatch =
                        label.match(strReplacementRegex);

                    if(strReplacementLabelMatch) {
                        for (let k = 0; k < strReplacementLabelMatch.length; k++) {
                            let string =
                                strReplacementLabelMatch[k];

                            string =
                                string.replace('{{', '');
                            string =
                                string.replace('}}', '');
                            string =
                                '{{' + subQs[i].parent + '__' + string + '__' + subQs[i].thisQId + '}}';

                            origin.label =
                                label.replace(strReplacementLabelMatch[k], string);
                        }
                    }

                    if(status) {
                        origin.status =
                            status;
                    }

                    if(origin && origin.enableConditions) {

                        let enableConditions =
                            [...origin.enableConditions];

                        origin.enableConditions = [];
                        for(let j=0; j<enableConditions.length; j++) {

                            if(enableConditions[j].createTask) {
                                /*enableConditions[j].createTask.id =
                                    ; */
                                /* const splitOriginId =
                                    origin.id.split('__');

                                enableConditions[j].createTask.id =
                                    enableConditions[j].createTask.id +
                                    '__' +
                                    splitOriginId[1] + '__' +
                                    splitOriginId[2];

                                console.log(enableConditions[j]); */

                                origin.enableConditions.push(enableConditions[j]);
                            } else {
                                const {
                                    thisStatusIs,
                                    updateTargetStatus,
                                    thisValueIs
                                } =
                                    enableConditions[j];

                                origin.enableConditions.push({
                                    target: subQs[i].parent + '__' +
                                        enableConditions[j].target + '__' +
                                        subQs[i].thisQId,
                                    thisStatusIs,
                                    thisValueIs,
                                    updateTargetStatus
                                });
                            }
                        }

                    }

                    questions.push(origin);
                }

                if(questions.length>0) {

                    for(let i = 0; i<questions.length; i++) {
                        const arr = questions[i].id.split('__');
                        let parent =
                            returnFound(stages,
                                {id:arr[0]}
                            );

                        if(!parent.questions) {
                            parent.questions = [];
                        }
                        parent.questions.push(questions[i]);
                        stages =
                            changeProps(stages, {
                                id : parent.id
                            }, parent);
                    }
                }
            }

            if(addTs.length>0) {
                for(let i=0; i<addTs.length; i++) {

                    let origin =
                        Object.assign([],
                            returnFound(stages,
                                {id: addTs[i].parent}
                            ));

                    if (origin) {
                        if (Array.isArray(origin)) {
                            origin = origin[0];
                        }

                        let title =
                            origin.title.slice(0);
                        const strReplacementLabelMatch =
                            title.match(strReplacementRegex);

                        if (strReplacementLabelMatch) {

                            for (let k = 0; k < strReplacementLabelMatch.length; k++) {
                                let string =
                                    strReplacementLabelMatch[k];

                                if(string.includes('__')) {
                                    const parts =
                                        string
                                            .split('__');

                                    string =
                                        '{{' + parts[1] + '}}';
                                }

                                string =
                                    string.replace('{{', '');
                                string =
                                    string.replace('}}', '');
                                string =
                                    '{{' + subQs[i].parent + '__' + string + '__' + subQs[i].thisQId + '}}';

                                console.log('string', string);


                                origin.title =
                                    title.replace(strReplacementLabelMatch[k], string);
                            }
                        }

                        let section =
                            returnFound(stages,
                                {id: origin.section}
                            );


                        let task = {
                            id: addTs[i].completeId,
                            price: origin.price,
                            title: origin.title,
                            status: origin.status
                        };

                        const {status} =
                            res.form[addTs[i].completeId];

                        if (status) {
                            task.status = status
                        }

                        let exists =
                            returnFound(stages,
                                {id: addTs[i].completeId}
                            );

                        if (!exists && section) {
                            if (task.id) {
                                section.tasks.push(task);
                            }
                        }
                    }
                }
            }
        }


        const d =
            new DataHandler(stages);
        d.setTasksComplete();
        stages =
            d.getData();

        console.log(stages);

        this.setState(
            {stages},
            () => {
                setTimeout(() => {
                    document.dispatchEvent(
                        new CustomEvent('ui-repaint')
                    );
                    this.forceUpdate();
                }, 50)
            }
        )
    };

    componentWillMount = async() => {
        await this.initSetData();
    };

    updateLite = (
        changes, f
    ) => {
        let { stages } = this.state;

        const form =
            document.querySelector(
                'form[data-stage="'+f.stage+'"][data-section="'+f.section+'"][data-task="'+f.task+'"]'
            );

        let questions  = [];
        $.each($(form).serializeArray(), function() {
            const { name, value } = this;
            let find =
                returnFound(questions, {target:name});
            if(!find) {
                questions.push({
                    target: name,
                    value
                })
            }
        });

        changes =
            changes.concat(questions);

        changes.forEach(change => {
            const { target, value } = change;
            let { status } = change;

            let find =
                returnFound(stages, {id:target});

            if(typeof status==='undefined') {

                if(find) {
                    status =
                        find.status;
                }
            }

            let replaceProps = {};
            if(status) {
                replaceProps.status =
                    status;
            }
            if(value) {
                replaceProps.value =
                    value;
            }

            //if(!find) {
                stages =
                    changeProps(stages,
                        {id: target},
                        replaceProps
                    );
            //}

        });

        // Disable all other fields connected to a parent question change
        let i = 0;
        if(stages[f.stage].sections[f.section].tasks[f.task].questions) {
            stages[f.stage].sections[f.section].tasks[f.task].questions.forEach(q => {
                if (q.enableConditions) {
                    const status =
                        q.status;

                    q.enableConditions.forEach(c => {
                        if (c.thisStatusIs && (c.thisStatusIs === status)) {
                            stages =
                                changeProps(stages,
                                    {id: c.target},
                                    {
                                        status: c.updateTargetStatus,
                                        value: ""
                                    }
                                );

                            stages[f.stage]
                                .sections[f.section]
                                .tasks[f.task]
                                .questions[i]
                                .value =
                                "";
                            stages[f.stage]
                                .sections[f.section]
                                .tasks[f.task]
                                .questions[i]
                                .status =
                                c.updateTargetStatus;
                        }
                    });
                }
                i++;
            });
        }

        this.setState({stages}, () => {
            setTimeout(() => {
                document.dispatchEvent(
                    new CustomEvent('ui-repaint')
                );
            },50);
        });
    };

    getObj = (id) => {
        let { stages } = this.state;

        return returnFound(stages,
            {id});
    };

    updateObj = (taskId, props) => {
        let { stages } = this.state;

        stages = changeProps(stages,
            {id:taskId},
            props
        );

        this.setState({stages});

        return stages;
    };

    createTask = (sectionId, props) => {
        let { stages } = this.state;

        let section =
            returnFound(stages, {
                id : sectionId
            });

        section.tasks.push(props);
    };

    deleteTask = async(section, taskId) => {
        let { stages } =
            this.state;

        section =
           returnFound(stages, { id: section }
        );

        let replaceSection =
            removeObject(section, {id : taskId});

        section.tasks = replaceSection.tasks;

        /*stages = changeProps(stages,
            {id:section.id},
            {tasks : section.tasks}
        );

        this.setState({stages}); */

        return stages;
    };

    deleteQuestion = async(questionId) => {
        let { stages } =
            this.state;

        stages = removeObject(
            stages, {id : questionId}
            );

        this.setState({stages});
    };

    validation = (question, questions, skipValidation) => {
        let errors = false;

        if (question.type !== 'Link' && question.type !== 'Message') {

            const {id, validation} = question;
            if (question.errors) {
                delete question.errors;
            }

            if (skipValidation) {
                if(question.status !== 'disabled') {
                    question.value = questions[id];
                }
            } else {
                if (validation && question.status !== 'disabled') {
                    const vResponse =
                        new Validate(id, questions[id], validation);

                    for (let o = 0; o < vResponse.length; o++) {
                        if (!vResponse[o].valid) {
                            errors = true;
                            if (!question.errors) {
                                question.errors = [];
                            }
                            question.errors.push(
                                vResponse[o].message
                            );
                        } else {
                            question.status = 'complete';
                            question.value = questions[id];
                        }
                    }
                } else {
                    if (question.status !== 'disabled') {
                        question.value = questions[id];
                        question.status = 'complete';
                    }
                }
            }
        }

        return question;
    };

    update = async(
        stage,
        section,
        task,
        questions,
        skipValidation = false
    ) => {
        let errors = false;
        const { stages } = this.state;
        let sQuestions =
            stages[stage].sections[section].tasks[task].questions;
        let output = [],
            element;

        if(sQuestions) {

            for (let i = 0; i < sQuestions.length; i++) {

                element = this.validation(
                    sQuestions[i],
                    questions,
                    skipValidation
                );

                if(element.errors) {
                    errors = true;
                }

                output.push(
                    element
                );

                if(sQuestions[i].questions) {
                    if(!output.questions) {
                        output.questions = [];
                    }

                    for (let j = 0; j < sQuestions[i].questions.length; j++) {
                        element = this.validation(
                            sQuestions[i].questions[j],
                            questions,
                            skipValidation
                        );

                        if(element.errors) {
                            errors = true;
                        }

                        output.questions.push(
                            element
                        );
                    }
                }
            }

            stages[stage].sections[section].tasks[task].questions =
                output;
        }

        let data =
            stages;

        if(!errors) {
            data =
                new DataHandler(stages);
            if(!skipValidation) {
                data.showHiddenTasks(stage, section);
            }
            data.setTasksComplete();

            data =
                data.getData();

            this.setState({stages:data}, async() => {
                await this.saveToServer();
                await this.initSetData();
            });
        }

        if(skipValidation) {
            NotificationManager.success(
                'Task saved',
                'Success'
            );
        } else {
            if(!errors) {
                NotificationManager.success(
                    'Task processed',
                    'Success'
                );
            } else {
                NotificationManager.error(
                    'Validation errors discovered',
                    'Error'
                );
            }
        }

        this.setState(data, () => {
            setTimeout(() => {
                document.dispatchEvent(
                    new CustomEvent('ui-repaint')
                );
            },50);
        });
    };

    clearTask = (stage, section, task) => {
        let { stages } = this.state;

        let sheet;
        if(stage===0) {
            sheet = Stage1;
        }
        if(stage===1) {
            sheet = Stage2;
        }
        if(stage===2) {
            sheet = Stage3;
        }
        if(stage===4) {
            sheet = Stage4;
        }

        let replace =
            returnFound(sheet, {id:task});

        stages = changeProps(stages,
            {id:task},
            replace
        );

        this.setState({stages});
    };

    saveToServer = async() => {

        const { stages } = this.state;

        let data =
            DataHandler.splitStatusAndValues(stages);

        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            mode: 'cors',
            headers
        };

        let request =
            await fetch(
                endpoints.update,
                fetchData
            );

        let response = await request.json();

         return await response;
    };

    render() {
        const { stages } = this.state;
        let { currentStageOnly } = this.props;

        currentStageOnly =
            (currentStageOnly === "true");

        const tabs =
            stages.map((k, i) => {
                let content =
                        false;

                let icon = k.icon;
                if(k.status==='enabled' || k.status==='complete') {

                    if(
                        currentStageOnly &&
                        k.title.search('Current Stage')<0) {
                        k.titlePrefix = 'Current Stage: ';
                    }

                    content = <Stage
                        update={(stage, section, task, questions, skipValidation) =>
                            this.update(stage, section, task, questions, skipValidation)}
                        updateLite={(id, status) =>
                            this.updateLite(id, status)}
                        updateObj={(taskId, props) => this.updateObj(taskId, props)}
                        getObj={(id) => this.getObj(id)}
                        createTask={(sectionId, props) =>
                            this.createTask(sectionId, props)}
                        deleteTask={(taskId, value) =>
                            this.deleteTask(taskId, value)}
                        deleteQuestion={(questionId) =>
                            this.deleteQuestion(questionId)}
                        clearTask={(stage, section, task) => this.clearTask(stage, section, task)}
                        stage={i}
                        {...k}
                    />
                } else {
                    icon = 'icon-lock';
                }

                if(currentStageOnly) {
                    return content;
                }

                return {
                    status : k.status,
                    title :
                        <div className="probate-machine__tab-title">
                            {(icon) ?
                                <span className="probate-machine__tab-icon">
                              <svg className={"icon " + icon}>
                                <use xlink:href={"#" + icon} />
                            </svg>
                            </span> :
                                ''}
                            {k.tabTitle}
                        </div>,
                    content
                }
            });
        /* <div className="probate-machine__count">0
         <div className="probate-machine__count-divider" />{totalCount}</div> */
        return <div>
            {(currentStageOnly) ? (<div>
                {tabs[0]}
                <p className="text-center">
                    <Button
                        label="View all tasks"
                        onClick={() => window.location.href="/account/task-list"}
                    />
                </p>
            </div>) : <Tabs tabs={tabs} />}
            <NotificationContainer />
        </div>
    }
}