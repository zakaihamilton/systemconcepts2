import { useEffect, useState } from "react";
import SplitPane from "../../SplitPane";
import Language from "@components/Core/Util/Language"

export function useSize({ dividerRef, paneRef, size, minSize, maxSize, last }) {
    const language = Language.useLanguage();
    const [currentSize, setCurrentSize] = useState(size ? ("0 0 " + size) : undefined);
    const reverseHorizontal = (language?.direction === "ltr" && last) || (language?.direction === "rtl" && !last);
    const reverseVertical = last;
    const [dragging] = SplitPane.Resize.useDrag(dividerRef, paneRef, ({ orientation, percentage }) => {
        if (orientation === "vertical") {
            setCurrentSize(`0 0 ${percentage.x}%`);
        }
        else {
            setCurrentSize(`0 0 ${percentage.y}%`);
        }
    }, { minSize, maxSize, reverseHorizontal, reverseVertical });
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
