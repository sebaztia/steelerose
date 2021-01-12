import {h, Component, render } from 'preact';
import Button from "../../../button/button.jsx";

export default class NextStage extends Component {

    goto = () => {
        const { current } =
            this.props;

        const next = current + 1;

        const tab =
            $('.dpl-probate-machine')
                .find('.dpl-tabs li[data-index='+next+']');

        tab.trigger('click');
        $('html, body').animate({
            scrollTop:
                (tab.offset().top - $('header').height())
        }, 500);
    };

    render() {
        return <div className="alignLeft">
            <Button
                onClick={this.goto}
                label="Next Stage"
            />
        </div>
    }
}