import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginComponent from './login';
import {isExpiredBoolean} from './token';
import Dashboard from '../../home/index'; // Importe o componente de dashboard que você deseja redirecionar após o login

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Aqui, você precisa usar o array destruturing para obter o estado e a função para atualizá-lo
  
    useEffect(() => {
        console.log(isExpiredBoolean())
      setIsLoggedIn(isExpiredBoolean());
    }, []);
  
    return (
      <Router>
        <Switch>
          <Route exact path="/pages/login">
            {isLoggedIn ? <LoginComponent /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/">
            {!isLoggedIn ? <Dashboard /> : <Redirect to="/pages/login" />}
          </Route>
          <Redirect to="/pages/login" />
        </Switch>
      </Router>
    );
  };

export default App;
