import { useContext, createContext, useState, useRef, useEffect } from "react"
import { objectHasChanged, createObjectProxy } from "./Object"

export function createState(props) {
    const hasProps = typeof props === "object";
    const [proxy, callbacks] = hasProps && createObjectProxy(props) || [];
    const Context = createContext(hasProps && { proxy, callbacks });

    function State({ children, ...props }) {
        const [updatedProps, setUpdatedProps] = useState({});
        const [value, setValue] = useState(null);
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
            Object.assign(stateRef.current.proxy, { ...updatedProps });
        }, [updatedProps]);
        return <Context.Provider value={value || stateRef.current}>
            {children}
        </Context.Provider>;
    }
    State.useState = (defaultState) => {
        const [, setCounter] = useState(0);
        const ref = useRef();
        const context = useContext(Context);
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
        }, [callbacks]);
        return proxy;
    };
    State.Notify = function NotifyState({ ...props }) {
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
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [...keys, ...values]);
        return null;
    };
    State.Storage = function StorageState({ load, save, children }) {
        const context = useContext(Context);
        useEffect(() => {
            const result = load();
            if (result?.then) {
                result.then(data => {
                    if (data) {
                        Object.assign(context?.proxy, data);
                    }
                })
            }
            else if (result) {
                Object.assign(context?.proxy, result);
            }
            const saveValues = () => {
                save(context?.proxy);
            };
            const callbacks = context?.callbacks;
            if (save && callbacks) {
                callbacks.push(saveValues);
            }
            return () => {
                if (callbacks) {
                    callbacks.remove(saveValues);
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [load, save]);
        return children || null;
    };
    return State;
}
