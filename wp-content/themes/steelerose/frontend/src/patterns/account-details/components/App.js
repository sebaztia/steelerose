import {
    h,
    Component,
    render
} from 'preact';
import Tabs from "../../tabs/tabs.jsx";
import Personal from "../pages/Personal";
import Deceased from "../pages/Deceased";
import PaymentHistory from "../pages/PaymentHistory";
import Cards from "../pages/Cards";

export default class App extends Component {

    state = {
        tabs : [
            {
                title : 'MY DETAILS',
                name : Personal,
                content : <Personal />,
                access : true
            },
            {
                title : 'DECEASED DETAILS',
                name : Deceased,
                content : <Deceased />,
                access : false
            },
            {
                title : 'MY CARDS',
                name : Cards,
                content : <Cards />,
                access : false
            },
            {
                title : 'PAYMENT HISTORY',
                name: PaymentHistory,
                content : <PaymentHistory />,
                access : false
            }
        ]
    };

    componentDidMount() {
        this.generateTabs();
    }

    generateTabs(tabs = false) {

        if(!tabs) {
            tabs = this.state.tabs;
        }

        tabs =
            tabs.map((k, v) => {
                tabs[v].content =
                    this.generateComponent(
                        k.name, k.access
                    );

                return tabs[v];
            });

        this.setState({tabs}, () => {
            document.dispatchEvent(
                new CustomEvent('ui-repaint')
            );
        });
    }

    generateComponent = (name, access) => {
        const Component =
            name;
        return <div className="container narrow">
            <Component access={access} />
        </div>;
    };

    changeTab = (tab) => {
        let { tabs } =
            this.state;

        tabs[tab].access = true;

        this.setState({tabs}, () => {
            this.generateTabs(tabs);
        });
    };

    render() {
        const { changeTab } =
            this;
        const { tabs } =
            this.state;
        return(
            <Tabs
                tabs={tabs}
                changeTab={(tab) => changeTab(tab)}
                light={true}
            />
        )
    }
}