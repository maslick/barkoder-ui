import $ from "jquery";
import Keycloak from 'keycloak-js';
import { getAllItems } from './rest';

const keycloak = Keycloak({
    url: window.kcUrl,
    realm: window.realm,
    clientId: window.clientId
});

if (window.kcEnabled && window.kcEnabled.toString() === "true") {
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
            if (!keycloak.hasRealmRole(window.kcRole)) {
                alert(keycloak.tokenParsed.preferred_username + ", you are not authorized. Contact the administrator to give you the required permissions");
                return;
            }
            startSpinner();
            getAllItems(keycloak.token)
                .then(resp => resp.json())
                .then(items => items.forEach(i => drawItem(i)))
                .then(() => stopSpinner())
                .catch(catchError);
        }).error(() => alert('failed to initialize'));
}
else {
    $("#logout").hide();
    startSpinner();
    getAllItems()
        .then(resp => resp.json())
        .then(items => items.forEach(i => drawItem(i)))
        .then(() => stopSpinner())
        .catch(catchError);
}

function drawItem(item) {
    $("#data").append(
        "<div class='item_row'>" +
        "<span class='key'>title:</span> " + item.title + "<br>" +
        "<span class='key'>category:</span> " + item.category + "<br>" +
        "<span class='key'>description:</span> " + item.description + "<br>" +
        "<span class='key'>barcode:</span> " + item.barcode + "<br>" +
        "<span class='key'>quantity:</span> " + item.quantity +
        "</div>"
    );
}

function startSpinner() {
    $("#status").html("loading...");
    $("#status").css("visibility", "visible");
}

function stopSpinner() {
    $("#status").css("visibility", "hidden");
}

function catchError(err) {
    console.warn("error while fetching items :(");
    $("#status").html("error while fetching items :(");
}
