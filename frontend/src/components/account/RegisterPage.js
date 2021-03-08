import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../../actions/loginActions';

class RegisterPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            email:"",
            password1:"",
            password2:"",
        }
    }

    onChange = (event) => {
        let state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    onClick = (event) => {
        //check username and password length
        if(this.state.username.length<4||this.state.password1.length<8||this.state.password2.length<8){
            alert("Username must be at least 4 and password 8 characters long");
            return;
        }
        //check that passwords match
        if(this.state.password1 !== this.state.password2){
            alert("The passwords don't match")
            return;
        }
        //check that the given email is in appropriate fromat
        let emailRegEx = new RegExp("^[A-Za-z0-9]+([\.\-\_]{1}[A-Za-z0-9]+)*@{1}[A-Za-z0-9]+([\.\-]{1}[A-Za-z0-9]+)*\.{1}[A-za-z]{2,}");
        if(!emailRegEx.test(this.state.email)){
            alert("The email address must be valid")
            return;
        }
        let user = {
            username:this.state.username,
            password:this.state.password1,
            email:this.state.email
        }
        console.log("dispatch-register")
        this.props.dispatch(register(user));
        this.setState({
            username:"",
            email:"",
            password1:"",
            password2:"",
        });
    }

    render() {
        return(
            <div className="loginPage" style={{width:500,margin:"auto"}}>
                <Form>
                    <Form.Field>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" onChange={this.onChange} value={this.state.username}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="email">E-mail</label>
                        <input type="text" name="email" onChange={this.onChange} value={this.state.email}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password1">Password</label>
                        <input type="password" name="password1" onChange={this.onChange} value={this.state.password1}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password2">Password again</label>
                        <input type="password" name="password2" onChange={this.onChange} value={this.state.password2}/>
                    </Form.Field>
                    <Button onClick={this.onClick} name="register">Register</Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(connect()(RegisterPage));