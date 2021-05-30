import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

export const withSubroutes = (Component, subroutes) => () => {
     console.log('withsub', subroutes)
  return (
    <Component
      subroutes={
        <Switch>
          {subroutes.map((routeProps, index) => (
            <Route key={index} {...routeProps} />
          ))}
          <Route component={()=> <h1>Page not found
          </h1>}/>
        </Switch>
      }
    />
  );
};