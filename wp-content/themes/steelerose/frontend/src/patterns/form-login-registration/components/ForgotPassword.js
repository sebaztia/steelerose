import {
    h,
    Component,
    render
} from 'preact';
import ErrorHelper from "../helpers/ErrorHelper";

export default class ForgotPassword extends Component {

    state = {
        succeeded : false,
        working : false,
        username : false,
        username_error : false
    };

    setFieldVal = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name] : value
        });
    };

    submit = async() => {
        const { username } =
            this.state;

        this.setState({
            working : true
        });

        const get = await fetch(
            Globals.api_url + 'set-password', {
                method : 'POST',
                mode : 'cors',
                cache : 'no-cache',
                credentials : 'same-origin',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    type: "reset",
                    username
                })
            }
        );

        const res = await get.json();

        let state = {
            working : false
        };

        if(res.errors) {
            const { invalid_username } =
                res.errors;

            state.username_error =
                [invalid_username];
            this.setState(state, () => {
                document.dispatchEvent(
                    new CustomEvent('ui-repaint')
                );
            });
        } else {
            this.setState({
                succeeded : res.message
            });
        }
    };

    render() {
        const { working, username_error, succeeded } = this.state;
        const { triggerViewChange } = this.props;

        let submitEl =
            <button
                onClick={() => this.submit()}
                className="dpl-button"
                type="submit">Submit</button>;

        if(working) {
            submitEl = <div className="spinner" />
        }

        let form;
        if(succeeded) {
            form =
                <p className="aligncenter">{succeeded}</p>;
        } else {
            form =
                <form method="post" action="">
                    <p>
                        <label htmlFor="username">
                            Email Address
                        </label>
                        <input
                            onChange={this.setFieldVal}
                            type="email"
                            id="username"
                            name="username"
                        />
                        <ErrorHelper errors={username_error}/>
                    </p>
                    <p>
                        {submitEl}
                        <a
                            onClick={() => triggerViewChange('login')}
                            className="alignright"
                            id="login"
                            href="#"
                        >Back to Login</a>
                    </p>
                </form>;
        }

        return form;
    }
};