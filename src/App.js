import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Chip } from 'primereact/chip';

import { AuthProvider } from './contexts/AuthContext';
import { UserPrivateRoute, AdminPrivateRoute } from './components/login/PrivateRoute';
import Signup from './components/login/Signup'
import UserLogin from './components/login/UserLogin'
import AdminLogin from './components/login/AdminLogin'
import Landing from './components/Landing'
import AdminDashboard from './components/producers/AdminDashboard'
import UserDashboard from './components/consumers/UserDashboard';
import QuizRules from './components/consumers/QuizRules'

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './App.css'

function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/admin_login" component={AdminLogin} />
            <AdminPrivateRoute exact path="/admin/dashboard" component={AdminDashboard} />
            <Route exact path="/user_signup" component={Signup} />
            <Route exact path="/user_login" component={UserLogin} />
            <Route exact path="/quiz_rules" component={QuizRules} />
            <UserPrivateRoute exact path="/user/dashboard" component={UserDashboard} />
          </Switch>
        </AuthProvider>
      </Router>
      <div className="p-d-flex p-ai-center p-jc-center">
        <Chip label="Designed By Anish" icon="pi pi-user-edit" className="p-mr-2 p-mb-2" />
        <Chip label="Property Of Project SEQL" icon="pi pi-globe" className="p-mr-2 p-mb-2" />
      </div>
    </div>
  );
}

export default App;
