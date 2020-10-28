import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';


const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Form = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="username"></input>
        <input type="password" placeholder="password"></input>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

const App = () => {
  return (
    <div>
    <Header text="Budget Buddies" />
    <Form />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// test comment haha
reportWebVitals();
