import './App.css';
import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Leaderboard from './components/leaderboard/Leaderboard';
import Chart from './components/chart/Chart';

class App extends React.Component {
  constructor(props){
    super(props);
    // get current templeague with fetch from backend and set its name to state.league
    this.state = {
      league:'temp',
      top:10,
      date:Date.now()
    }
  }

  onChange = (event) => {
    this.setState({
        [event.target.name]:event.target.value
    })
}

  render(){
    return(
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/'><Leaderboard onChange={this.onChange} league={this.state.league} top={this.state.top} date={this.state.date}/></Route>
          <Route path='/chart'><Chart/></Route>
          <Route path='/account'></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
