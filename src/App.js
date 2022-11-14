import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Dashboardhome from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './dashboard/Dashboard';
import ViewUser from './dashboard/ViewUser';
import AddUser from './dashboard/AddUser';
import MyProfile from './dashboard/MyProfile';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

require("dotenv").config();

function App() {

  const history = useHistory();
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/Home' component={Dashboard} />
        <Route exact path='/DashboardHome' component={Dashboardhome} />
        <Route exact path='/view-user' component={ViewUser} />
        <Route exact path='/add-user' component={AddUser} />
        <Route exact path='/add-user/:id' component={AddUser} />
        <Route exact path='/my-profile' component={MyProfile} />        
        <Route exact path="/logout" component={() => {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("role");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000)

        }} />
      </Switch>
    </Router>
  )
}
export default App;
