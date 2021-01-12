import {
    h,
    Component,
    render
} from 'preact';
import Basket from './Basket';
import Badge from './Badge';
import Modal from 'react-modal';

const modalStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        maxWidth                : '500px',
        minWidth                : '320px'
    }
};

// Modal.setAppElement('#task-basket__wrapper');

const endpoints = {
    get : Globals.api_url + "pmachine/task-basket/get/",
    customer : Globals.api_url + ""
};

const headers = new Headers(
    {
        'content-type': 'application/json',
        'X-WP-Nonce' : Globals.rest_nonce
    });

export default class App extends Component {

    state = {
        open : false,
        content : <div className="spinner" />,
        count : 0,
        paymentActive : false
    };

    close() {
        this.setState({open:false});
        this.setState({paymentActive : false})
    }

    pay() {
        this.setState({paymentActive : true})
    }

    componentWillMount = async() => {
        let count;
        document.addEventListener('tasks-updated', async() => {
            const fetch = await this.fetch();
            count = fetch.length;

            if(count>0) {
                this.setState({count})
            }
        });

        document.dispatchEvent(
            new CustomEvent('tasks-updated')
        );
    };

    fetch = async() => {
        let fetchData = {
            method: 'get',
            credentials: 'include',
            mode: 'cors',
            headers
        };

        const req =
            await fetch(endpoints.get + 'waiting', fetchData);
        return await req.json();
    };

    handleClick = async(e) => {

        const { count } = this.state;

        e.preventDefault();

        if(count===0) {
            return false;
        }

        const { paymentActive } = this.state;

        this.setState({open:true});

        const res = await this.fetch();

        this.setState({
            content:
                <Basket tasks={res}
                        close={() => this.close()}
                        paymentActive={paymentActive}
                />
        });

    };

    render() {

        const { open, content, count } = this.state;

        return (
            <div>
            <a
                className="menu-item"
                href=""
                onClick={(e) => this.handleClick(e)}
            >
                Task Basket <Badge count={count} />
            </a>
                <Modal
                    isOpen={open}
                    style={modalStyles}
                    contentLabel="Task Basket"
                >
                    {content}
                </Modal>
            </div>
        );
    }
}