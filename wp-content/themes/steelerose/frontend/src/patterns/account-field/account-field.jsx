import {
    h,
    Component,
    render
} from 'preact';
import Spinner from "../spinner/spinner.jsx";
import FormFieldError from "../form-field-error/FormFieldError.jsx";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const endpoints = {
    update : Globals.api_url + 'account/update-data'
};

const headers = new Headers(
    {
        'content-type': 'application/json',
        'X-WP-Nonce' : Globals.rest_nonce
    });
let getHeaders = {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({}),
    headers
};

export default class AccountField extends Component {

    state = {
        edit : false,
        newValue : false,
        saving : false,
        error : false
    };

    enableEdit = () => {
        this.setState({
            edit : true
        });
    };

    disableEdit = () => {
        this.setState({
            edit : false,
            error: false
        })
    };

    updateValue = e => {
        this.setState({
            newValue : e.target.value
        })
    };

    save = async() => {
        const { where, key } = this.props.reference;
        const { newValue: value} =
            this.state;

        this.setState({
            saving : true,
            error : false
        });

        getHeaders.body = JSON.stringify({
            where, key, value
        });

        const req =
            await fetch(endpoints.update, getHeaders);
        const res =
            await req.json();

        if(res.error) {
            NotificationManager.error(
                'Validation errors discovered',
                'Error'
            );
            this.setState({
                error : res.error
            });
        } else {
            NotificationManager.success(
                'Successfully saved',
                'Success'
            );
            this.setState({
                error : false,
                edit: false
            });
        }

        this.setState({
            saving : false
        });

    };

    render() {
        const { label, value } =
            this.props;
        const { edit, saving, error } =
            this.state;

        let { newValue } = this.state;
        if(!newValue) {
            newValue = value;
        }

        return(
            <div>
                <div className="section-row half section-border">
                    <div className="dpl-account-field">
                        <h3>{label.toUpperCase()}</h3>
                        {(!edit ?
                                <div>
                                    {newValue}
                                    <a
                                        onClick={() => this.enableEdit()}
                                        className="account-field__edit" href="#">
                                        <span className="underline">EDIT</span>&nbsp;&nbsp;<svg className="icon icon-edit-square">
                                        <use xlink:href="#icon-edit-square"></use>
                                    </svg>
                                    </a>
                                </div> :
                                <div>
                                    <input
                                        className="account-field__input"
                                        type="text"
                                        value={newValue}
                                        onKeyUp={(e) => this.updateValue(e)}
                                    />
                                    {(saving ? <Spinner /> :
                                            <a className="account-field__save"
                                               onClick={() => this.save()} href="#">
                                                SAVE
                                            </a>
                                    )}

                                    <a
                                        onClick={() => this.disableEdit()}
                                        className="account-field__edit" href="#">
                                        <span className="underline">CANCEL</span>&nbsp;&nbsp;X
                                    </a>
                                </div>
                        )}
                    </div>
                    {(error ? <FormFieldError errors={[error]} /> : false)}
                </div>
                <NotificationContainer />

            </div>
        );
    }
}