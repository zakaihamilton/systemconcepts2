import { useEffect, useState } from "react";
import { createState } from "./State"
import { useResizeObserver } from "./Observe"

export function useRegion(ref) {
    const [region, setRegion] = useState({});
    const counter = useResizeObserver(ref);

    useEffect(() => {
        if (!(ref?.current)) {
            return;
        }
        const { left, top, right, bottom, width, height } = ref.current.getBoundingClientRect();
        setRegion({ left, top, right, bottom, width, height });
    }, [counter, ref]);

    return region;
}

export function regionToUnit(region, unit) {
    if (!region) {
        return {};
    }
    const result = {};
    const keys = Object.keys(region);
    for (const key of keys) {
        const hasUnit = typeof region[key] === "string" && region[key].includes(unit);
        if (!hasUnit) {
            result[key] = region[key] + unit;
        }
    }
    return result;
}

export default function Region({ targetRef, children }) {
    const region = useRegion(targetRef);
    return <Region.State {...region}>
        {children}
    </Region.State>;
}

Region.State = createState();
Region.useRegion = Region.State.useState;
