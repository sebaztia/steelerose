import {h, Component, render } from 'preact';
import Popup from "./Popup.js";
import Button from "../../../button/button.jsx";
import Tabs from "../../../tabs/tabs.jsx";

export default class Tooltip extends Component {

    state = {
        show : false
    };

    show = () => {
        this.setState({
            show : true
        });
    };

    hide = () => {
        this.setState({
            show : false
        });
    };

    wrap = (content) => {
        return <div
            className="probate-machine__tooltip-content"
        >
            <p>{content}</p>
            <p>
                <Button label="OK"
                        onClick={this.hide}
                />
            </p>
        </div>
    };

    render() {
        const { show } =
            this.state;
        let { content } =
            this.props;

        let tabs = [];
        if(content.help) {
            tabs.push({
                title : "Help",
                content : this.wrap(content.help)
            })
        }
        if(content.gov) {
            tabs.push({
                title : "Gov' wording",
                content : this.wrap(content.gov)
            })
        }

        return (<div className="probate-machine__tooltip">
            <svg onClick={this.show} className="icon icon-question-circle">
                <use xlink:href="#icon-question-circle"></use>
            </svg>
            <Popup
                title="Hint"
                content={<Tabs tabs={tabs} />}
                open={show}
            />
        </div>);
    }
}