import { useContext, createContext, useState, useRef, useEffect } from "react"
import { objectHasChanged, createObjectProxy } from "./object"

export function createState(props) {
    const hasProps = typeof props === "object";
    const [proxy, callbacks] = (hasProps && createObjectProxy(props)) || [];
    const Context = createContext(hasProps && { proxy, callbacks });

    function State({ children, ...props }) {
        const [updatedProps, setUpdatedProps] = useState(0);
        const stateRef = useRef({ proxy: null, callbacks: [] });
        const valueChanged = stateRef.current.proxy && objectHasChanged(props, updatedProps);
        if (!stateRef.current.proxy) {
            const [proxy, callbacks] = createObjectProxy(props);
            stateRef.current.proxy = proxy;
            stateRef.current.callbacks = callbacks;
        }
        if (valueChanged) {
            setUpdatedProps(props);
        }
        useEffect(() => {
            Object.assign(stateRef.current.proxy, updatedProps);
        }, [updatedProps]);
        return <Context.Provider value={stateRef.current}>
            {children}
        </Context.Provider>;
    };
    State.useState = (defaultState) => {
        const [, setCounter] = useState(0);
        const ref = useRef();
        let context = useContext(Context);
        if (!context && defaultState && !ref.current) {
            const [proxy, callbacks] = createObjectProxy(defaultState);
            ref.current = { proxy, callbacks };
        }
        const { proxy, callbacks } = context || ref.current || {};
        useEffect(() => {
            const handler = () => {
                setCounter(counter => counter + 1);
            };
            if (callbacks) {
                callbacks.push(handler);
            }
            return () => {
                if (callbacks) {
                    const index = callbacks.indexOf(handler);
                    if (index !== -1) {
                        callbacks.splice(index, 1);
                    }
                }
            };
        }, []);
        return proxy;
    };
    return State;
}
