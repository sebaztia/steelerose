import {
    h,
    Component,
    render
} from 'preact';

export default class Tabs extends Component {

    componentDidMount() {
        document.dispatchEvent(
            new CustomEvent('ui-repaint')
        );
    }

    render() {
        const { embed, tabs, container, light, changeTab } = this.props;

        return(
            <div className={(light ? "light " : "") + "dpl-tabs"}>
                <div className="tabs__nav-wrapper">

                    <div className={(embed ? 'container ' + container : '')}>
                        <ul className="tabs__tab-wrapper">
                        {
                            tabs.map((k, i) => {
                                let className =
                                    (i===0 ? 'active first-load ' : '') + k.status;

                                return (
                                    <li
                                        data-index={i}
                                        className={className}
                                        onClick={(changeTab ? () => changeTab(i) : false)}
                                    >
                                        {(k.icon) ?
                                            <div className="tabs__tab-title">
                                            <div className="tabs__tab-icon">
                                                {k.icon}
                                            </div>
                                                <div className="tabs__tab-title-wrapper">
                                                    {k.title}
                                                </div>
                                            </div>
                                            : k.title }

                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                </div>
                <div className="tabs__main-wrapper">
                    <div className={(embed ? 'container ' + container : '')}>
                        <ul className="tabs__tab-content">
                            {
                                tabs.map((k, i) => {
                                    return (
                                        <li
                                            data-index={i}
                                            className={(i===0 ? 'active first-load' : '')}
                                        >
                                        <div className="tabs__tab-content-wrapper">
                                                {k.content}
                                            </div>
                                        </li>
                                    )
                                })

                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}