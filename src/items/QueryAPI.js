import React, { Component } from 'react';
import './List.css'


class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {item: props.item};
    }

    render() {
        return (
            <div className='item_row'>
                <span className='key'>title: </span> {this.state.item.title}<br/>
                <span className='key'>category: </span> {this.state.item.category}<br/>
                <span className='key'>description: </span> {this.state.item.description}<br/>
                <span className='key'>barcode: </span> {this.state.item.barcode}<br/>
                <span className='key'>quantity: </span>{this.state.item.quantity}
            </div>
        );
    }
}


class QueryAPI extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { items: []}
    }

    componentDidMount() {
        fetch(window.baseUrl + "/items", this.authorizationHeader())
            .then(res => res.json())
            .then(data => this.setState({ items: data }))
            .catch(err => console.error("Could not fetch items :( " + err.toString()));
    }

    authorizationHeader() {
        if (!this.props.keycloak) return {};
        return {
            headers: {
                "Authorization": "Bearer " + this.props.keycloak.token
            }
        };
    }

    render() {
        return (
            <div className="QueryAPI">
                { this.state.items.map((item, _) =>
                    <Item item={item} key={item.id} />
                )}
            </div>
        );
    }
}

export default QueryAPI;
