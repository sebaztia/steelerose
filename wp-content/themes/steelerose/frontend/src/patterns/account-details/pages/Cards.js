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
    get: Globals.api_url + "stripe/payment/methods/",
    template : Globals.api_url + "twig/get-template/"
};

export default class Cards extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gotData : false,
            html : <Spinner />
        }
    }

    componentDidMount = () => {
        document.dispatchEvent(
            new CustomEvent('ui-repaint')
        );
    };

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

            const getMethods = {
                method: 'post',
                mode: 'cors',
                body: JSON.stringify({
                    "path": "payment-methods",
                    "filename": "payment-methods.twig",
                    "data": {methods : res}
                }),
                headers
            };

            const methodsTemplate =
                await fetch(endpoints.template, getMethods);
            const methodsHTML =
                await methodsTemplate.json();
            const methodsReact =
                htmlToReactParser.parse(methodsHTML);

            this.setState({
                gotData : true,
                html : methodsReact
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

    render() {
        const { html } = this.state;
        return <div><p><b>TODO: Design for cards interface</b></p>{html}</div>;
    }
}