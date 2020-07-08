import React from 'react';
import { Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signup';

function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </div>
  );
}

export default App;
