import Keycloak from 'keycloak-js';
import $ from "jquery";
import { syntaxHighlight } from './helpers';

const keycloak = Keycloak({
    url: 'https://activeclouder.ijs.si/auth',
    realm: 'barkoder',
    clientId: 'barkoder-web'
});

const role = "craftroom";
const base_url = "https://barkoder.herokuapp.com";

keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
    .success(authenticated => {
        console.log(authenticated ? 'authenticated' : 'not authenticated');
        console.log(keycloak.tokenParsed);
        console.log(keycloak.token);
        $("#username").html(keycloak.tokenParsed.preferred_username);
        $("#username").html(keycloak.tokenParsed.given_name + " " + keycloak.tokenParsed.family_name);
        $("#logout").click(() => keycloak.logout());
        if (!keycloak.hasRealmRole(role)) {
            alert(keycloak.tokenParsed.preferred_username + ", you are not authorized. Contact the administrator to give you the required permissions");
            return;
        }
        getAllItems().done(items => $("#data").html(syntaxHighlight(items)));
    }).error(() => alert('failed to initialize'));



function generateAjaxJson() {
    return {
        contentType: 'application/json',
        beforeSend: (xhr, settings) => xhr.setRequestHeader('Authorization', "bearer " + keycloak.token)
    }
}

function getAllItems() {
    return $.ajax({
        ...generateAjaxJson(),
        url: base_url + "/items",
        type: 'GET'
    });
}

function addItem(item) {
    return $.ajax({
        ... generateAjaxJson(),
        url: base_url + "/item",
        type: 'POST',
        data: JSON.stringify(item)
    });
}

function updateItem(item) {
    return $.ajax({
        ... generateAjaxJson(),
        url: base_url + "/item",
        type: 'PUT',
        data: JSON.stringify(item)
    });
}

function getItem(id) {
    return $.ajax({
        ... generateAjaxJson(),
        url: base_url + "/item",
        type: 'PUT',
        data: {
            id: id
        }
    });
}

function deleteItem(id) {
    $.ajax({
        ... generateAjaxJson(),
        url: base_url + "/item",
        type: 'DELETE',
        data: {
            id: id
        }
    });
}