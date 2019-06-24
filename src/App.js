import React from 'react';
import {Switch, Route} from "react-router";
import {HashRouter} from "react-router-dom";

import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/pokemon/:id" component={Pokemon} />
          <Route component={Home}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
