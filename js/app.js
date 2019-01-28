const keycloak = Keycloak({
    url: 'https://activeclouder.ijs.si/auth',
    realm: 'barkoder',
    clientId: 'barkoder-frontend'
});

const role = "craftroom";
const base_url = "https://barkoder.herokuapp.com";

keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false
    })
    .success(function (authenticated) {
        console.log(authenticated ? 'authenticated' : 'not authenticated');
        console.log(keycloak.tokenParsed);
        console.log(keycloak.token);
        $("#username").html(keycloak.tokenParsed.preferred_username);
        $("#username").html(keycloak.tokenParsed.given_name + " " + keycloak.tokenParsed.family_name);
        $("#logout").click(function () {
            keycloak.logout();
        });
        if (!keycloak.hasRealmRole(role)) {
            alert(keycloak.tokenParsed.preferred_username + ", you are not authorized. Contact the administrator to give you the required permissions");
            return;
        }
        init();
    }).error(function () {
        alert('failed to initialize');
    });

function init() {
    const items = getAllItems();
    console.log(items);
    $("#data").html(syntaxHighlight(items));
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
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

function getAllItems() {
    let data;
    $.ajax({
            url: base_url + "/items",
            type: 'GET',
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', "bearer " + keycloak.token);
            },
            async: false
        })
        .done(function (d) {
            data = d;
        });

    if (data == null || data.length === 0) return;
    return data;
}

function addItem(item) {
    if (keycloak.isTokenExpired()) return;
    let data;
    // Perform the request
    $.ajax({
            contentType: 'application/json',
            data: JSON.stringify(item), // if wont work put item out of JSON.stringify()
            url: base_url + "/item",
            type: 'POST',
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', "bearer " + keycloak.token);
            },
            async: false
        })
        .done((d) => {
            data = d;
        });

    if (data == null || data.length === 0) {
        console.log("Item not found")
    }
    return data;
}

function updateItem(item) {
    if (keycloak.isTokenExpired()) return;
    let data;
    // Perform the request
    $.ajax({
            contentType: 'application/json',
            data: JSON.stringify(item), // if wont work put item out of JSON.stringify()
            url: base_url + "/item",
            type: 'PUT',
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', "bearer " + keycloak.token);
            },
            async: false
        })
        .done((d) => {
            data = d;
        });

    if (data == null || data.length === 0) {
        console.log("Item not found")
    }
    return data;
}

function getItem(id) {
    if (keycloak.isTokenExpired()) return;
    let data;
    // Perform the request
    $.ajax({
            contentType: 'application/json',
            url: base_url + "/item",
            data: {
                id: id
            },
            type: 'PUT',
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', "bearer " + keycloak.token);
            },
            async: false
        })
        .done((d) => {
            data = d;
        });

    if (data == null || data.length === 0) {
        console.log("Item not found")
    }
    return data;
}

function deleteItem(id) {
    if (keycloak.isTokenExpired()) return;
    let data;
    // Perform the request
    $.ajax({
            contentType: 'application/json',
            url: base_url + "/item",
            data: {
                id: id
            },
            type: 'DELETE',
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', "bearer " + keycloak.token);
            },
            async: false
        })
        .done((d) => {
            alert("Item was deleted!");
        });
}