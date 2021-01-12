import {h, Component, render } from 'preact';

export default class ErrorHelper extends Component {

    render() {
        const { errors } = this.props;

        if(!errors) {
            return false;
        }

        return(
            <div>
                {

                    errors.map(v => {
                        return <div className="validation_error">{v}</div>;
                    })
                }
            </div>
        )
    }
}