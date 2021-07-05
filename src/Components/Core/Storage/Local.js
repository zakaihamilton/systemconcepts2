export function createStorageHandler(id, keys) {
    return {
        save: (data) => {
            if (keys) {
                data = Object.assign({}, ...keys.map(key => ({ [key]: data[key] })));
            }
            window.localStorage.setItem(id, JSON.stringify(data));
        },
        load: () => {
            const result = window.localStorage.getItem(id);
            const data = JSON.parse(result);
            return data;
        }
    };
}
