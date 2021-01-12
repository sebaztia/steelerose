import {h, Component, render } from 'preact';

export default class ErrorHelper extends Component {

    render() {
        const { errors } = this.props;

        if(!errors) {
            return false;
        }

        return(
            <div className="error-helper">
                <ul>
                    {

                        errors.map(v => {
                            return <li><span className="error-value">{v}</span></li>;
                        })
                    }
                </ul>
            </div>
        )
    }
}