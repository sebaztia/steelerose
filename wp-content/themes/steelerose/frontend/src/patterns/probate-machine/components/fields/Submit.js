import {h, Component, render } from 'preact';

export default class SubmitField extends Component {

    state = {
        working : false
    };

    updateTaskData = async(stage, section, task) => {
        this.setState({working: true});

        const { update, skipValidation } =
            this.props;

        const form =
            document.querySelector(
                'form[data-stage="'+stage+'"][data-section="'+section+'"][data-task="'+task+'"]'
            );

        let questions  = {};
        $.each($(form).serializeArray(), function() {
            const { name, value } = this;
                questions[name] = value
        });

        const response =
            await update(stage, section, task, questions, skipValidation);

        this.setState({working: false});
    };

    handleClick = async(ev) => {
        ev.preventDefault();

        const { stage, section, task }
        = this.props;

        await this.updateTaskData(stage, section, task);
    };

    html = () => {
        let { label } = this.props;
        if(!label) {
            label = 'Submit';
        }

        return(
            <button
                className="dpl-button bg-brand1 alignright"
                type="submit"
                onClick={(ev) => this.handleClick(ev)}
            >{label}</button>
        );
    };

    render() {
        return this.html();
    }
}