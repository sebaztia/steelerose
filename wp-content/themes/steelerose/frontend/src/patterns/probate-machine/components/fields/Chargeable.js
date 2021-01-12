import {h, Component, render } from 'preact';
import ErrorHelper from "../helpers/ErrorHelper";
import Payment from "../helpers/Payment.js";
import Popup from "../partials/Popup.js";

const endpoints = {
    get : Globals.api_url + "pmachine/task-basket/get/",
    update : Globals.api_url + "pmachine/task-basket/update/"
};

const headers = new Headers(
    {
        'content-type': 'application/json',
        'X-WP-Nonce' : Globals.rest_nonce
    });

export default class ChargeableField extends Component {

    state = {
        newValue : false,
        popup : false,
        disable : false,
        purchased : false
    };

    popupResponse = async(el, status, stripe) => {
        const { updateLite, update, stage, section, task, taskSchemaId } = this.props;

        document.addEventListener('payment-accepted', async() => {
            this.setState({
                popup : false,
                purchased : true,
                newValue : "Yes"
            });

            await updateLite([{
                target : taskSchemaId,
                status : "waiting"
            }], {
                stage, section, task
            });

            const form =
                document.querySelector(
                    'form[data-stage="'+stage+'"][data-section="'+section+'"][data-task="'+task+'"]'
                );

            let questions  = {};
            $.each($(form).serializeArray(), function() {
                const { name, value } = this;
                questions[name] = value
            });

            await update(stage, section, task, questions, true);

            let fetchData = {
                method: 'post',
                credentials: 'include',
                body : JSON.stringify({
                    task : taskSchemaId
                }),
                mode: 'cors',
                headers
            };

            let request =
                await fetch(
                    endpoints.update,
                    fetchData
                );

            let response = await request.json();

            document.dispatchEvent(
                new CustomEvent('tasks-updated')
            );

            return response;
        });

        if(status==='closed') {
            this.setState({
                popup : false
            })
        }
        if(status==='open') {
            await stripe.applyStripe(el);
        }
    };

    handleChange = async(e) => {

        const {
            enableConditions,
            updateLite,
            stage,
            section,
            task,
            id,
            price
        } = this.props;

        if(enableConditions) {
            let value =
                e.currentTarget.value;

            const { purchased } = this.state; 

            if(value==='Yes') {

                this.setState({disable: true});

                const p =
                    new Payment;

                const form =
                    await p.getForm(id, price);

                this.setState({
                    disable : false,
                    popup:<Popup
                        title=""
                        content={form}
                        open={true}
                        respond={(el, status) => this.popupResponse(el, status, p)}
                    />});

            } else {

                this.setState({
                    popup : false
                });

                if(purchased) {
                    value = 'Yes';
                }

                let changes = [];
                enableConditions.forEach(condition => {
                    if (value === condition.thisValueIs) {
                        changes.push({
                            target: condition.target,
                            status: condition.updateTargetStatus,
                            value: condition.updateTargetValue
                        });
                    }
                });

                updateLite(changes, {
                    stage, section, task
                });

                this.setState({newValue: value});
            }
        }
    };

    html = () => {
        let { label, options, task, errors, id, value, disabled }
            = this.props;
        const { popup, disable } = this.state;
        if(disable) {
            disabled = true;
        }

        if(!value) {
            let {newValue} = this.state;
            if (newValue) {
                value = newValue;
            }
        }

        return (
            <div>
                <label>{label}</label><br />
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
                    {disable ? (<div><b>Loading. Please wait...</b></div>) : false}
                </div>
                <ErrorHelper errors={errors} />
                {popup}
            </div>
        )
    };

    render() {
        return this.html();
    }
}