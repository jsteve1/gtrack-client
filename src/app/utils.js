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