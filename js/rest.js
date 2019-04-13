import $ from "jquery";

const base_url = window.baseUrl;

export function getAllItems(token) {
    return $.ajax({
        ...generateAjaxJson(token),
        url: base_url + "/items",
        crossDomain: true,
        contentType: 'application/json',
        type: 'GET'
    });
}

export function addItem(item, token) {
    return $.ajax({
        ... generateAjaxJson(token),
        url: base_url + "/item",
        type: 'POST',
        data: JSON.stringify(item)
    });
}

export function updateItem(item, token) {
    return $.ajax({
        ... generateAjaxJson(token),
        url: base_url + "/item",
        type: 'PUT',
        data: JSON.stringify(item)
    });
}

export function getItem(id, token) {
    return $.ajax({
        ... generateAjaxJson(token),
        url: base_url + "/item",
        type: 'PUT',
        data: {
            id: id
        }
    });
}

export function deleteItem(id, token) {
    $.ajax({
        ... generateAjaxJson(token),
        url: base_url + "/item",
        type: 'DELETE',
        data: {
            id: id
        }
    });
}

function generateAjaxJson(token) {
    return {
        beforeSend: (xhr, settings) => {
            xhr.setRequestHeader('Authorization', "bearer " + token);
            xhr.setRequestHeader('Access-Control-Allow-Origin','*');
        }
    };
}
