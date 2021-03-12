import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Providers } from './Providers'
import { Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <Providers>
      <App />
    </Providers>
  </Router>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
