import {h, Component, render } from 'preact';
import TextField from './fields/Text.js';
import TextareaField from './fields/Textarea.js';
import EmailField from './fields/Email.js';
import DateField from './fields/Date.js';
import RadioField from './fields/Radio.js';
import ChargeableField from './fields/Chargeable.js';
import BoolField from './fields/Bool.js';
import SelectField from './fields/Select.js';
import MultipleField from './fields/Multiple.js';
import MessageField from './fields/Message.js';
import LinkField from './fields/Link.js';
import RepeaterField from './fields/Repeater.js';
import NumericalField from './fields/Numerical.js';
import AddressField from "./fields/Address.js";
import NINumberField from "./fields/NINumber.js";
import Tooltip from './partials/Tooltip.js';
import VarHelper from './helpers/VarHelper';

export default class Question extends Component {

    state = {
        tooltip : false
    };

    getField = (type, props) => {
        if(type==='Text') {
            return <TextField
                {...props}
            />
        }
        if(type==='Numerical') {
            return <NumericalField
                {...props}
            />
        }
        if(type==='Textarea') {
            return <TextareaField
                {...props}
            />
        }
        if(type==='Email') {
            return <EmailField
                {...props}
            />
        }
        if(type==='Address') {
            return <AddressField
                {...props}
            />
        }
        if(type==='Date') {
            return <DateField
                {...props}
            />
        }
        if(type==='Radio') {
            return <RadioField
                {...props}
            />
        }
        if(type==='Chargeable') {
            return <ChargeableField
                {...props}
            />
        }
        if(type==='Bool') {
            return <BoolField
                {...props}
            />
        }
        if(type==='Select') {
            return <SelectField
                {...props}
            />
        }
        if(type==='Multiple') {
            return <MultipleField
                {...props}
            />
        }
        if(type==='Message') {
            return <MessageField
                {...props}
            />
        }
        if(type==='Link') {
            return <LinkField
                {...props}
            />
        }
        if(type==='NINumber') {
            return <NINumberField
                {...props}
            />
        }
        if(type==='Repeater') {
            return <RepeaterField
                {...props}
            />
        }
    };

    render() {

        let {
            stage,
            section,
            task,
            taskSchemaId,
            label,
            name,
            type,
            options,
            errors,
            id,
            fieldFullWidth,
            enableConditions,
            update,
            tooltip,
            updateLite,
            updateObj,
            getObj,
            createTask,
            deleteTask,
            deleteQuestion,
            status,
            value,
            startDate,
            maxDate,
            price,
            radio,
            questions,
            liveQuestions,
            disabled,
            callBack,
            addAction
        } =
            this.props;

        label =
            VarHelper(label);

        {(tooltip ?
                label = (<div>{label}<Tooltip content={tooltip} /></div>) :
                false
        )}

        const field =
            this.getField(type, {
                stage,
                section,
                task,
                taskSchemaId,
                label,
                value,
                name,
                options,
                errors,
                id,
                enableConditions,
                update,
                updateLite,
                updateObj,
                getObj,
                createTask,
                deleteTask,
                deleteQuestion,
                startDate,
                maxDate,
                price,
                radio,
                questions,
                liveQuestions,
                disabled,
                callBack,
                status
            });

        if(status!=='disabled') {
            return (
                <div className={(!fieldFullWidth ? 'half ' : '') + 'probate-machine__field'}>
                    <div>
                        {field}
                    </div>
                    {addAction ? addAction : false}
                </div>
            );
        }
    }
}