export default function Handler({ handler, children, ...props }) {
    if (typeof children !== "function") {
        return null;
    }
    if (!handler) {
        return children(props);
    }
    const handlerProps = handler(props);
    return children(handlerProps);
}
