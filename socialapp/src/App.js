import Login from './components/LoginComponent/Login'
import SignUp from './components/SignUpComponent/SignUp'
import './App.css';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp}/>
    </Switch>
  );
}

export default App;
