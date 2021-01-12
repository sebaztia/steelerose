import {h, Component, render } from 'preact';
import ErrorHelper from "../helpers/ErrorHelper";
import SelectField from "../fields/Select";
import "react-datepicker/dist/react-datepicker.css";

const monthNames =
    ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const D = new Date();
const today = {
    day : String(D.getDate()).padStart(2,'0'),
    month : String(monthNames[D.getMonth()]),
    year : String(D.getFullYear())
};

export default class DateField extends Component {

    constructor(props) {
        super(props);

        let  { value } =
            this.props;

        if(!value) {
            this.state = {
                day : false,
                month : false,
                year : false
            };
        } else {
            value = value.split(',');

            this.state = {
                day :  Number(value[0]),
                month : String(value[1]),
                year :  Number(value[2])
            };
        }
    }


    daysInMonth = (month, year)  =>{
        const days =
            new Date(year, month, 0).getDate();

        let start = 1;
        let arr = [];
        while(start<=days) {
            arr.push(start++);
        }
        return arr;
    };

    update = (type, v) => {
        if(!v) {
            v = false;
        }
        this.setState(
            {[type] : v});
    };

    render() {
        const { label, errors, id, name, maxDate }
            = this.props;

        let { value } = this.props;

        const setting =
            this.state;

        if(setting.day && setting.month && setting.year) {
            value =
                setting.day + "," +
                setting.month + "," +
                setting.year;
        } else {
            value = '';
        }

        return(
            <div>
                <label id={"#probate-machine__question-label-" + id} for={id}>{label}</label>
                <input
                    type="hidden"
                    name={(name ? name : id)}
                    id={id}
                    value={value ? value : ''}
                />
                <div>
                    <SelectField
                        options={this.daysInMonth(
                            (monthNames.indexOf(setting.month) + 1),
                            setting.year
                        )}
                        onChange={(v) => this.update('day', v)}
                        value={setting.day}
                        className="shortwidth"
                        label="Day"
                    />
                    <SelectField
                        options={monthNames}
                        onChange={(v) => this.update('month', v)}
                        value={setting.month}
                        className="medwidth"
                        label="Month"
                    />
                    <SelectField
                        options={this.yearRange(maxDate)}
                        onChange={(v) => this.update('year', v)}
                        value={setting.year}
                        className="medwidth"
                        label="Year"
                    />
                    <div className="clearfix" />
                    <ErrorHelper errors={errors} />
                </div>
            </div>
        )
    }

    yearRange = (rules) => {

        let year =
            today.year;
        let start =
            year - 120;

        if(rules) {
            if(rules.type==='subtract') {
                if(rules.years) {
                    year =
                        parseInt(
                            D.getFullYear() - rules.years
                        )
                }
            }
        } else {
        }

        let arr = [];
        while(start <= year) {
            arr.push(start++);
        }

        return arr.reverse();
    };
}