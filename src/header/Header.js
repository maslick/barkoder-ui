import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import "./Header.css"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.keycloak.tokenParsed.name,
            email: props.keycloak.tokenParsed.email,
            id: props.keycloak.tokenParsed.sub
        };
    }

    logout() {
        this.props.history.push('/welcome');
        this.props.keycloak.logout();
    }

    render = () => {
        return (
            <div>
                <div id="account">
                    <span id="username">{this.state.name}&nbsp;</span>
                    <a href="" id="logout" onClick={ () => this.logout() }>logout</a>
                </div>
                <div className="logo">
                    <img src="logo.png" alt="logo"/>
                </div>
                <h1>barkoder.</h1>
                <div id="status">loading...</div>
            </div>
        );
    };
}

export default withRouter(Header);
