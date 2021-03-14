import styles from "./SplitPane.module.scss"
import React from "react"
import { joinClasses } from "@util/styles"
import Pane from "./SplitPane/Pane"
import Divider from "./SplitPane/Divider"
import { createSettings } from "@components/Core/Util/Settings"

export default function SplitPane({ children }) {
    const { orientation } = SplitPane.Settings.useSettings();

    return <div className={joinClasses(styles, ["root", orientation])}>
        {children}
    </div>;
}

SplitPane.Settings = createSettings({ orientation: "vertical" });

export { Pane, Divider };
