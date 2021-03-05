import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../actions/loginActions';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:""
        }
    }

    onChange = (event) => {
        let state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    onClick = (event) => {
        if(this.state.username.length<4||this.state.password.length<8){
            alert("Username must be at least 4 and password 8 characters long");
            return;
        }
        let user = {
            username:this.state.username,
            password:this.state.password
        }
        this.props.dispatch(login(user));
        
    }

    registerAccount = () => {
        this.props.history.push('/register');
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
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={this.onChange} value={this.state.password}/>
                    </Form.Field>
                    <Button onClick={this.onClick} name="login">Login</Button>
                </Form>
                <p>Don't have an account yet? Register now <a onClick={this.registerAccount}>here</a>!</p>
            </div>
        )
    }
}

export default withRouter(connect()(LoginPage));