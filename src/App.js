import logo from './logo.svg';
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Team Casual
        </p>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(
  App,
  {
    signUpConfig: {
      signUpFields: [
        { key: "preferred_username", required: true }
      ]
    }
  }
);