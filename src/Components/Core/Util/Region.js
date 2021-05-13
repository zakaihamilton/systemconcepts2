import { useEffect, useState } from "react";
import { useResizeObserver } from "./Observe"

export function useRegion(ref) {
    const [region, setRegion] = useState({});
    const counter = useResizeObserver(ref);

    useEffect(() => {
        if (!(ref?.current)) {
            return;
        }
        const { left, top, right, bottom, width, height } = ref.current.getBoundingClientRect();
        if (left !== region.left || top !== region.top || right !== region.right || bottom !== region.bottom) {
            setRegion({ left, top, right, bottom, width, height });
        }
    }, [counter]);

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
