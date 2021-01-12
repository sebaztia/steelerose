import {
    h,
    Component,
    render
} from 'preact';
import Spinner from "../../spinner/spinner.jsx";
var React = require('react');
var HtmlToReactParser = require('html-to-react').Parser;

const headers = new Headers(
    {
        'content-type': 'application/json',
        'X-WP-Nonce' : Globals.rest_nonce
    });
const endpoints = {
    get: Globals.api_url + "stripe/payment/charges/",
    template : Globals.api_url + "twig/get-template/"
};

export default class PaymentHistory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gotData : false,
            html : <Spinner />
        }
    }

    componentDidUpdate = async() => {
        const { access } = this.props;
        const { gotData } = this.state;
        const htmlToReactParser = new HtmlToReactParser();

        if(access && !gotData) {
            let fetchData = {
                method: 'get',
                mode: 'cors',
                headers
            };

            const req =
                await fetch(endpoints.get, fetchData);

            const res =
                await req.json();

            console.log(res);

            const getCharges = {
                method: 'post',
                mode: 'cors',
                body: JSON.stringify({
                    "path": "payment-charges",
                    "filename": "payment-charges.twig",
                    "data": {charges : res}
                }),
                headers
            };

            const chargesTemplate =
                await fetch(endpoints.template, getCharges);
            const chargesHTML =
                await chargesTemplate.json();
            const chargesReact =
                htmlToReactParser.parse(chargesHTML);

            this.setState({
                gotData : true,
                html : chargesReact
            }, () => {
                document.dispatchEvent(
                    new CustomEvent('ui-repaint')
                );
            });
        }

        document.dispatchEvent(
            new CustomEvent('ui-repaint')
        );
    };

    componentDidMount = () => {
        document.dispatchEvent(
            new CustomEvent('ui-repaint')
        );
    };

    render() {
        const { html } = this.state;
        return <div><p><b>TODO: Design for charge history interface</b></p>{html}</div>;
    }
}