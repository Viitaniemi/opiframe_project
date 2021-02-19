import React from 'react';
import {Button} from 'semantic-ui-react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="login">
                <Button name="logIn" onClick={this.props.logIn}>Log In</Button>
            </div>
        )
    }
}