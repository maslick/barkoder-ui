import React, { Component } from 'react';


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.keycloak.tokenParsed.name,
            email: props.keycloak.tokenParsed.email,
            id: props.keycloak.tokenParsed.sub
        };
    }

    render = () => {
        return (
            <div className='UserInfo'>
                <p>Name: { this.state.name }</p>
                <p>Email: { this.state.email }</p>
                <p>ID: { this.state.id }</p>
            </div>
        );
    };
}

export default UserInfo;
