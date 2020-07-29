import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signup';
import jwtDecode from 'jwt-decode'
import AuthRoute from './components/authRoute';

const token=localStorage.getItem('FBIdToken')
try{
  if(localStorage.getItem('FBIdToken')){
    const decodedToken=jwtDecode(token)
    console.log(decodedToken)
    if(decodedToken.exp*1000 <Date.now()){
      window.location.href="/login"
    }
  }
}
catch(error){
  console.log(error)
}


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <AuthRoute exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
