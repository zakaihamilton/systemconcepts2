import { useEffect, useRef, useCallback } from "react";

export function useListener() {
    const items = useRef([]);
    const register = useCallback((target, type, cb) => {
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
            target.addEventListener(type, cb);
        }
    }, []);
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
    useEffect(() => {
        return () => {
            for (const item of items.current) {
                if (item.target) {
                    item.target.removeEventListener(item.type, item.cb);
                }
            }
        };
    }, []);
    return [register, unregister];
}
