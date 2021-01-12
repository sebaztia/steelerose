import {h, Component, render } from 'preact';
import Question from '../Question.js';
import Button from "../../../button/button.jsx";
import Stage from "../Stage";

export default class RepeaterField extends Component {

    state = {
        tooltip : false,
        index : 0,
        newValue : false,
        lastId : false
    };

    componentDidUpdate() {


        const repeaterQFields =
            $('.probate-machine__repeater-questions').find('input, textarea');

        let groupQuestions = {};
        if(repeaterQFields.length>0) {
            repeaterQFields.each((i, e) => {
                const split = e.name.split('__');
                if(!groupQuestions[split[2]]) {
                    groupQuestions[split[2]] = [];
                }
                groupQuestions[split[2]].push('div.probate-machine__repeater-question-' + e.name);
            });
        }

        for (var prop in groupQuestions) {
            if (Object.prototype.hasOwnProperty.call(groupQuestions, prop)) {
                const idsToWrap = groupQuestions[prop].join(', ');
                //if($(idsToWrap).parent().hasClass("probate-machine__repeater-question-wrapper")) {
                  //  $(idsToWrap).unwrap();
                    $(idsToWrap).wrapAll('<div class="probate-machine__repeater-question-wrapper" />');
                //}
            }
        }

        document.addEventListener(
            'ui-repaint', () => {
                /**
                 * Clean up the DOM
                 * I have no fucking idea why these
                 * extra elements are being created right now
                 */
                $('.probate-machine__repeater-question-wrapper').each(function() {
                    if($(this).is(':empty')) {
                        $(this).remove();
                    }
                    if($(this).parent().hasClass('probate-machine__repeater-question-wrapper')) {
                        $(this).unwrap();
                    }
                });
                $('div[class^="probate-machine__repeater-question"]')
                    .each(function() {

                        if($(this).children().first().hasClass('clearfix')) {
                            $(this).remove();
                        }
                    });
            }
        );
        document.dispatchEvent(
            new CustomEvent('ui-repaint')
        );
    };

    remove = async(e, ids) => {
        const { deleteQuestion } = this.props;

        if(e) {
            e.preventDefault();
        }

        for(let i=0; i<ids.length; i++) {
            await deleteQuestion(ids[i]);
        }
    };

    add = (e) => {
        if(e) {
            e.preventDefault();
        }

        const { id, updateObj, getObj } = this.props;

        const parent =
            getObj(id);

        if(!parent.questions) {
            parent.questions = [];
        }

        const strReplacementRegex =
            /\{{.*?\}}/g;

        const newId = '__' + Math.round(Math.random() * 10000);
        let newQ = [];
        let target;
        for(let i=0;i<parent.repeatableQuestions.length;i++) {

            newQ[i] =
                Object.assign({}, parent.repeatableQuestions[i]);
            newQ[i].id =
                id + '__' + newQ[i].id + newId;

            const strReplacementLabelMatch =
                newQ[i].label.match(strReplacementRegex);
            let label =
                newQ[i].label.slice(0);

            if(strReplacementLabelMatch) {
                for (let k = 0; k < strReplacementLabelMatch.length; k++) {
                    let string =
                        strReplacementLabelMatch[k];

                    string =
                        string.replace('{{', '');
                    string =
                        string.replace('}}', '');
                    string =
                        '{{' + id + '__' + string +  newId + '}}';

                    newQ[i].label =
                        label.replace(strReplacementLabelMatch[k], string);
                }
            }

            if (newQ[i].enableConditions) {
                for (let j = 0; j < newQ[i].enableConditions.length; j++) {

                    // If create new task
                    if(newQ[i].enableConditions[j].createTask) {
                        if(!newQ[i].enableConditions[j].createTask.target) {
                            newQ[i].enableConditions[j].createTask.target = '';
                        }

                       // if(arr.length>0) {

                            newQ[i].enableConditions[j].createTask.target =
                                newQ[i].enableConditions[j].createTask.id + '__' + parent.id + newId;


                        if(newQ[i].enableConditions[j].createTask.title.includes('__')) {
                            const split =
                                newQ[i].enableConditions[j].createTask.title.split('__');

                                const m =
                                    newQ[i].enableConditions[j].createTask.title
                                    .match(strReplacementRegex);

                            if(m) {
                                for (let k = 0; k < m.length; k++) {
                                    let string =
                                        m[k];
                                    string =
                                        string.replace('{{', '');
                                    string =
                                        string.replace('}}', '');
                                    string =
                                        '{{' +split[1]+ '}}';

                                    newQ[i].enableConditions[j].createTask.title =
                                        newQ[i].enableConditions[j].createTask.title
                                            .replace(m[k], string);
                                }}

                        }

                            if(newQ[i].enableConditions[j].createTask.title) {

                                const m =
                                    newQ[i]
                                        .enableConditions[j]
                                        .createTask
                                        .title
                                        .match(strReplacementRegex);

                                if(m) {
                                    for (let k = 0; k < m.length; k++) {
                                        let string =
                                            m[k];
                                        string =
                                            string.replace('{{', '');
                                        string =
                                            string.replace('}}', '');
                                        string =
                                            '{{' + id + '__' + string +  newId + '}}';

                                        newQ[i].enableConditions[j].createTask.title =
                                            newQ[i].enableConditions[j].createTask.title
                                            .replace(m[k], string);
                                    }
                                }


                            }
                      //  }
                    } else {
                        target =
                            parent.repeatableQuestions[i].enableConditions[j].target + newId;
                        newQ[i].enableConditions[j].target = target;
                        let arr =
                            newQ[i].enableConditions[j].target.split('__');
                        if(arr.length>0) {
                            newQ[i].enableConditions[j].target =
                                parent.id + '__' + (arr[0]===parent.id ? arr[1] : arr[0]) + '__' + arr[arr.length-1];
                        }
                    }
                }
            }
        }

        if(newQ.length>0) {
            console.log(newQ);
            parent.questions =
                parent.questions.concat(newQ);

            updateObj(id, {
                questions : parent.questions
            });
        }

        document.dispatchEvent(
            new CustomEvent('ui-repaint')
        );
    };

