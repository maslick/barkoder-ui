import $ from "jquery";
import Keycloak from 'keycloak-js';
import { syntaxHighlight } from './helpers';
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
            getAllItems(keycloak.token).done(items => items.forEach(i => drawItem(i)));
        }).error(() => alert('failed to initialize'));
}
else {
    $("#logout").hide();
    getAllItems().done(items => items.forEach(i => drawItem(i)));
}


function drawItem(item) {
    $("#data").after(
        "<div class='item_row'>" +
        "title: " + item.title + "<br>" +
        "category: " + item.category + "<br>" +
        "description: " + item.description + "<br>" +
        "barcode: " + item.barcode + "<br>" +
        "quantity: " + item.quantity +
        "</div>"
    );
}
