const get = (key: string): unknown => {
    const storageItem = window.localStorage.getItem(key);

    if (storageItem === null) {
        return null;
    }

    return JSON.parse(storageItem);
};

const set = (key: string, value: unknown): void => {
    const jsonValue = JSON.stringify(value);

    window.localStorage.setItem(key, jsonValue);
};

const destroy = (key: string): void => {
    window.localStorage.removeItem(key);
};

export default {
    get,
    set,
    destroy
};
