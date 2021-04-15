import { useRef, useEffect } from "react"

export function useRefCallback(ref, callback, depends = []) {
    useEffect(() => {
        if (!ref || !ref.current) {
            return null;
        }
        const destructor = callback(ref.current);
        return destructor;
    }, [ref && ref.current, ...depends]);
}

export function useRefById(id) {
    const ref = useRef();
    useEffect(() => {
        if (id) {
            const el = document.getElementById(id);
            ref.current = el;
        }
    }, [id]);
    return ref;
}
