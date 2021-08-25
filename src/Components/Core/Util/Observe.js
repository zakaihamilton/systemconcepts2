import { useEffect } from "react";
import { createState } from "./State";

export function useResizeObserver(ref) {
    const state = Observe.useState();
    useEffect(() => {
        const handle = ref?.current;
        if (!handle) {
            return;
        }
        const resizeObserver = new ResizeObserver(entries => {
            state.counter++;
        });
        resizeObserver.observe(handle);
        return () => {
            resizeObserver.unobserve(handle);
        }
    }, [state, ref]);

    return state?.counter;
}

export default function Observe({ children }) {
    return children;
}

Observe.State = createState({ counter: 0 });
Observe.useState = Observe.State.useState;