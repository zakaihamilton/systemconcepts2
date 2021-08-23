import { useEffect } from "react";
import Language from "@components/Core/Util/Language";
import { createState } from "./State";

export function useResizeObserver(ref) {
    const state = Observe.useState();
    const language = Language.useLanguage();
    useEffect(() => {
        state.counter++;
    }, [state, language?.direction]);
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