import React from 'react'
import { Route, Switch } from 'react-router'
import HomeLayout from './HomeLayout/HomeLayout'


const MainHome = ({subroutes}) =>{
  console.log(subroutes)
      return(
           <HomeLayout>
             {subroutes}
           </HomeLayout>
        )
}

export default MainHome