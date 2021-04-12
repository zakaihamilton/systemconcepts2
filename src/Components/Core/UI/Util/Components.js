function compose(components, children) {
    components = components.filter(([, Component]) => typeof Component === "function");
    if (!components.length) {
        return children;
    }
    return components.reduce((acc, [key, Component]) => {
        return <Component key={key}>{acc}</Component>;
    }, children);
};

export default function Components({ children, ...components }) {
    return compose(Object.entries(components), children);
}
