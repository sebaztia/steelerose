import {
    h,
    Component,
    render
} from 'preact';
import AccountField from "../../account-field/account-field.jsx"
import Spinner from "../../spinner/spinner.jsx";

const headers = new Headers(
    {
        'content-type': 'application/json',
        'X-WP-Nonce' : Globals.rest_nonce
    });
const endpoints = {
    get : Globals.api_url + 'account/read-data/',
    update : Globals.api_url + 'account/'
};

export default class Personal extends Component {

    constructor(props) {
        super(props);

        this.state =  {
            loading : true,
            fields : [
                {
                    label: "First Name",
                    value : "",
                    reference: [
                        {
                            where: "wp_meta",
                            key: "first_name"
                        }
                    ]
                },
                {
                    label: "Last Name",
                    value : "",
                    reference: [
                        {
                            where: "wp_meta",
                            key: "last_name"
                        }
                    ]
                },
                {
                    label: "Email Address",
                    value: "",
                    reference: [
                        {
                            where: "wp_user",
                            key: "user_email"
                        }
                    ]
                },
                {
                    label: "Phone Number",
                    value : "",
                    reference: [
                        {
                            where: "wp_acf",
                            key: "User/customer/phoneNumber"
                        }
                    ]
                }
            ]
        };

        setTimeout(() => {
            this.forceUpdate();
            this.setState({
                loading : false
            }, () => {
                document.dispatchEvent(
                    new CustomEvent('ui-repaint')
                );
            })
        },500);
    }

    componentDidMount = async() => {
        let { fields } = this.state;

        let newFields = [];
        Object.assign(newFields, fields);
        let getHeaders = {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({}),
            headers
        };

        await fields.map(async(k,i) => {
            if(k.reference) {
                getHeaders.body =
                    JSON.stringify(
                        {fields: k.reference}
                    );

                const req =
                    await fetch(endpoints.get, getHeaders);
                const res =
                    await req.json();

                newFields[i].value = "";
                for (const val in res) {
                    if (res.hasOwnProperty(val)) {
                        newFields[i].value += res[val] + ' ';
                    }
                }
            }
        });

        this.setState({
            fields : newFields
        }, () => {
            document.dispatchEvent(
                new CustomEvent('ui-repaint')
            );
        });
    };

    render() {
        const { fields, loading } = this.state;

        let output = <Spinner />;
        if(!loading) {
            output =
                fields.map((f, i) => {

                    return <AccountField
                        label={fields[i].label}
                        value={fields[i].value}
                        reference={fields[i].reference[0]}
                    />
                });
        }

        return (output);
    }
}