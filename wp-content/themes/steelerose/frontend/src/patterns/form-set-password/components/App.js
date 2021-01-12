import {
    h,
    Component,
    render
} from 'preact';
import ErrorHelper from "../../form-login-registration/helpers/ErrorHelper";

export default class App extends Component {

    state = {
        succeeded : false,
        working : false,
        username: false,
        password : false,
        cpassword : false,
        key : false,
        password_error : false,
        cpassword_error : false
    };

    setFieldVal = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name] : value
        });
    };

    submit = () => {

        const params =
            this.getParams(window.location.href);

        this.setState({
            working: true,
            username : params.user,
            key : params.key
        }, async() => {
            const {username, password, cpassword, key} =
                this.state;

            const get = await fetch(
                Globals.api_url + 'set-password', {
                    method: 'PUT',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        type: "set",
                        username,
                        password,
                        cpassword,
                        key
                    })
                }
            );

            const res = await get.json();

            let state = {
                working : false
            };

            if(res.errors) {
                const { nomatch_password, count_password } =
                    res.errors;

                let errors = [];
                if(nomatch_password) {
                    errors.push(nomatch_password);
                }
                if(count_password) {
                    errors.push(count_password);
                }

                state.password_error =
                    errors;
                this.setState(state, () => {
                    document.dispatchEvent(
                        new CustomEvent('ui-repaint')
                    );
                });
            } else {
                this.setState({
                    succeeded : res.message
                });
                const redirect =
                    await this.getSuccessRedirect();
                location.replace(redirect.value);
            }
        });

    };

    getSuccessRedirect = async() =>{
        const get = await fetch(
            Globals.api_url + 'get-redirect/account/successfulPasswordSet', {
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
        const { working, password_error, cpassword_error, succeeded } = this.state;

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
                        <label htmlFor="password">
                            New password
                        </label>
                        <input
                            onChange={this.setFieldVal}
                            type="password"
                            id="password"
                            name="password"
                        />
                        <ErrorHelper errors={password_error}/>
                    </p>
                    <p>
                        <label htmlFor="username">
                            Confirm password
                        </label>
                        <input
                            onChange={this.setFieldVal}
                            type="password"
                            id="cpassword"
                            name="cpassword"
                        />
                        <ErrorHelper errors={cpassword_error}/>
                    </p>
                    <p>
                        {submitEl}
                    </p>
                </form>;
        }
        return form
    }

    getParams = function (url) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };

}