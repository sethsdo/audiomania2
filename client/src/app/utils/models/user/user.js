

let EmailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let PasswordReg = new RegExp("^(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
let Uppercase = new RegExp("^(?=.*[A-Z])")
let Length = new RegExp("^(((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")

export default {
    firstname: {
        value: "",
        valid: false,
        validate(val) {
            if (!val) formCheck("First Name Required!", this)
            else { 
                this.err = ""; 
                this.value = val; 
                this.valid = true; 
                return true;
            }
        },
        err: ""
    },
    lastname: {
        value: "",
        valid: false,
        validate(val) {
            if (!val) formCheck("Last Name Required!", this)
            else {
                this.err = "";
                this.value = val;
                this.valid = true;
                return true;
            }
        },
        err: ""
    },
    email: {
        vlaue: "",
        valid: false,
        validate(val) {
            if (!val) formCheck("Email Required!", this)
            if (!val.match(EmailReg)) formCheck("Invalid email address!", this)
            else {
                this.err = "";
                this.value = val;
                this.valid = true;
                return true;
            }
        },
        err: ""
    },
    password: {
        value: "",
        valid: false,
        validate(val) {
            if (!val) formCheck("Password Required!", this)
            //if (val.length < 6) formCheck("Password must be at least 8 Char.")
            if (!val.match(PasswordReg)) formCheck("Invalid Password! 8 Char, 1 Uppercase, 1 Special Char", this)
            else if (!val.match(Uppercase)) formCheck("Invalid Password! 8 Char, 1 Uppercase, 1 Special Char", this)
            else if (!val.match(Length)) formCheck("Invalid Password! 8 Char, 1 Uppercase, 1 Special Char", this)
            else {
                this.err = "";
                this.value = val;
                this.valid = true;
                return true;
            }
        },
        err: ""
    },
    passwordConfirmation:{
        value: "",
        valid: false,
        validate(val, password) {
            if (!password.valid) formCheck("Please enter a valid password", this)
            if (!val) formCheck("Password Confirmation Required!", this)
            console.log(val, password)
            if (val !== password) formCheck("Passwords don't match!", this)
            else {
                this.err = "";
                this.value = val;
                this.valid = true;
                return true;
            }
        },
        err: ""
    }

}

const formCheck = (errMsg, obj) => {
    obj.valid = false;
    obj.err = errMsg;
    return false;
}