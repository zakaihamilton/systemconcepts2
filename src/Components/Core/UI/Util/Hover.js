import { useState } from "react";
import { useListeners } from "./Listener"
import { useRefCallback } from "@components/Core/UI/Util/Ref"

export function useHover(hoverRef) {
    const [hover, setHover] = useState(false);
    const [register, unregister] = useListeners();

    useRefCallback(hoverRef, handle => {
        const mouseOver = () => setHover(true);
        const mouseOut = () => setHover(false);
        register(handle, "mouseover", mouseOver);
        register(handle, "mouseout", mouseOut);
        return () => {
            unregister(handle, "mouseover");
            unregister(handle, "mouseout");
        };
    });

    return hover;
}
