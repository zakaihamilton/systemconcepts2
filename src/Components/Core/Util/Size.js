import { useEffect, useState } from "react";
import { useResizeObserver } from "./Observe"
import { createState } from "./State"

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
    }, [counter, ref, size.width, size.height]);

    return [size?.width, size?.height];
}

export default function Size({ targetRef, children }) {
    const [width, height] = useSize(targetRef);
    return <Size.State width={width} height={height}>
        {children}
    </Size.State>;
}

Size.State = createState();
Size.useSize = Size.State.useState;
