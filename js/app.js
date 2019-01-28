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
        $("#logout").click(() => {
            keycloak.logout();
        });
        if (!keycloak.hasRealmRole(role)) {
            alert(keycloak.tokenParsed.preferred_username + ", you are not authorized. Contact the administrator to give you the required permissions");
            return;
        }
        getAllItems().done(items => $("#data").html(syntaxHighlight(items)));
    }).error(() => alert('failed to initialize'));

function syntaxHighlight(json) {
    if (typeof json != 'string') json = JSON.stringify(json, undefined, 2);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

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