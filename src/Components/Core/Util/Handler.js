export default function Handler({ handler, children, ...props }) {
    if (typeof children !== "function") {
        return null;
    }
    if (!handler) {
        return children(props);
    }
    const handlerProps = handler(props);
    console.log("handler", handler, "handlerProps", handlerProps, "props", props);
    return children(handlerProps);
}
