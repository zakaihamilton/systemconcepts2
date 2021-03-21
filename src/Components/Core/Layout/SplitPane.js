import styles from "./SplitPane.module.scss"
import React from "react"
import { joinClasses } from "@util/styles"
import Pane from "./SplitPane/Pane"
import { createState } from "@components/Core/Util/State"
import { createList } from "@components/Core/Util/List"

export default function SplitPane({ children, orientation = "vertical" }) {
    return <div className={joinClasses(styles, ["root", orientation])}>
        <SplitPane.State orientation={orientation}>
            {children}
        </SplitPane.State>
    </div>;
}

SplitPane.State = createState({ orientation: "vertical" });
SplitPane.List = createList();

export { Pane };
