import {
    h,
    Component,
    render
} from 'preact';

export default class Accordions extends Component {
    render() {
        const { embed, accordions } = this.props;

        let html = accordions.map((k, i) => {
            let contents = (
                <div className={(k.disable ? "disabled bs-active " : "") + "bs-accordion content-accordion left-align " + k.status}>
                    <a href="#" className="bs-accordion-heading">
                        {k.title}
                    </a>
                    <div className="bs-accordion-container">
                        <div className="bs-accordion-content accordion__content">
                            {k.content}
                        </div>
                    </div>
                </div>
            );

            return contents;
        });

        if(!embed) {
            html =
                    <div className="container">
                        {html}
                    </div>;
        }

        return <div className="dpl-accordion">{html}</div>;
    }
}