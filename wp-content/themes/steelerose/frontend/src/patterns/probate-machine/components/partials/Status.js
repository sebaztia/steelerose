import {h, Component, render } from 'preact';

export default class Status extends Component {
    render() {
        const { type: status } = this.props;

        const blob = <i className="probate-machine__status-blob">⬤</i>;

        let out;
        if(status==='complete') {
            out = <div className="probate-machine__status-complete">{blob} COMPLETED</div>
        }
        if(status==='incomplete' || status==='enabled' || status==='processing' || status==='purchased') {
            out = <div className="probate-machine__status-progressing">{blob} IN PROGRESS</div>
        }
        if(status==='waiting') {
            out = <div className="probate-machine__status-waiting">{blob} WAITING</div>
        }

        return <div className="probate-machine__status">{out}</div>;
    }
}