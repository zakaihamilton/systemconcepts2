import { useEffect, useState } from "react";

export function useResizeObserver(ref) {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const handle = ref?.current;
        if (!handle) {
            return;
        }
        const resizeObserver = new ResizeObserver(entries => {
            setCounter(counter => counter + 1);
        });
        resizeObserver.observe(handle);
        return () => {
            resizeObserver.unobserve(handle);
        }
    }, [ref?.current]);

    return counter;
}
