import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './utils/auth';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Audits from './pages/Audits';
import Navigation from './components/Navigation';
import IndividualAudit from './components/IndividualAudit';
import CertificationsCertify from './pages/CertificationsCertify';
import CertificationsCreate from './pages/CertificationsCreate';
import CertificationsReview from './pages/CertificationsReview';
import Policies from './pages/Policies';
import GradingStandards from './pages/GradingStandards';
import Standards from './pages/Standards';
import Procedures from './pages/Procedures';
import PageNotFound from './pages/PageNotFound'
import UploadFile from './components/UploadFile';
import AuditResults from './pages/AuditResult';
import AuditResultsByCategory from './pages/AuditResultsByCategory';
import AuditResultsByFacility from './pages/AuditResultsByFacility';
import AuditResultsAll from './pages/AuditResultsAll';

const httpLink = createHttpLink({
  uri: '/graphql',
  
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  if(!Auth.loggedIn()){
    return(
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header /> 
            <div className="container">
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    )
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <Navigation />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/upload">
                <UploadFile />
              </Route>              
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/me">
                <Profile />
              </Route>
              <Route exact path="/policies">
                <Policies />
              </Route>
              <Route exact path="/standards">
                <Standards />
              </Route>
              <Route exact path="/standards/gradingstandards">
                <GradingStandards />
              </Route>
              <Route exact path="/procedures">
                <Procedures />
              </Route>              
              <Route exact path="/audits">
                <Audits />
              </Route>
              <Route exact path="/audits/:categoryId">
                <IndividualAudit />
              </Route>
              <Route exact path='/audits/auditresults/all'>
                <AuditResultsAll />
              </Route>
              <Route exact path='/audits/auditresults/category/:categoryId'>
                <AuditResultsByCategory />
              </Route>
              <Route exact path='/audits/auditresults/facility/:facilityId'>
                <AuditResultsByFacility />
              </Route>              
              <Route exact path='/audits/auditresults/:auditId'>
                <AuditResults />
              </Route>
              <Route exact path ="/profile/:userId">
                <Profile />
              </Route>
              <Route exact path="/certifications/certify">
                <CertificationsCertify />
              </Route>
              <Route exact path="/certifications/create">
                <CertificationsCreate/>
              </Route>
              <Route exact path="/certifications/review">
                <CertificationsReview/>
              </Route>
              <Route path ="*">
                <PageNotFound />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
