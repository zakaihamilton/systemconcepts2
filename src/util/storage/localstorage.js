export function localStorageCall(method, ...args) {
    if (!method) {
        throw "No method passed"
    }
    if (typeof window === "undefined") {
        return defaultValue;
    }
    if (!window.localStorage) {
        return defaultValue;
    }
    const callback = window.localStorage[method];
    if (!callback) {
        throw "Invalid method"
    }
    if (typeof callback !== "function") {
        return callback;
    }
    const result = window.localStorage[method](...args);
    return result;
}

export function getItem(id, defaultValue) {
    if (!id) {
        return defaultValue;
    }
    const result = localStorageCall("getItem", id);
    if (result === null) {
        return defaultValue;
    }
    return result;
}

export function setItem(id, value) {
    if (!id) {
        return defaultValue;
    }
    localStorageCall("setItem", id, value);
}

export function removeItem(id) {
    if (!id) {
        return;
    }
    localStorageCall("removeItem", id);
}

export function replaceItem(oldId, id, value = "") {
    if (!oldId || !id) {
        return false;
    }
    if (oldId === id) {
        console.log("oldId", oldId, "id", id, "value", value);
        localStorageCall("setItem", id, value);
        return true;
    }
    const result = localStorageCall("getItem", id);
    if (result !== null) {
        return false;
    }
    localStorageCall("setItem", id, value);
    localStorageCall("removeItem", oldId);
    return true;
}

export function clear() {
    localStorageCall("clear");
}

export function* iterater() {
    if (typeof window === "undefined") {
        return;
    }
    if (!window.localStorage) {
        return;
    }
    const length = localStorageCall("length");
    for (const index = 0; index < length; index++) {
        yield localStorageCall("key", index);
    }
}

export function length() {
    localStorageCall("length");
}
