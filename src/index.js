// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Amplify, { API, Auth } from 'aws-amplify';
import awsmobile from "./aws-exports";
import App from './App';

import './index.scss';
import "react-toastify/dist/ReactToastify.css";

Amplify.configure(awsmobile);
API.configure({
  endpoints: [
      {
          name: "team_casual", // name of the API in API Gateway console
          endpoint: "https://vsq5ldzl04.execute-api.eu-west-2.amazonaws.com/dev",
          region: "eu-west-2",
          paths: ['/minecraft/servers']
      }
  ]
});
Auth.configure(awsmobile);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
