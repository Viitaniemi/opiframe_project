import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

export default class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

  logIn = () => {
    if (this.props.loggedIn === false) {
      return (
        <Link to='/login'><Button>Log In</Button></Link>
      )
    }
    else {
      return (
        <Button name="logOut" onClick={this.props.logOut}>Log Out</Button>
      )
    }
  }

    render(){
        return(
            <div className="navbar">
                <Link to='/'><Button>Home</Button></Link>
                <Link to='/article/Article1'><Button>Article1</Button></Link>
                <Link to='/article/Article2'><Button>Article2</Button></Link>
                <this.logIn/>
                <hr/>
            </div>
        )
    }
}