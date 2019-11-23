import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Header from './components/organisms/Header.js';
import ActionButton from './components/organisms/ActionButton.js';
import Footer from './components/organisms/Footer.js';

import AppOverview from './pages/AppOverview.js';
import AlbumOverview from './pages/AlbumOverview.js';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

import checkLogin from './store/actions/checkLogin';
import logout from './store/actions/logout';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const PageContent = styled.main`
  margin: 1rem auto;
  max-width: 1200px;
`;

function App({ checkLogin, logout }) {
  const [actionToggle, setActionToggle] = useState(false);
  const handleButtonClick = () => setActionToggle(!actionToggle);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <AppWrapper>
      <Header />

      <PageContent>
        <Switch>
          <ProtectedRoute exact path='/'>
            <AppOverview />
          </ProtectedRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
          <ProtectedRoute path='/albums/:id'>
            <AlbumOverview />
          </ProtectedRoute>
        </Switch>
      </PageContent>

      <div>
        <Footer />
        <button onClick={logout}>
          Logout
        </button>
      </div>
      <ActionButton active={actionToggle} handleClick={handleButtonClick} />
    </AppWrapper>
  );
};

export default connect(null, { checkLogin, logout })(App);
