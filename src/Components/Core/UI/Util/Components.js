function compose(components, children) {
    return components.filter(([, Component]) => Component).reduce((acc, [key, Component]) => {
        return <Component key={key}>{acc}</Component>;
    }, children);
};

export default function Components({ ...components }) {
    return compose(Object.entries(components));
}
