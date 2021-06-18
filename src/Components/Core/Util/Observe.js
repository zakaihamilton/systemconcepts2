import { useEffect, useState } from "react";
import Language from "@components/Core/Util/Language";

export function useResizeObserver(ref) {
    const [counter, setCounter] = useState(0);
    const language = Language.useLanguage();
    useEffect(() => {
        setCounter(counter => counter + 1);
    }, [language?.direction]);
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
