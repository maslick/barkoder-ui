const base_url = window.baseUrl;

export function getAllItems(token) {
    return fetch(base_url + "/items", {
        headers: { ...authHeader(token) },
        method: 'GET'
    });
}

export function addItem(item, token) {
    return fetch(base_url + "/item", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            ...authHeader(token)
        },
        method: 'POST',
        body: JSON.stringify(item)
    });
}

export function updateItem(item, token) {
    return fetch(base_url + "/item", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            ...authHeader(token)
        },
        method: 'PUT',
        body: JSON.stringify(item)
    });
}

export function getItem(id, token) {
    return fetch(base_url + "/item/" + id, {
        headers: { ...authHeader(token) },
        method: 'GET'
    });
}

export function deleteItem(id, token) {
    return fetch(base_url + "/item/" + id, {
        headers: { ...authHeader(token) },
        method: 'DELETE'
    });
}

function authHeader(token) {
    return { "Authorization": "bearer " + token };
}
