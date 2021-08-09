import React from 'react'
import { Route, Switch } from 'react-router'


const RenderSubRoutes = (route) =>{
    return(
        <Route 
        path={route.path}
        exact={route.exact}
        render={props => {
            console.log('props', props)
            return(<route.component {...props} routes={route.routes}/>)
        } }
        />
    )
}

export const  RenderRoutes = ({routes}) =>{
    console.log('routes', routes)
    return(
        <Switch>
            {routes.map((route,i)=>{
                return(
                    <RenderSubRoutes key={i} {...route}/>
                )
            })}
            <Route component={()=> <h1>Page not found</h1>} />
        </Switch>
    )
}