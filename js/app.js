import Keycloak from 'keycloak-js';
import $ from "jquery";
import { syntaxHighlight } from './helpers';

const keycloak = Keycloak({
    url: window.kcUrl,
    realm: window.realm,
    clientId: window.clientId
});

const role = window.kcRole;
const base_url = window.baseUrl;

if (window.kcEnabled && window.kcEnabled === true) {
    keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
        .success(authenticated => {
            console.log(authenticated ? 'authenticated' : 'not authenticated');
            console.log(keycloak.tokenParsed);
            console.log(keycloak.token);
            console.log(keycloak.refreshTokenParsed);
            console.log(keycloak.refreshToken);
            $("#username").html(keycloak.tokenParsed.preferred_username);
            $("#username").html(keycloak.tokenParsed.given_name + " " + keycloak.tokenParsed.family_name);
            $("#logout").click(() => keycloak.logout());
            if (!keycloak.hasRealmRole(role)) {
                alert(keycloak.tokenParsed.preferred_username + ", you are not authorized. Contact the administrator to give you the required permissions");
                return;
            }
            getAllItems().done(items => $("#data").html(syntaxHighlight(items)));
        }).error(() => alert('failed to initialize'));
}
else {
    $("#logout").hide();
    $.ajax({
        contentType: 'application/json',
        url: base_url + "/items",
        type: 'GET'
    }).done(items => $("#data").html(syntaxHighlight(items)));
}

function generateAjaxJson() {
    return { beforeSend: (xhr, settings) => xhr.setRequestHeader('Authorization', "bearer " + keycloak.token) }
}

function getAllItems() {
    return $.ajax({
        ...generateAjaxJson(),
        url: base_url + "/items",
        contentType: 'application/json',
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
