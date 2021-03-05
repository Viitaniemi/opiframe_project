import './App.css';
import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Article from './components/article/Article';
import LoginPage from './components/account/LoginPage';
import RegisterPage from './components/account/RegisterPage';
import ActivationPage from './components/account/ActivationPage';
import NotFound from './components/NotFound';

class App extends React.Component {
	render(){
		return(
			<div className="App">
				<Navbar/>
				<Switch>
					<Route exact path='/'><Home/></Route>
					<Route path='/article/' component={() => <Article key={window.location.pathname}/>}/>
					<Route path='/login' render={() => this.props.isLogged ?
						(<Redirect to="/"/>) :
						(<LoginPage/>)
					}/>
					<Route path='/newArticle' render={() => this.props.isLogged ?
						(<Home/>) :
						(<Redirect to="/"/>)
					}/>
					<Route path='/register' render={() => this.props.isLogged ?
						(<Redirect to="/"/>) :
						(<RegisterPage/>)
					}/>
					<Route path='/activate' render={() => this.props.isLogged ?
						(<Redirect to="/"/>) :
						(<ActivationPage/>)
					}/>
					<Route path='/notFound'><NotFound/></Route>
					<Route path='*'><Redirect to='/notFound'/></Route>
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return{
        isLogged:state.isLogged
    };
}

export default connect(mapStateToProps)(App);
