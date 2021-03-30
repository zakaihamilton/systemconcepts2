import SplitPaneLayout from "@components/Core/Layout/SplitPane"
import { MdLibraryAdd } from "react-icons/md"
import styles from "./SplitPane.module.scss"
import { createState } from "@components/Core/Util/State"
import Pane from "./SplitPane/Pane"

export default function SplitPane({ children, ...props }) {
    const state = SplitPane.State.useState({ panes: [] });
    const onAddPane = () => {
        state.panes = [...state.panes, (<Pane key={state.panes.length + 1} divider={true} />)];
    };
    return <SplitPaneLayout {...props}>
        {children}
        {state.panes}
        <div className={styles.add} onClick={onAddPane}>
            <MdLibraryAdd style={{ fontSize: "2em" }} />
        </div>
    </SplitPaneLayout>;
}

SplitPane.State = createState();
