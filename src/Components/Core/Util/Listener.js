import { useEffect, useRef, useCallback } from "react";

export function useListeners() {
    const items = useRef([]);
    const unregister = useCallback((target, type) => {
        const index = items.current.findIndex(item => item.target === target && item.type === type);
        if (index === -1) {
            return;
        }
        const item = items.current[index];
        if (item.target) {
            item.target.removeEventListener(item.type, item.cb);
        }
        items.current.splice(index, 1);
    }, []);
    const register = useCallback((target, type, cb, ...args) => {
        const index = items.current.findIndex(item => item.target === target && item.type === type);
        if (index !== -1) {
            unregister(target, type);
            const item = items.current[index];
            if (item.cb === cb) {
                return;
            }
        }
        items.current.push({ target, type, cb });
        if (target && type && cb) {
            target.addEventListener(type, cb, ...args);
        }
    }, [unregister]);
    useEffect(() => {
        const current = items.current;
        return () => {
            for (const item of current) {
                if (item.target) {
                    item.target.removeEventListener(item.type, item.cb);
                }
            }
        };
    }, []);
    return [register, unregister];
}

export function useListener(target, type, cb, ...args) {
    useEffect(() => {
        if (!target) {
            return;
        }
        target.addEventListener(type, cb, ...args);
        return () => {
            target.removeEventListener(type, cb);
        };
    }, [target, type, cb, args]);
}
