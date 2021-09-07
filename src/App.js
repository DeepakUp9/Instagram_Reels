

import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";


import Feeds from "./Components/Feeds";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import { AuthContext, AuthProvider } from './context/AuthProvider';


function App() {
  return (
    <AuthProvider>

      <Router>
        <div className="App">
          <Header></Header>


          <Switch>
            <Route path="/login" component={Login} exact></Route>
            <Route path="/signup" component={Signup} exact></Route>
            <PrivateRoute path="/profile" comp={Profile}></PrivateRoute>
            <PrivateRoute path="/" comp={Feeds}></PrivateRoute>
           

          </Switch>

        </div>
      </Router>
    </AuthProvider>
  );
}



function PrivateRoute(props) {
  let { comp: Component, path } = props;
  // Feeds ?? loggedIn and path="/"
   let { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  // let currentUser = true;
  return currentUser ? (
    <Route path={path} component={Component}></Route>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}

export default App;


