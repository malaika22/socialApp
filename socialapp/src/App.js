import React, { useContext, useEffect, useMemo } from 'react'
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { HomeRoutes, RegisterRoutes } from './configuration/routes';
import { UserContext } from './contexts/UserContext';
import Loading from './components/LoadingComponent/Loading/Loading';

function App() {

  const {currentUser, userLoading, userState} = useContext(UserContext)
  console.log('user loading', userLoading)
  console.log('user state', userState)
  const prepareRoutes = (routes) => 
      routes.map((routeProps, index) => {
          return <Route key={index} {...routeProps} />;
        });  
  
  const routes = useMemo(()=>{
    if(userLoading) {
      console.log('user loading app', userLoading)
      return <Loading />
    } else {
      console.log('user state', userState)
    if(userState) {
            console.log('in user hai')
            return prepareRoutes(HomeRoutes)
          } else {
            console.log('user no')
            return prepareRoutes(RegisterRoutes)
          }
    }

    
         
}, [userState, userLoading]) 
console.log('routes', routes)

    return (
        <Switch>
          {routes}
        </Switch>
    )
}

export default App;
 