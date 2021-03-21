import { useContext, createContext, useState, useRef, useEffect } from "react"
import { objectHasChanged, createObjectProxy } from "./object"

export function createState(props = {}) {
    const [proxy, callbacks] = createObjectProxy(props);
    const Context = createContext({ proxy, callbacks });

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
    State.useState = () => {
        const [, setCounter] = useState(0);
        const { proxy, callbacks } = useContext(Context) || {};
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
