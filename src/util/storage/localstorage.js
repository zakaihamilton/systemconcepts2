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
    const result = callback(...args);
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
