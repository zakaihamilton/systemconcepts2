import React, { useContext, createContext, useState, useRef, useEffect } from "react";
import { objectHasChanged, createObjectProxy } from "./Object";

export function createState(props) {
    const hasProps = typeof props === "object";
    const [proxy, callbacks] = hasProps && createObjectProxy(props) || [];
    const Context = createContext(hasProps && { proxy, callbacks });

    function State({ children, ...props }) {
        const [updatedProps, setUpdatedProps] = useState({ ...props });
        const stateRef = useRef({ proxy: null, callbacks: [] });
        const valueChanged = stateRef.current.proxy && objectHasChanged(props, updatedProps);
        const changeRef = useRef(0);
        if (!stateRef.current.proxy) {
            const [proxy, callbacks] = createObjectProxy(props);
            stateRef.current.proxy = proxy;
            stateRef.current.callbacks = callbacks;
        }
        if (valueChanged) {
            changeRef.current++;
        }
        useEffect(() => {
            if (!changeRef.current) {
                return;
            }
            setUpdatedProps({ ...props });
            Object.assign(stateRef.current.proxy, { ...props });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [changeRef.current]);
        return <Context.Provider value={stateRef.current}>
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
    State.Init = function InitState({ ...props }) {
        const context = useContext(Context);
        const keys = Object.keys(props);
        const values = Object.values(props);
        useEffect(() => {
            const { proxy } = context || ref.current || {};
            keys.forEach(key => {
                props[key](proxy[key]);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [...keys, ...values]);
        return null;
    }
    State.Notify = function NotifyState({ ...props }) {
        const context = useContext(Context);
        const keys = Object.keys(props);
        const values = Object.values(props);
        useEffect(() => {
            const callbacks = context?.callbacks;
            const update = (method, target, key) => {
                if (props[key]) {
                    const value = context?.proxy[key];
                    props[key](value);
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
    State.Storage = function StorageState({ id, load, save, children }) {
        const context = useContext(Context);
        useEffect(() => {
            if (!load) {
                return null;
            }
            const result = load(id);
            if (result?.then) {
                result.then(data => {
                    if (typeof data === "object") {
                        Object.assign(context?.proxy, data);
                    }
                });
            } else if (result) {
                Object.assign(context?.proxy, result);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [load, id]);
        useEffect(() => {
            const saveValues = () => {
                save(id, context?.proxy);
            };
            const callbacks = context?.callbacks;
            if (save && callbacks) {
                callbacks.push(saveValues);
            }
            return () => {
                if (callbacks) {
                    callbacks.remove(saveValues);
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps            
        }, [save, id]);
        return children || null;
    };
    return State;
}