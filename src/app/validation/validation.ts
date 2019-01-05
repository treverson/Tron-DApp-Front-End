export class Validation {
    verifyNameInputs(name) {

        if (name == undefined || name == "" || name.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    validateEmail(email) {

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validatePassword(pass) {

        let re = /((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,30})/;
        return re.test(pass);
    }

    verifyNameRegex(name) {

        if (!/[^a-zA-Z ]/.test(name)) {
            return true;
        } else {
            return false;
        }
    }

    toCommas(value) {

        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    public dt: any;
    public month: any;

    correctDateFormat(value) {

        if (value.day < 10) {
            value.day = '0' + value.day;
        }
        if (value.month < 10) {
            value.month = '0' + value.month;
        }

        return value.year + '-' + value.month + '-' + value.day;
    }

    verifyUsername(username) {

        if (/^[A-Za-z0-9]+(?:_[A-Za-z0-9]+)*$/.test(username)) {
            return true;
        } else {
            return false;
        }
    }
}
