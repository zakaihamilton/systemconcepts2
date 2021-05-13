export function useAlign(region, options) {
    const result = {};
    if (!region) {
        return {};
    }
    const keys = Object.keys(options);
    for (const key of keys) {
        if (typeof region[options[key]] === "undefined") {
            result[key] = options[key];
        }
        else {
            result[options[key]] = region[key];
        }
    }
    return result;
}
