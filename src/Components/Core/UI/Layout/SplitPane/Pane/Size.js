import { useEffect, useState } from "react";
import SplitPane from "../../SplitPane";

export function useSize({ dividerRef, paneRef, size }) {
    const [currentSize, setCurrentSize] = useState(size);
    const [dragging] = SplitPane.Resize.useDrag(dividerRef, paneRef, ({ orientation, percentage }) => {
        if (orientation === "vertical") {
            setCurrentSize(`0 0 ${percentage.x}%`);
        }
        else {
            setCurrentSize(`0 0 ${percentage.y}%`);
        }
    });
    useEffect(() => {
        if (typeof size === "undefined") {
            setCurrentSize("1 0 auto");
        }
        else {
            setCurrentSize(`0 0 ${size}`);
        }
    }, [size]);
    return [currentSize, dragging];
}
