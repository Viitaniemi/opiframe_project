import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button} from 'semantic-ui-react';
import {logout} from '../actions/loginActions';

class Navbar extends React.Component{
	Login = () => {
		if (this.props.isLogged === false) {
			return (
				<Link to='/login'><Button>Log In</Button></Link>
			)
		}
		else {
			return (
				<Button name="logout" onClick={() => this.props.dispatch(logout(this.props.token))}>Log Out</Button>
			)
		}
	}
	
	CreateArticle = () => {
		if (this.props.isLogged===true){
			return <Link to='/newArticle'><Button>Create Article</Button></Link>
		}else{
			return null;
		}
	}

    render(){
        return(
            <div className="navbar">
                <Link to='/'><Button>Home</Button></Link>
                <Link to='/article/Article1'><Button>Article1</Button></Link>
                <Link to='/article/Article2'><Button>Article2</Button></Link>
                <this.CreateArticle/>
				<this.Login/>
                <hr/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        isLogged:state.isLogged,
        token:state.token
    };
}

export default connect(mapStateToProps)(Navbar);