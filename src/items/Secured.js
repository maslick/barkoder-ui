import React, {Component} from 'react';
import Keycloak from 'keycloak-js/dist/keycloak';
import Logout from '../header/Header';
import './Secured.css'
import QueryAPI from "./QueryAPI";

class Secured extends Component {
    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false };
    }

    componentDidMount = () => {
        const keycloak = Keycloak({
            url: window.kcUrl,
            realm: window.realm,
            clientId: window.clientId
        });

        keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).success(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated });
        });
    };

    render = () => {
        if (this.state.keycloak) {
            if (this.state.authenticated) return (
                <div>
                    <Logout keycloak={this.state.keycloak}/>
                    <div className='data'>
                        <QueryAPI keycloak={this.state.keycloak} />
                    </div>
                </div>

            ); else return (<div>Unable to authenticate!!!</div>);
        }

        return (
            <div>Initializing Keycloak...</div>
        )
    };
}

export default Secured;