    reset = () => {
        const { id, updateObj } = this.props;

        updateObj(id, {questions:[]});
    };

    radioCallBack = v => {

        this.setState({
            newValue : v
        });

        if(v==='Yes') {
            this.add();
        } else {
            this.reset();
        }
    };

    radio = () => {
        let {
            stage,
            section,
            task,
            taskSchemaId,
            update,
            updateLite,
            createTask,
            deleteTask,
            deleteQuestion,
            value,
            errors,
            label,
            id,
            options
        } = this.props;


        if(!value) {
            let {newValue} = this.state;
            if (newValue) {
                value = newValue;
            }
        }

        return <div><Question
            updateLite={(id, status) =>
                updateLite(id, status)}
            update={(stage, section, task, questions, skipValidation) =>
                update(stage, section, task, questions, skipValidation)}
            createTask={(sectionId, props) =>
                createTask(sectionId, props)}
            deleteTask={(taskId, value) =>
                deleteTask(taskId, value)}
            deleteQuestion={(questionId) =>
                deleteQuestion(questionId)}
            section={section}
            stage={stage}
            task={task}
            taskSchemaId={taskSchemaId}
            value={value}
            label={label}
            errors={errors}
            id={id}
            type="Radio"
            options={options}
            callBack={(v) => this.radioCallBack(v)}
        /><div className="clearfix" /></div>
    };

    logic = () => {
        const {
            questions,
            stage,
            section,
            task,
            taskSchemaId,
            update,
            updateLite,
            createTask,
            deleteTask
        } = this.props;

            let
                idGroup = [],
                next = 0;

            return <div className="probate-machine__repeater-questions">
                {questions.map(k => {
                    if(k) {

                        const firstIdSplit =
                            questions[0].id.split('__');

                        next++;

                        let button =
                            false;

                        let nextId =
                            false,
                            nextIdSplit;

                        idGroup.push(k.id);

                        if(questions[next]) {
                            nextId =
                                questions[next].id;
                            nextIdSplit =
                                nextId.split('__');
                        }

                        const currIdSplit =
                            k.id.split('__');

                        if (!questions[next] || (currIdSplit[2] !== nextIdSplit[2])) {
                            if(currIdSplit[2]!==firstIdSplit[2]) {
                                button =
                                    idGroup.slice(0);
                            }
                            idGroup =
                                [];
                        }


                        return <div className={"probate-machine__repeater-question-" + k.id}>
                            <Question
                                updateLite={(id, status) =>
                                    updateLite(id, status)}
                                update={(stage, section, task, questions, skipValidation) =>
                                    update(stage, section, task, questions, skipValidation)}
                                createTask={(sectionId, props) =>
                                    createTask(sectionId, props)}
                                deleteTask={(taskId, value) =>
                                    deleteTask(taskId, value)}
                                section={section}
                                stage={stage}
                                task={task}
                                taskSchemaId={taskSchemaId}
                                {...k}
                            />
                            {(button) ?
                                <Button label="Remove -" onClick={(e) => this.remove(e, button)}/>
                                : false}
                            <div className="clearfix" />
                        </div>
                    }
                })}
                <div className="clearfix" />
            </div>


    };

    render() {
        const {
            radio,
            questions,
            value,
            status
        } =
            this.props;

        let { newValue } =
            this.state;

        if(value) {
            newValue = value;
        }

        let radioOut = false;
        if (radio) {
            radioOut =
                this.radio();
        }

        let output = [
            radioOut
        ];

        let questionList = false;
        if (questions) {
            questionList =
                this.logic();
        }

        if(questionList) {
            output.push(<div>
                {questionList}
            </div>);
        }

        if (questionList && newValue==='Yes' && status!=='complete') {
            output.push(
                <div className="probate-machine__repeater-add">
                    <Button label="Add +" onClick={(e) => this.add(e)}/>&nbsp;
                    { /*(repeaterQWrappers.length>1 ?
                        <Button label="Remove -" onClick={(e) => this.remove(e)}/>

                        : '') */}
                </div>
                );
        }

        return output;
    }
}