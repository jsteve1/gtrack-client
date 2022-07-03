export const evalPw = (str) => {
    if(str.length === 0) return true;
    return /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%.,]).{8,100})/.test(str);
}
export const evalName = (str) => {
    if(str.length === 0) return true;
    return /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(str); 
}
export const evalBio = (str) => {
    if(str.length === 0) return true;
    if(str.length > 255) return false;
    return true;
}
export const evalEmail = (str) => {
    if(str.length === 0) return true;
    return /(.+)@(.+){2,}\.(.+){2,}/.test(str);
}

export const checkProfileFields = ({ fname, lname, email, pw, pw2, bio }) => {
    if(!evalName(fname)) {
        console.error("First name is not valid. Cannot sign up");
        return false;
    }
    if(!evalName(lname)) {
        console.error("Last name is not valid. Cannot sign up");
        return false;
    }
    if(!evalEmail(email)) {
        console.error("Email is not valid. Cannot sign up");
        return false;
    }
    if(!evalPw(pw) || pw !== pw2) {
        console.error("Password is not valid or does not match. Cannot sign up");
        return false;
    }
    if(!evalBio(bio)) {
        console.error("Biography is not valid. Cannot sign up");
        return false;
    }
    return true;
}