const isEmpty=(string)=>{
    if(string=== "")
        return true
    else return false
};

const isEmail=(email)=>{
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)) return true
    else return false
};

exports.signUpValidate=(data)=>{
    let errors = {};
    if(isEmpty(data.email)){
        errors.email="must not be empty";
    }else if(!isEmail(data.email)){
        errors.email="must be a valid email address";
    }
    if(isEmpty(data.password)){
        errors.password="must not be empty";
    }
    if(data.password !== data.confirmPassword){
        errors.confirmPassword="Passwords must match";
    }
    if(isEmpty(data.userHandle)){
        errors.handle="must not be empty";
    }

    return{
        errors,
        isValid: Object.keys(errors).length===0 ? true : false
    }
}

exports.loginValidate=(data)=>{
    let errors={};
    if(isEmpty(data.email)){
        errors.email="must not be empty";
    }
    if(isEmpty(data.password)){
        errors.password="must not be empty";
    }

    return{
        errors,
        isValid: Object.keys(errors).length===0 ? true : false
    }
}

exports.reduceUserDetails=(data)=>{
    let userDetails={};
    if(!isEmpty(data.name.trim())) userDetails.name=data.name;
    if(!isEmpty(data.bio.trim())) userDetails.bio=data.bio;
    if(!isEmpty(data.website.trim())){
        if(data.website.trim().substring(0,4) !== 'http'){
            userDetails.website=`http://${data.website.trim()}`;
        }else userDetails.website=data.website
    }
    if(!isEmpty(data.location.trim())) userDetails.location=data.location;
    return userDetails;
}