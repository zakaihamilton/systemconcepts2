import { createState } from "@components/Core/Util/State"
import Dialog from "@components/Core/UI/Dialog/Dialog"
import styles from "./Settings.module.scss"
import { useRefById } from "@components/Core/UI/Util/Ref"
import { useRegion, regionToUnit } from "@components/Core/UI/Util/Region"
import { useAlign } from "@components/Core/UI/Util/Align"
import Close from "./Settings/Close"
import Bar from "@components/Core/UI/Layout/Bar"
import List from "src/Components/Core/UI/Layout/List"
import Padding from "src/Components/Core/UI/Layout/Padding"

export default function Settings() {
    const settingsState = Settings.State.useState();

    const titleRef = useRefById("title");
    const titleRegion = useRegion(titleRef);
    const mainRef = useRefById("main");
    const mainRegion = useRegion(mainRef);
    const titleAlignRegion = useAlign(titleRegion, { right: 0, bottom: "top" });
    const mainAlignRegion = useAlign(mainRegion, { width: "width", height: "height" });
    const dialogStyles = { ...regionToUnit(titleAlignRegion, "px"), ...regionToUnit(mainAlignRegion, "px") };

    const title = <Bar>
        <div className={styles.label}>Settings</div>
        <Close state={settingsState} />
    </Bar>;

    return <Dialog classes={{ root: styles.dialog }} style={dialogStyles} title={title} visible={settingsState.visible}>
        <Padding padding="1em">
            <List className={styles.list}>

            </List>
        </Padding>
    </Dialog>;
}

Settings.State = createState({ visible: false });
