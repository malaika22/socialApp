import React from 'react';
import {
    Login,
    Home,
    ChatSection,
    SignUp,
    QuotesComponent,
    UserProfile,
    MusicComponent
} from './index';
import {withSubroutes} from '../utils/HOC/reactHOCs';
import MainHome from '../components/MainHome'
import { Redirect } from 'react-router-dom';
//import MusicComponent from '../components/MusicComponent/MusicComponent';

export const HomeRoutes = [
{    component: withSubroutes( MainHome , 
     [
            {
                path : '/',
                exact: true,
                component: Home 
            },
            {
                path: '/user/:userId',
                component: ({history, match}) => {
                    console.log("in chaka", match)
                return <UserProfile userId={match.params.userId}/>
                }
            }, 
            {
                path: '/chat',
                component: ChatSection

            },
            {
                path: '/quotes',
                component: QuotesComponent
            } ,
            {
                path: "/music",
                component: MusicComponent
            }  ,
            {
                path: "/login" ,
                component: () => {return <Redirect to="/"/>}
            }
            
    ] )
}

]

export const  RegisterRoutes = [
              {
                path: "/login",
                component: Login
              },
              {
                path: "/signup",
                component: SignUp
              } 
]