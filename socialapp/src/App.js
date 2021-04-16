import React from 'react'
import { Route, Switch } from 'react-router';
import Login from './components/LoginComponent/Login'
import SignUp from './components/SignUpComponent/SignUp'
import Home from './components/Home/Home'
import UserProfile from './components/UserProfile/UserProfile'
import './App.css';


function App() {
  return (
      <Switch>
         <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp}/>
        <Route path="/user/:userId" render={({history, match})=>
         <UserProfile
         userId={match.params.userId}/>} />
      </Switch>
  );
}

export default App;
 