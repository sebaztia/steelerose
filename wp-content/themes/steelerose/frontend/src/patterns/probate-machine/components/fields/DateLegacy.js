import {h, Component, render } from 'preact';
import DatePicker from "react-datepicker";
import { parseISO } from 'date-fns';
import ErrorHelper from "../helpers/ErrorHelper";
import "react-datepicker/dist/react-datepicker.css";

export default class DateLegacyField extends Component {

    state = {
        maxDate: new Date(),
        selectedDate : new Date()
    };

    handleChange = date => {
        this.setState({
            selectedDate: this.parseDate(date)
        });
    };

    parseDate = date => {
        if(typeof date !== "undefined" && !date instanceof Date) {
            return parseISO(new Date(date));
        }
        return new Date(date);
    };

    componentDidMount() {

        const { maxDate : maxDateProps, value } =
            this.props;
        let { maxDate : maxDateState, selectedDate} =
            this.state;

        if(maxDateProps) {
            if (maxDateProps.hasOwnProperty('months')) {
                if(maxDateProps.hasOwnProperty('type')) {
                    if (maxDateProps.type === 'subtract') {
                        this.parseDate(
                            maxDateState.setMonth(
                            maxDateState.getMonth() - maxDateProps.months
                        ));
                    } else {
                        this.parseDate(maxDateState.setMonth(
                             maxDateState.getMonth() + maxDateProps.months
                        ));
                    }
                }
            }
        }

        if(value) {
            selectedDate =
                this.parseDate(value);
        } else {
            selectedDate =
                maxDateState;
        }

        this.setState({
            maxDate: maxDateState,
            selectedDate
        })
    }

    render() {
        const { id, label, errors } = this.props;
        let { maxDate, selectedDate } = this.state;

        return(
            <div>
                <label id={"#probate-machine__question-label-" + id} for={id}>{label}</label>
                <DatePicker
                    id={id}
                    name={id}
                    selected={selectedDate}
                    onChange={this.handleChange}
                    dateFormat="MMMM d, yyyy"
                    showYearDropdown
                    showMonthDropdown
                    maxDate={maxDate}
                />
                <ErrorHelper errors={errors} />
            </div>
        )
    }
}