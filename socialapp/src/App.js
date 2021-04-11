import Login from './components/LoginComponent/Login'
import SignUp from './components/SignUpComponent/SignUp'
import Home from './components/Home/Home'
import './App.css';
import { Route, Switch } from 'react-router';

function App() {
  return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp}/>
        <Route path="/home" component={Home} />
      </Switch>
  );
}

export default App;
 