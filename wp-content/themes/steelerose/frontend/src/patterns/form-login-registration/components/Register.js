import {
    h,
    Component,
    render
} from 'preact';
import Form from "../schema/register.json";
import ErrorHelper from "../helpers/ErrorHelper";
import { v4 as uuidv4 } from 'uuid';

export default class Register extends Component {

    state = {
        working : false,
        first_name: false,
        user_email: false,
        first_name_error : false,
        user_email_error : false
    };

    submit = async(e) => {
        e.preventDefault();

        const { first_name, user_email } =
            this.state;

        if(!first_name) {
            this.setState({
                first_name_error:
                    ["Please enter your name"]
            }, () => {
                document.dispatchEvent(
                    new CustomEvent('ui-repaint')
                );
            });

            return false;
        }

        this.setState({
            working : true
        });

        const user_login =
            uuidv4();

        const get = await fetch(
            Globals.api_url + 'account/create', {
                method : 'PUT',
                mode : 'cors',
                cache : 'no-cache',
                credentials : 'same-origin',
                headers : {
                    'Content-Type' : "application/json"
                },
                body : JSON.stringify(
                    {
                        user_login, first_name, user_email
                    }
                )
            }
        );

        const res = await get.json();

        let state = {};

        if(res.errors) {
            const { first_name, user_email } =
                res.errors;

            if(user_email) {
                state.user_email_error =
                    user_email
            }

            if(first_name) {
                state.first_name_error =
                    first_name;
            }
            state.working = false;
        } else {
            const redirect =
                await this.getSuccessRedirect();
            location.replace(redirect.value);
        }

        this.setState(state, () => {
            document.dispatchEvent(
                new CustomEvent('ui-repaint')
            );
        });
    };

    setFieldVal = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name] : value
        });
    };

    getSuccessRedirect = async() =>{
        const get = await fetch(
            Globals.api_url + 'get-redirect/account/successfulRegistration', {
                method : 'GET',
                mode : 'cors',
                cache : 'no-cache',
                credentials : 'same-origin',
                headers : {
                    'Content-Type' : "application/json"
                }
            }
        );

        return await get.json();
    };

    render() {

        const { working } = this.state;


        let fields;
        if(Form) {
            fields = Form.questions
                .map((k, i) => {
                return <p>
                    <label htmlFor={k.name}>{k.label}</label>
                    <input
                        onChange={this.setFieldVal}
                        type={k.type}
                        name={k.name}
                        id={k.name} />
                    <ErrorHelper errors={this.state[k.name+'_error']} />
                </p>
            });
        }

        let submitEl =
            <div>
                <p className="text-center">
                    <small>
                        By signing up, I agree to the Steele Rose&nbsp;
                        <a href={Globals.privacy_policy_link} target="_blank">Privacy Policy</a> and&nbsp;
                        <a href={Globals.terms_and_conditions_link} target="_blank">Terms of Service</a>.
                    </small>
                </p>
                <p className="text-center">
                <button
                    onClick={(e) => this.submit(e)}
                    className="dpl-button"
                    type="submit">Start the machine</button>
                </p>
            </div>;

        if(working) {
            submitEl = <div className="spinner" />
        }

        const form =
                <form
                    method="post"
                    action=""
                >
                    {fields}
                    <p>
                        {submitEl}
                    </p>
                </form>;

        return form;
    }
};