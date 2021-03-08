//ACTION CONSTANTS
export const LOADING="LOADING";
export const STOP_LOADING="STOP_LOADING";
export const REGISTER_SUCCESS="REGISTER_SUCCESS";
export const REGISTER_FAILED="REGISTER_FAILED";
export const LOGIN_SUCCESS="LOGIN_SUCCESS";
export const LOGIN_FAILED="LOGIN_FAILED";
export const LOGOUT_SUCCESS="LOGOUT_SUCCESS";
export const LOGOUT_FAILED="LOGOUT_FAILED";
export const CLEAR_LOGIN_STATE="CLEAR_LOGIN_STATE";
export const ACTIVATION_SUCCESS="ACTIVATION_SUCCESS";
export const ACTIVATION_FAILED="ACTIVATION_FAILED";

//ASYNC ACTION CREATORS
export const register = (user) => {
    return(dispatch) => {
        let request = {
            method:'POST',
            mode:'cors',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(user)
        }
        dispatch(loading());
        fetch("/user/register",request).then(response => {
            if(response.ok){
                dispatch(registerSuccess());
            }else{
                if(response.status===409){
                    dispatch(registerFailed("Username is already in use"));
                }else{
                    dispatch(registerFailed("Server responded with a status:"+response.status));
                }
            }
        }).then(error => {
            if(error){
                dispatch(registerFailed("Server responded with an error:"+error));
            }
        })
    }
}

export const login = (user) => {
    return(dispatch) => {
        let request = {
            method:'POST',
            mode:'cors',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(user)
        }
        dispatch(loading());
        fetch("/user/login",request).then(response => {
            if(response.ok){
                response.json().then(data => {
                    dispatch(loginSuccess(data.token));
                }).catch(error => {
                    dispatch(loginFailed("Failed to parse JSON. error:"+error))
                })
            }else{
                dispatch(loginFailed("Server responded with a status:"+response.status))
            }
        }).then(error => {
            if(error){
                dispatch(loginFailed("Server responded with an error:"+error));
            }
        })
    }
}


export const logout = (token) => {
    return(dispatch) => {
        let request = {
            method:'POST',
            mode:'cors',
            headers:{'Content-type':'application/json', 
            token:token},
        }
        fetch("/user/logout",request).then(response => {
            dispatch(logoutSuccess());
        }).catch(error => {
            if(error){
                dispatch(loginFailed("Server responded with an error. We logged you out anyway. Error"+error));
            }
        })
    }
}

export const activate = (activationParams) => {
    console.log("activatecode:",activationParams)
    return(dispatch) => {
        let request = {
            method:'POST',
            mode:'cors',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(activationParams)
        }
        fetch("/user/activate",request).then(response => {
            if(response.ok){
                dispatch(activationSuccess());
            }else{
                dispatch(activationFailed("Server responded with a status:"+response.status));
            }
        }).then(error => {
            if(error){
                dispatch(activationFailed("Server responded with an error:"+error));
            }
        })
    }
}

//ACTIONS
export const loading = () => {
    return {
        type:LOADING
    }
}

export const stopLoading = () => {
    return {
        type:STOP_LOADING
    }
}

export const registerSuccess = () => {
    return {
        type:REGISTER_SUCCESS
    }
}

export const registerFailed = (error) => {
    return {
        type:REGISTER_FAILED,
        error:error
    }
}

export const loginSuccess = (token) => {
    return {
        type:LOGIN_SUCCESS,
        token:token
    }
}

export const loginFailed = (error) => {
    return {
        type:LOGIN_FAILED,
        error:error
    }
}

export const logoutSuccess = () => {
    return {
        type:LOGOUT_SUCCESS
    }
}

export const logoutFailed = (error) => {
    return {
        type:LOGOUT_FAILED,
        error:error
    }
}

export const clearLoginState = () => {
    return {
        type:CLEAR_LOGIN_STATE
    }
}

export const activationSuccess = () => {
    return {
        type:ACTIVATION_SUCCESS
    }
}

export const activationFailed = (error) => {
    return {
        type:ACTIVATION_FAILED,
        error:error
    }
}