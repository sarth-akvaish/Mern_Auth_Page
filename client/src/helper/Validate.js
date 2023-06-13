import { toast } from "react-hot-toast"
import { Authenticate } from "./helper";

// validate login page Username
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    if (values.username) {
        //check if user exist or not
        const { status } = await Authenticate(values.username);

        if (status !== 200) {
            errors.exist = toast.error("User doen't exist");
        }
    }
    return errors;
}


export async function passwordValidate(values) {
    const errors = passwordVerify({}, values)
    return errors;
}

// vaidate reset psasword 

export async function resetpasswordValidate(values) {
    const errors = passwordVerify({}, values)

    if (values.password !== values.confirm_pwd) {
        errors.exist = toast.error("Password not match....")
    }
    return errors;
}

// validate regsiter form

export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

// validate profile form 
export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors;
}
// ************************************************************************ 
// Validate Password 



function passwordVerify(errors = {}, values) {

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        errors.password = toast.error("Password Required...!");
    } else if (values.password.includes(" ")) {
        errors.password = toast.error("Wrong Password...!");
    } else if (values.password.length < 4) {
        errors.password = toast.error("Password must be more than 4 characters long");
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error("Password must have special character");
    }

    return errors;
}


// Validate Username 

function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required ...!')
    } else if (values.username.includes(" ")) {
        error.username = toast.error("Invalid username..!")
    }
    return error;
}


function emailVerify(error = {}, values) {

    if (!values.email) {
        error.email = toast.error("Email required");

    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email");
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = toast.error("Invalid Email Address...!");
    }
    return error;
}