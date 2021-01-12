import { changeProps } from "find-and";

export default class DataHandler {
    stages = {};

    constructor(stages) {
        this.stages =
            stages;
    }

    getData = () => {
        return this.stages;
    };

    showHiddenTasks(stage, section) {
        let { stages } = this;

        stages[stage].sections[section].tasks.map(task => {
            if(task.status==='enabled_inithide') {
                this.handleEnableCondition({
                    target : task.id,
                    updateTargetStatus : 'enabled'
                });
            }
        });
    }

    setTasksComplete() {
        let { stages } = this;

        /* STAGES */
        let stageCount = 0;
        stages.forEach(a => {
            if(a.sections) {

                /* SECTIONS */
                let s = 0;

                let sCompletedCount = 0;
                let sLength =
                    a.sections.length;

                a.sections.forEach(b => {

                    const tLength =
                        b.tasks.length;

                    let tCompletedCount = 0;

                    // Complete sections if all tasks complete
                    b.tasks.forEach(c => {
                        if(c.status==='complete' || c.status==='disabled' || c.status==='waiting') {
                            tCompletedCount++;
                        }
                    });

                    if(tLength===tCompletedCount) {
                        this.handleEnableCondition({
                            target : b.id,
                            updateTargetStatus : 'complete'
                        });

                        this.stages[stageCount]
                            .sections[s]
                            .status="complete";

                        if(b.enableConditions) {
                            b.enableConditions.forEach(condition => {
                                this.handleEnableCondition(condition);
                            });
                        }
                    }


                    if(b.tasks) {

                        /* TASKS */

                        b.tasks.forEach(c => {

                            if(c.questions) {

                                /* QUESTIONS */
                                let qLength =
                                    c.questions.length;

                                let qCompletedCount = 0;

                                // Complete tasks if all questions complete
                                c.questions.forEach(d => {
                                    if(d.questions) {
                                        qLength =
                                            qLength + d.questions.length;

                                        d.questions.forEach(e => {
                                            if(e.status==='complete' || e.status==='disabled' || e.status==='waiting') {
                                                qCompletedCount++;
                                            }
                                        });
                                    }

                                    if(d.status==='complete' || d.status==='disabled' || d.status==='waiting') {
                                        qCompletedCount++;
                                    }
                                });

                                if(qLength===qCompletedCount) {

                                    /*this.handleEnableCondition({
                                        target : b.id,
                                        updateTargetStatus : 'complete'
                                    });*/
                                    this.handleEnableCondition({
                                        target : c.id,
                                        updateTargetStatus : 'complete'
                                    });

                                    if(c.enableConditions) {
                                        c.enableConditions.forEach(condition => {
                                            this.handleEnableCondition(condition);
                                        });
                                    }

                                    // Set next current if available
                                    /*if(a.sections[s+1]) {
                                        a.sections[s+1].status = 'enabled';
                                        a.sections[s+1].current = true;
                                    }*/
                                }
                            } else {
                                if(c.enableConditions) {
                                    c.enableConditions.forEach(condition => {
                                        if(
                                            c.status===condition.thisStatusIs
                                        ) {
                                            this.handleEnableCondition(condition);
                                        }
                                    });
                                }
                            }
                        });
                    }

                    if(this.stages[stageCount].sections[s].status==="complete") {
                        sCompletedCount++;
                    }

                    s++;
                });

                if(sCompletedCount!==0 && sCompletedCount===sLength) {
                    this.stages[stageCount].status='complete';
                    this.stages[stageCount+1].status='enabled';
                }
            }

            stageCount++;
        });
    }

    handleEnableCondition(condition) {
        let change = {};

        if(condition.updateTargetValue) {
            change.value =
                condition.updateTargetValue;
        }
        if(condition.updateTargetStatus) {
            change.status =
                condition.updateTargetStatus;
        }

        this.stages = changeProps(this.stages,
            {id:condition.target},
            change
        );
    }

    updateObject(object, key, target, value) {

        if(target) {
            if (object.hasOwnProperty(key) && object[key] === target) {
                object[key] = value;
            }
        }

        for(var i=0; i<Object.keys(object).length; i++) {
            if(typeof object[Object.keys(object)[i]] == "object"){
                this.updateObject(
                    object[Object.keys(object)[i]],
                    key,
                    target,
                    value
                );
            }
        }
    }

    static splitStatusAndValues(object, output = false) {
        if(!output) {
            output = {};
        }

        for (var i = 0; i < object.length; i++) {
            for (const [key, value] of Object.entries(object[i])) {
                if (Array.isArray(value)) {
                    output = Object.assign(
                        output,
                        this.splitStatusAndValues(value, output));
                } else {
                    if(
                        typeof object[i].id === 'string'
                    ) {
                        output[object[i].id] = {
                            value: object[i].value,
                            status: object[i].status
                        };
                    }
                }

            }
        }
        return output;
    }
}