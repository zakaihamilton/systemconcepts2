import { useEffect, useState } from "react";
import { useResizeObserver } from "./Observe"

export function useSize(ref) {
    const [size, setSize] = useState({});
    const counter = useResizeObserver(ref);

    useEffect(() => {
        if (!(ref?.current)) {
            return;
        }
        const { width, height } = ref.current.getBoundingClientRect();
        if (width !== size.width || height !== size.height) {
            setSize({ width, height });
        }
    }, [counter]);

    return [size?.width, size?.height];
}
