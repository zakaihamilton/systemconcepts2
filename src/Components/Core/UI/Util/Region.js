import { useEffect, useState } from "react";

export function useRegion(ref) {
    const [region, setRegion] = useState({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 });

    useEffect(() => {
        if (!(ref?.current)) {
            return;
        }
        const { left, top, right, bottom, width, height } = ref.current.getBoundingClientRect();
        if (left !== region.left || top !== region.top || right !== region.right || bottom !== region.bottom) {
            setRegion({ left, top, right, bottom, width, height });
        }
    });

    return region;
}
