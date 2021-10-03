export function createStorageHandler(keys) {
    return {
        save: (id, data) => {
            if (keys) {
                data = Object.assign({}, ...keys.map(key => ({ [key]: data[key] })));
            }
            window.localStorage.setItem(id, JSON.stringify(data));
        },
        load: (id) => {
            const result = window.localStorage.getItem(id);
            try {
                const data = JSON.parse(result);
                return data;
            }
            catch {
                return {};
            }
        }
    };
}
