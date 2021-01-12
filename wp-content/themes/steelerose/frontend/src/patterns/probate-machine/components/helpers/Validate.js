export default class Validate {

    field = false;
    value = false;
    output = [];

    constructor(field, value, rules) {
        this.field = field;
        this.value = value;

        for (let [rule, test] of Object.entries(rules)) {
            this.output.push(
                this.test(rule, test)
            );
        }

        return this.output;
    }

    test = (rule, test) => {

        let testOutput = {
            "field" : this.field,
            "valid" : true,
            rule
        };

        if(rule==='required' && !this.value) {
            if(test.test) {
                testOutput.valid =
                    false;
                testOutput.message =
                    (
                        test.message ? test.message :
                            this.field + ' is required'
                    );
            }
        }

        if(rule==='email') {
            if(!this.validateEmail(this.value)) {
                testOutput.valid =
                    false;
                testOutput.message =
                    this.field + ' is invalid';
            }
        }

        if(rule==='ninumber') {
            if(test.test) {
                if(!this.validateNI(test.test, this.value)) {
                    testOutput.valid =
                        false;
                    testOutput.message =
                        (
                            test.message ? test.message :
                                this.field + ' is required'
                        );
                }
            }
        }

        if(rule==='address') {
            if(test.test) {
                const parts = this.value.split(',');
                for(let i = 0; i<parts.length; i++) {
                    console.log(parts[i]);
                    if(!parts[i] || parts[i]==='') {
                        testOutput.valid =
                            false;
                        testOutput.message =
                            (
                                test.message ? test.message :
                                    this.field + ' is incomplete'
                            );
                    }
                }
            }
        }

        return testOutput;
    };

    validateNI(regex, value) {
        var re = /^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D]{1}$/i;
        return re.test(String(value));
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }
}