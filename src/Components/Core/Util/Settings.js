import { useContext, createContext, useState, useRef, useEffect } from "react"
import { objectHasChanged, createObjectProxy } from "./Object"

export function createSettings(props = {}) {
    const [proxy, callbacks] = createObjectProxy(props);
    const Context = createContext({ proxy, callbacks });

    const Settings = ({ children, ...props }) => {
        const stateRef = useRef({ proxy: null, callbacks: [] });
        const valueChanged = stateRef.current.proxy && objectHasChanged(props, stateRef.current.proxy);
        if (!stateRef.current.proxy) {
            const [proxy, callbacks] = createObjectProxy(props);
            stateRef.current.proxy = proxy;
            stateRef.current.callbacks = callbacks;
        }
        if (valueChanged) {
            Object.assign(stateRef.current.proxy, { ...props });
        }
        return <Context.Provider value={stateRef.current}>
            {children}
        </Context.Provider>;
    };
    Settings.useSettings = () => {
        const [, setCounter] = useState(0);
        const { proxy, callbacks } = useContext(Context) || {};
        useEffect(() => {
            const handler = () => setCounter(counter => counter + 1);
            callbacks.push(handler);
            return () => {
                callbacks.splice(callbacks.indexOf(handler), 1);
            };
        }, []);
        return proxy;
    };
    return Settings;
}
