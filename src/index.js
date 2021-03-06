import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import "antd/dist/antd.css";
//import '@fortawesome/fontawesome-free/svgs'
import {UserContext, UserContextProvider} from './contexts/UserContext'
import {PostsContextProvider} from './contexts/PostsContext'
import './index.css';
import App from './App';
import firebase from './fbConfig'
import reportWebVitals from './reportWebVitals';
import { MessagesContextProvider } from './contexts/MessagesContext';
import { MusicContextProvider } from './contexts/MusicContext';
import {QuotesContextProvider} from './contexts/QuotesContex'

firebase.auth().onAuthStateChanged(user =>{
  if (user) {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <UserContextProvider>
            <PostsContextProvider>
              <MessagesContextProvider>
                <QuotesContextProvider>
                  <MusicContextProvider>
                      <App />
                  </MusicContextProvider>
                </QuotesContextProvider>
              </MessagesContextProvider>
            </PostsContextProvider>
          </UserContextProvider>
          </BrowserRouter>
      </React.StrictMode>,
      document.getElementById('root')
    )
  }
  else {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById('root')
    )
  }
}
) 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();