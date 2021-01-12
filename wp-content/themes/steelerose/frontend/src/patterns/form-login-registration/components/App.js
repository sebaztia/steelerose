import {
    h,
    Component,
    render
} from 'preact';
import Tabs from "../../tabs/tabs.jsx";
import Login from "./Login.js";
import ForgotPassword from "./ForgotPassword.js";
import Register from "./Register.js"

export default class App extends Component {

    state = {
        view : 'login'
    };

    triggerViewChange = (view) => {
        this.setState({
            view
        }, () => {
            document.dispatchEvent(
                new CustomEvent('ui-repaint')
            );
        })
    };

    render() {

        const { view } = this.state;
        const { tabOrder } = this.props;

        console.log(Globals);

        let lContent, rContent, lTitle;
        if(view==='login') {
            lTitle = "Login";
            lContent =
                <div className="section-row">
                    <div className="container-bubble">
                        <div className="container-bubble__icon">
                            <svg className="icon icon-login-illustration">
                                <use xlink:href="#icon-login-illustration"></use>
                            </svg>
                        </div>
                        <Login
                            triggerViewChange={this.triggerViewChange}
                        />
                    </div>
                </div>
        }
        if(view==='forgot-password') {
            lTitle = "Forgot Password";
            lContent =
                <div className="section-row">
                    <div className="container-bubble">
                        <div className="container-bubble__icon">
                            <svg className="icon icon-lock">
                                <use xlink:href="#icon-lock"></use>
                            </svg>
                            <span className="name"> icon-lock</span>
                        </div>
                        <ForgotPassword
                            triggerViewChange={this.triggerViewChange}
                        />
                    </div>
                </div>
        }
        rContent =
            <div className="section-row">
                <div className="container-bubble">
                    <div className="container-bubble__icon">
                        <svg className="icon icon-checklist-signup">
                            <use xlink:href="#icon-checklist-signup"></use>
                        </svg>
                    </div>
                    <Register />
                </div>
            </div>;

        const tabs = [
            {
                icon :
                    <svg className="icon icon-edit-square" viewBox="0 0 25 25">
                        <use xlink:href="#icon-edit-square"></use>
                    </svg>,
                title : "Register",
                content : rContent
            },
            {
                icon :
                    <svg className="icon icon-login" viewBox="0 0 25 25">
                        <use xlink:href="#icon-login"></use>
                    </svg>,
                title : lTitle,
                content :lContent
            },
        ];

        if(tabOrder==='login-first') {
            tabs.reverse();
        }

        return(
            <Tabs tabs={tabs} embed={true} container="half" />
        );
    }

}