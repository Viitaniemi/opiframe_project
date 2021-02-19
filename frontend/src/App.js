import './App.css';
import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Article from './components/article/Article';
import Login from './components/account/Login'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  onChange = (event) => {
    this.setState({
        [event.target.name]:event.target.value
    })
  }

  logOut = () => {
    this.setState({
      loggedIn: false
    })
  }

  logIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  render(){
    return(
      <div className="App">
        <Navbar loggedIn={this.state.loggedIn} logOut={this.logOut}/>
        <Switch>
          <Route exact path='/'><Home/></Route>
          <Route path='/article/' component={() => <Article key={window.location.pathname}/>}></Route>
          <Route path='/login'><Login logIn={this.logIn}/></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
