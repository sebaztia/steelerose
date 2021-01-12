import {h, Component, render } from 'preact';
import ErrorHelper from '../helpers/ErrorHelper';
import FieldRequiredHelper from '../helpers/FieldRequired';
import TextField from '../fields/Text.js';

export default class AddressField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            add1 : {
                valid : false,
                value : ''
            },
            add2 : {
                valid : true,
                value : ''
            },
            city : {
                valid : false,
                value : ''
            },
            county : {
                valid : false,
                value : ''
            },
            postcode : {
                valid : false,
                value : ''
            }
        }

    }

    applyData() {
        let { value } =
            this.props;

        if(value) {
            value = value.split(',');
        }

        this.setState({
            add1 : { value :
                    ( value[0] ? value[0] : '' ),
                valid : !!value[0]
            },
            add2 : { value :
                    ( value[1] ? value[1] : '' ),
                valid : true
            },
            city : { value :
                    ( value[2] ? value[2] : '' ),
                valid : !!value[2]
            },
            county : { value :
                    ( value[3] ? value[3] : '' ),
                valid : !!value[3]
            },
            postcode : { value :
                    ( value[4] ? value[4] : '' ),
                valid : !!value[4]
            }
        });
    }

    componentDidMount() {
        this.applyData();
    }

    componentDidUpdate(prevProps)  {
        let { value } = this.props;

        if(value!==prevProps.value) {
            console.log(value, prevProps.value);
            this.applyData();
        }
    }

    handleUpdate  = e => {
        let { name , value } = e.target;

        let valid = false;
        if(value) {
            valid = true;
        }

        this.setState({
            [name]: {
                value,
                valid
            }}, () => {
        });
    };

    html = () => {
        const { label, errors, id, name }
            = this.props;

        let { value } =
            this.props;

        const {
            add1, add2, city, county, postcode
        } = this.state;

        value =
            add1.value + ',' +
            add2.value + ',' +
            city.value + ',' +
            county.value + ',' +
            postcode.value;

        return(
            <div>
                <label id={"#probate-machine__question-label-" + id} for={id}>{label}</label>
                <input
                    type="hidden"
                    name={(name ? name : id)}
                    id={id}
                    value={value ? value : ''}
                />
                <p>
                    <label>Address line 1
                        {!add1.valid || !add1.value ?
                            <FieldRequiredHelper /> : false
                        }
                    </label>
                    <TextField
                        name='add1'
                        onKeyUp={this.handleUpdate}
                        value={add1.value ? add1.value : ''}
                    />
                </p>
                <p>
                    <label>Address line 2
                        {!add2.valid || !add2.value ?
                            <FieldRequiredHelper /> : false
                        }
                    </label>
                    <TextField
                        name='add2'
                        onKeyUp={this.handleUpdate}
                        value={add2.value ? add2.value : ''}
                    />
                </p>
                <p>
                    <label>City
                        {!city.valid || !city.value ?
                            <FieldRequiredHelper /> : false
                        }
                    </label>
                    <TextField
                        name='city'
                        onKeyUp={this.handleUpdate}
                        value={city.value ? city.value : ''}
                    />
                </p>
                <p>
                    <label>County
                        {!county.valid || !county.value ?
                            <FieldRequiredHelper /> : false
                        }
                    </label>
                    <TextField
                        name='county'
                        onKeyUp={this.handleUpdate}
                        value={county.value ? county.value : ''}
                    />
                </p>
                <p>
                    <label>
                        Postcode
                        {!postcode.valid || !postcode.value ?
                            <FieldRequiredHelper /> : false
                        }
                    </label>
                    <TextField
                        name='postcode'
                        onKeyUp={this.handleUpdate}
                        value={postcode.value ? postcode.value : ''}
                    />
                </p>
                <ErrorHelper errors={errors} />
            </div>
        );
    };

    render() {
        return this.html();
    }
}