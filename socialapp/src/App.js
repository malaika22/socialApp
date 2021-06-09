import React, { useContext, useEffect, useMemo } from 'react'
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { HomeRoutes, RegisterRoutes } from './configuration/routes';
import { UserContext } from './contexts/UserContext';


function App() {
  const {currentUser} = useContext(UserContext)

  console.log('Hehe', currentUser)
  const prepareRoutes = (routes) => 
      routes.map((routeProps, index) => {
          return <Route key={index} {...routeProps} />;
        });  
  
  const routes = useMemo(()=>{
    console.log('in use memo')
          if(currentUser) {
            console.log('in user hai')
            return prepareRoutes(HomeRoutes)
          } else {
            return prepareRoutes(RegisterRoutes)
          }
}, [currentUser]) 

console.log('keke', routes)

    return (
      <BrowserRouter>
        <Switch>
          {routes}
        </Switch>
      </BrowserRouter>


    )
}

export default App;
 