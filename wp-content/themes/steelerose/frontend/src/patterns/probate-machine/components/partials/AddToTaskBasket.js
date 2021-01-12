import {h, Component, render } from 'preact';
import Popup from "../partials/Popup.js";
import Button from "../../../button/button.jsx";
import Loader from "../helpers/Loader.js";

const endpoints = {
    get : Globals.api_url + "pmachine/task-basket/get/",
    update : Globals.api_url + "pmachine/task-basket/update/"
};

const headers = new Headers(
    {
        'content-type': 'application/json',
        'X-WP-Nonce' : Globals.rest_nonce
    });

export default class AddToTaskBasket extends Component {

    state = {
        popup : false,
        loading : false
    };

    add = async() => {

        this.setState({
            loading: true,
        }, () => {
            this.setState({
                popup : <Popup
                    title="Add to task basket"
                    content={this.popupContent()}
                    open={true}
                    respond={(el, status) =>
                        this.popupResponse(el, status)}
                />}
            )
        });

        const {
            taskSchemaId,
            updateLite,
            update,
            stage,
            section,
            task,
            price
        } = this.props;

        let fetchData = {
            method: 'post',
            credentials: 'include',
            body : JSON.stringify({
                task : taskSchemaId,
                price
            }),
            mode: 'cors',
            headers
        };

        let request =
            await fetch(
                endpoints.update,
                fetchData
            );

        let response =
            await request.json();

        await updateLite([{
            target : taskSchemaId,
            status : "waiting"
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

        return response;
    };

    popupContent = () => {

        const { loading } =
            this.state;
        const { price, taskSchemaId } =
            this.props;

        return (
            <div>
                { loading ? <Loader /> : (
                    <div>
                        <h3>Add {taskSchemaId} for {(price / 100).toFixed(2)} to your task basket?</h3>
                        <Button
                        label="Add"
                        onClick={() => this.add()}
                        /> &nbsp;
                        <Button label="Close"
                        onClick={this.closePopup}
                        />
                    </div>
                ) }
            </div>
        )
    };

    popupResponse = (el, status) => {
        console.log(el, status);
    };

    handleClick = () => {
        this.setState({
            loading : false,
            popup : <Popup
                title="Add to task basket"
                content={this.popupContent()}
                open={true}
                respond={(el, status) =>
                    this.popupResponse(el, status)}
            />});
    };

    closePopup = () => {
        this.setState({
            popup : false
        })
    };

    render() {

        const { popup } = this.state;
        const { price } = this.props;

        return(
            <div className="dpl-button smaller" onClick={this.handleClick}>
                Purchase for £{(price / 100).toFixed(2)}
                {popup}
            </div>
        );
    }
}