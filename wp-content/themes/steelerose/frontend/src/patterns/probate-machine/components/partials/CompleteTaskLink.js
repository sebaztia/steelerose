import {h, Component, render } from 'preact';
import Popup from "../partials/Popup.js";
import Button from "../../../button/button.jsx";

const headers = new Headers(
    {
        'content-type': 'application/json',
        'X-WP-Nonce' : Globals.rest_nonce
    });

export default class CompleteTaskLink extends Component {

    state = {
        popup : false,
        loading : false
    };

    confirm = async () => {

        const { taskSchemaId, updateLite, update, stage, section, task, callback } = this.props;

        if(callback) {
            let fetchData = {
                method: callback.method,
                credentials: 'include',
                mode: 'cors',
                headers
            };
            const req =
                await fetch(Globals.api_url + callback.endpoint, fetchData);
            const res =
                await req.text();

            window.open(res.replace('"', ''), '_blank');
        }

        await updateLite([{
            target : taskSchemaId,
            status : "complete"
        }], {
            stage, section, task
        });


        await update(stage, section, task, [], true);


        document.dispatchEvent(
            new CustomEvent('tasks-updated')
        );

        this.setState({
            loading : false,
            popup : false
        });
    };

    popupContent = () => {
        const { taskSchemaId : task } = this.props;

        return (
            <div>
                <h3>Confirm complete task {task}?</h3>
                <Button
                    label="Confirm"
                    onClick={() => this.confirm()}
                /> &nbsp;
                <Button label="Close"
                        onClick={this.closePopup}
                />
            </div>
        )
    };

    popupResponse = (el, status) => {
        console.log(el, status);
    };

    handleClick = () => {

        this.setState({
            loading: true,
        }, () => {
            this.setState({
                loading: false,
                popup : <Popup
                    title="Confirm complete task"
                    content={this.popupContent()}
                    open={true}
                    respond={(el, status) =>
                        this.popupResponse(el, status)}
                />}
            )
        });
    };

    closePopup = () => {
        this.setState({
            popup : false
        })
    };

    render() {
        const { popup } = this.state;

        return(
            <div className="probate-machine__complete-task" onClick={this.handleClick}>
                <small>Or <a className="color-brand1">complete task</a></small>
                {popup}
            </div>
        )
    }
}
