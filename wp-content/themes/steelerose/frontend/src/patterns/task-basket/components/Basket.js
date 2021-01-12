import {
    h,
    Component,
    render
} from 'preact';


import Payment from "../helpers/Payment.js";
import Loader from "../helpers/Loader.js";

const headers = new Headers(
    {
        'content-type': 'application/json',
        'X-WP-Nonce' : Globals.rest_nonce
    });

const endpoints = {
    updateBasket : Globals.api_url + "pmachine/task-basket/update",
    updateForm : Globals.api_url + "pmachine/form/update-key-value"
};

export default class Basket extends Component {

    state = {
        loading : false,
        paymentActive : false,
        view : false
    };

    componentDidMount() {

        this.tasksHtml();

        document.addEventListener(
            'payment-accepted',
            async() => {
            this.paymentComplete();
        });
    }

    paymentComplete = async() => {
        const { close, tasks } = this.props;

        await tasks.forEach(async(task) => {

            const status =
                'purchased';

            /**
             * Update basket
             */
            let fetchData = {
                method: 'post',
                mode: 'cors',
                body : JSON.stringify({
                    task : task.task,
                    status
                }),
                headers
            };

            let req =
                await fetch(endpoints.updateBasket, fetchData);

            let res =
                await req.json();

            /**
             * Update form
             */
            fetchData = {
                method: 'post',
                mode: 'cors',
                body : JSON.stringify([{
                    id : task.task,
                    status
                }]),
                headers
            };

            req =
                await fetch(endpoints.updateForm, fetchData);

            res = await req.json();

            document.dispatchEvent(
                new CustomEvent('tasks-updated')
            );

            close();
        });
    };

    pay = () => {
        this.setState({paymentActive: true}, async() => {
            await this.paymentHtml();
        });
    };

    paymentHtml = async () => {

        const { tasks, close } = this.props;

        this.setState({loading: true});

        let header = (<h3>Payment for tasks</h3>);
        let closeButton =
            <p className="alignright">
                <br />
                <button
                    onClick={() => close()}
                    className="dpl-button small">Close</button>
            </p>;


        this.setState({
            view : <div>
                {header}
                <Payment tasks={tasks} />
                {closeButton}
            </div>,
            loading : false
        }, async() => {

        });
    };

    tasksHtml = () => {
        const { tasks, close } = this.props;
        const { pay } = this;

        let header = (<h3>Tasks in basket</h3>);
        let tHead =
            <div className="task-basket__row">
                <div className="task-basket__task">Task</div>
                <div className="task-basket__amount">Amount</div>
                <div className="task-basket__status">Status</div>
            </div>;
        let tRows =
            tasks.map((v, i) => {
                return (
                    <div className="task-basket__row">
                        <div className="task-basket__task">{v.task}</div>
                        <div className="task-basket__amount">{(v.price / 100).toFixed(2)}</div>
                        <div className=" task-basket__status"><span className={v.status}>{v.status}</span></div>
                    </div>
                )
            });
        let closeButton =
            <p className="alignright">
                <br />
                <button
                    onClick={() => pay()}
                    className="dpl-button small">Pay</button>&nbsp;
                <button
                    onClick={() => close()}
                    className="dpl-button small">Close</button>
            </p>;

        this.setState({
            view : (<div>
            {header}
            {tHead}
            {tRows}
            {closeButton}
        </div>),
            loading : false
        });
    };


    render() {
        const { loading, view } = this.state;

        if(loading) {
            return <Loader />
        } else {
            return (view);
        }

    }
}