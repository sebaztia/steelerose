import {
    h,
    Component,
    render
} from 'preact';
import Button from "../../button/button.jsx";
import AccountField from "../../account-field/account-field.jsx"

export default class Deceased extends Component {

    render() {
        const { access } = this.props;

        if(access) {
            return <div><b>TODO (what fields in here?)</b></div>
        }
        return <div>Deceased</div>
    }
}