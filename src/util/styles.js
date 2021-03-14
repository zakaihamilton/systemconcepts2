import clsx from "clsx"

export function joinClasses(styles, classes, className) {
    const classNames = [];
    if (classes) {
        if (Array.isArray(classes)) {
            classNames.push(...classes.map(id => styles[id]));
        }
        else {
            for (const id in classes) {
                if (classes[id]) {
                    classNames.push(styles[id]);
                }
            }
        }
    }
    if (className) {
        classNames.push(className);
    }
    return clsx(...classNames);
}
