import {
    h,
    Component,
    render
} from 'preact';

export default class Badge extends Component {
    render() {

        const { count } = this.props;

        return(
            <div className="task-basket__badge">
                <span className="task-basket__badge-wrap">
                 <svg className="icon icon-shopping-cart"><use xlink:href="#icon-shopping-cart"></use></svg>
                    {(count ? <span className="task-basket__count">{count}</span> : false)}
                </span>
            </div>
        )
    }
}