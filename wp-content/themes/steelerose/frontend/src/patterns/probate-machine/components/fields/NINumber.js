import {h, Component, render } from 'preact';
import ErrorHelper from "../helpers/ErrorHelper";
import TextField from "./Text";

export default class NINumberField extends Component {

    constructor(props) {
        super(props);

        let  { value } =
            this.props;

        if(!value) {
            this.state = {
                part1: {
                    valid: false,
                    value: ''
                },
                part2: {
                    valid: false,
                    value: ''
                },
                part3: {
                    valid: false,
                    value: ''
                },
                part4: {
                    valid: false,
                    value: ''
                },
                part5: {
                    valid: false,
                    value: ''
                }
            }
        } else {
            this.setState({
                part1 : {
                    value : value[0] + value[1]
                },
                part2 : {
                    value : value[2] + value[3]
                },
                part3 : {
                    value : value[4] + value[5]
                },
                part4 : {
                    value : value[6] + value[7]
                },
                part5 : {
                    value : value[8]
                }
            })
        }
    }


    componentDidUpdate(prevProps) {
        let {value} = this.props;

        if (value !== prevProps.value) {
            this.setState({
                part1 : {
                    value : value[0] + value[1]
                },
                part2 : {
                    value : value[2] + value[3]
                },
                part3 : {
                    value : value[4] + value[5]
                },
                part4 : {
                    value : value[6] + value[7]
                },
                part5 : {
                    value : value[8]
                }
            })
        }
    }

    gotoNextEmpty = () => {
        const { id } = this.props;
        const parts = this.state;

        const keys =
            Object.keys(parts);

        for(let i=0;i<keys.length;i++) {
            if(!parts[keys[i]].value) {
                document
                    .getElementById(
                        id+'-' + i
                    )
                    .focus();
                break;
            }
        }
    };

    handleUpdate  = e => {
        const { name , value } = e.target;

        let valid = false;
        if(value) {
            valid = true;
        }

        this.setState({
            [name]: {
                value,
                valid
            }
        });

        if(value.length>1) {
            this.gotoNextEmpty();
        }
    };

    html = () => {
        const { label, errors, id, name }
            = this.props;

        let { value } = this.props;

        const {
            part1, part2, part3, part4, part5
        } = this.state;

        if(
            part1.valid &&
            part2.valid &&
            part3.valid &&
            part4.valid &&
            part5.valid
        ) {
            value =
                part1.value +
                part2.value +
                part3.value +
                part4.value +
                part5.value;
        }

        return(
            <div>
                <label id={"#probate-machine__question-label-" + id} htmlFor={id}>{label}</label>
                <input
                    type="hidden"
                    id={id}
                    name={(name ? name : id)}
                    value={value ? value : ''}
                />
                <TextField
                    name='part1'
                    onKeyUp={this.handleUpdate}
                    value={part1.value ? part1.value : ''}
                    className="twochar"
                    maxLength={2}
                    id={id + '-0'}
                />

                <TextField
                    name='part2'
                    onKeyUp={this.handleUpdate}
                    value={part2.value ? part2.value : ''}
                    className="twochar"
                    maxLength={2}
                    id={id + '-1'}
                />

                <TextField
                    name='part3'
                    onKeyUp={this.handleUpdate}
                    value={part3.value ? part3.value : ''}
                    className="twochar"
                    maxLength={2}
                    id={id + '-2'}
                />

                <TextField
                    name='part4'
                    onKeyUp={this.handleUpdate}
                    value={part4.value ? part4.value : ''}
                    className="twochar"
                    maxLength={2}
                    id={id + '-3'}
                />

                <TextField
                    name='part5'
                    onKeyUp={this.handleUpdate}
                    value={part5.value ? part5.value : ''}
                    className="onechar"
                    maxLength={1}
                    id={id + '-4'}
                />
                <div className="clearfix" />

                <ErrorHelper errors={errors}/>
            </div>
        );
    };

    render() {
        return this.html();
    }
}