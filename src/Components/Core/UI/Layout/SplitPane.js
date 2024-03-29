import styles from "./SplitPane.module.scss"
import React, { useRef } from "react"
import { joinClasses } from "@util/styles"
import { createState } from "@components/Core/Util/State"
import { createList } from "@components/Core/Util/List"
import { createDrag } from "@components/Core/Util/Drag"
import Size from "@components/Core/Util/Size"

export default function SplitPane({ children, orientation = "vertical" }) {
    const ref = useRef();
    return <div ref={ref} className={joinClasses(styles, ["root", orientation])}>
        <Size targetRef={ref}>
            <SplitPane.State orientation={orientation}>
                <SplitPane.List>
                    <SplitPane.Resize containerRef={ref} orientation={orientation}>
                        {children}
                    </SplitPane.Resize>
                </SplitPane.List>
            </SplitPane.State>
        </Size>
    </div>;
}

SplitPane.State = createState({ orientation: "vertical" });
SplitPane.List = createList();
SplitPane.Resize = createDrag();
