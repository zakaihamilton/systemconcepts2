export default function Handler({ handler, children, ...props }) {
    if (typeof children !== "function") {
        return null;
    }
    if (!handler) {
        return children(props);
    }
    const handlerProps = handler(props);
    if (handlerProps.children) {
        return handlerProps.children;
    }
    return children(handlerProps);
}
