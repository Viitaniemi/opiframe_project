import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

export default class Navbar extends React.Component{
    render(){
        return(
            <div>
                <Link to='/'><Button>Leaderboards</Button></Link>
                <Link to='/chart'><Button>Charts</Button></Link>
                <Link to='/account'><Button>Account</Button></Link>
            </div>
        )
    }
}