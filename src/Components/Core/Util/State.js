import { useContext, createContext, useState, useRef, useEffect } from "react"
import { objectHasChanged, createObjectProxy } from "./Object"

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
                    callbacks.remove(handler);
                }
            };
        }, []);
        return proxy;
    };
    State.Notify = function NotifyState({ children, ...props }) {
        let context = useContext(Context);
        const keys = Object.keys(props);
        const values = Object.values(props);
        useEffect(() => {
            const callbacks = context?.callbacks;
            const update = (method, target, key) => {
                if (props[key]) {
                    props[key](context?.proxy[key]);
                }
            };
            if (callbacks) {
                callbacks.push(update);
            }
            return () => {
                if (callbacks) {
                    callbacks.remove(update);
                }
            };
        }, [context, ...keys, ...values]);
        return <>{children}</>;
    };
    return State;
}
