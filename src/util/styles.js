import clsx from "clsx"

export function joinClasses(styles, ...classes) {
    const classNames = [];
    for (const className of classes) {
        if (typeof className === "string") {
            classNames.push(className);
        }
        else if (Array.isArray(className)) {
            classNames.push(...className.map(id => styles[id]));
        }
        else {
            for (const id in className) {
                if (className[id]) {
                    classNames.push(styles[id]);
                }
            }
        }
    }
    return clsx(...classNames);
}
