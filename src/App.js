import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Auth from './services/auth.js';
import history from './services/history';
import { Router, Route } from 'react-router-dom';

class App extends Component {

  render() {

      const handleAuthentication = (nextState, replace) => {
          if (/access_token|id_token|error/.test(nextState.location.hash)) {
              const auth = new Auth();
              auth.handleAuthentication();
          }
      }
      
      // If user logged in, redirect to dashboard.
      if(localStorage.getItem('isLoggedIn')==='true'){
          history.replace('/dashboard');
      }
    
      return (
      <div className="container">
          <Router history={history}>
            <div>
               <Route exact path="/" render={(props) => <Login />} />
               <Route exact path="/dashboard" render={(props) => <Dashboard/>} />
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                      return <div>loading</div>;
                }}></Route>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
