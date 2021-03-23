import { useEffect } from "react"

export function useRefCallback(ref, callback, depends = []) {
    useEffect(() => {
        if (!ref || !ref.current) {
            return null;
        }
        const destructor = callback(ref.current);
        return destructor;
    }, [ref && ref.current, ...depends]);
}
