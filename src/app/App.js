import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Welcome from '../welcome/Welcome';
import Secured from '../items/Secured';
import './App.css';

class App extends Component {
    render = () => (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Secured}/>
                <Route exact path="/welcome" component={Welcome}/>
            </div>
        </BrowserRouter>
    );
}
export default App;
