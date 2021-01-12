import {
    h,
    Component,
    render
} from 'preact';
import ErrorHelper from "../helpers/ErrorHelper.js";

export default class Login extends Component {

    state = {
        redirecting : false,
        working : false,
        user_login : false,
        user_password : false,
        user_login_error : false,
        user_password_error : false
    };

    componentDidMount() {
        setTimeout(() => {
            let user_login =
                document
                .getElementById('user_login')
                .value;
            let user_password =
                document
                .getElementById('user_password')
                .value;

            this.setState({
                user_login, user_password
            })
        },600);
    }

    submit = async(e) => {
        e.preventDefault();

        const { user_login, user_password } =
            this.state;

        let errors = false;

        this.setState({
            working : true
        });

        const get = await fetch(
            Globals.api_url + 'login', {
                method : 'POST',
                mode : 'cors',
                cache : 'no-cache',
                credentials : 'same-origin',
                headers : {
                    'Content-Type' : "application/json"
                },
                body: JSON.stringify(
                    {
                        credentials : {
                            user_login, user_password
                        }
                    }
                )
            }
        );

        const res = await get.json();
        let state = {};

        if(
            res.code==='invalid_username' ||
            res.code==='invalid_email' ||
            res.code==='empty_username'
        )
        {
            errors = true;
            state.user_login_error =
                [res.message];
        }

        if(
            res.code==='incorrect_password' ||
            res.code==='empty_password'
        ) {
            errors = true;
            state.user_password_error =
                [res.message];
        }

        if(!errors) {
            this.setState({
                redirecting : true
            });
            const redirect =
                await this.getSuccessRedirect();
            location.replace(redirect.value);
        } else {
            state.working = false;
            this.setState(state, () => {
                document.dispatchEvent(
                    new CustomEvent('ui-repaint')
                );
            });
        }
    };

    setFieldVal = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name] : value
        });
    };

    getSuccessRedirect = async() =>{
        const get = await fetch(
            Globals.api_url + 'get-redirect/account/successfulLogin', {
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

        const {
            working,
            user_login_error,
            user_password_error,
            redirecting
        } = this.state;
        const { triggerViewChange } = this.props;

        let submitEl =
            <button
                onClick={(e) => this.submit(e)}
                className="dpl-button"
                type="submit">Login</button>;

        if(working) {
            submitEl = <div className="spinner" />
        }

        let form;
        if(redirecting) {
            form =
                <p className="aligncenter">Please wait...</p>;
        } else {
            form =
                <form id="login-form" method="post" action="">
                    <p>
                        <label htmlFor="user_login">
                            Email Address
                        </label>
                        <input
                            onChange={this.setFieldVal}
                            type="email"
                            id="user_login"
                            name="user_login"
                        />
                        <ErrorHelper errors={user_login_error} />
                    </p>
                    <p>
                        <label htmlFor="user_password">
                            Password
                        </label>
                        <input
                            onChange={this.setFieldVal}
                            type="password"
                            id="user_password"
                            name="user_password"
                        />
                        <ErrorHelper errors={user_password_error} />
                    </p>
                    <p>
                        {submitEl}
                        <a
                            onClick={() => triggerViewChange('forgot-password')}
                            className="alignright"
                            id="forgot-password"
                            href="#"
                        >Forgot Password</a>
                    </p>
                </form>
            ;
        }

        return form;

    }
};