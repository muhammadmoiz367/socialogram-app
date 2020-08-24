import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import jwtDecode from 'jwt-decode'
import AuthRoute from './components/authRoute';
import NewPost from "./pages/newPost";
import PostPage from './pages/postPage'
import Profile from './pages/profile'


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
        <AuthRoute exact path="/new-post" component={NewPost} />
        <AuthRoute exact path="/post/:postId" component={PostPage} />
        <AuthRoute exact path="/users/:handle/post/:postId" component={PostPage} />
        <AuthRoute exact path="/user/:handle" component={Profile} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
