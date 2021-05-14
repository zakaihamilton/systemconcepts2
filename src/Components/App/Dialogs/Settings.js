import { createState } from "@components/Core/Util/State"
import Dialog from "@components/Core/UI/Dialog/Dialog"
import styles from "./Settings.module.scss"
import { useRefById } from "@components/Core/Util/Ref"
import { useRegion, regionToUnit } from "@components/Core/Util/Region"
import { useAlign } from "src/Components/Core/Util/Align"
import Close from "./Settings/Close"
import Bar from "@components/Core/UI/Layout/Bar"
import List from "@components/Core/UI/Layout/List"
import Padding from "src/Components/Core/UI/Layout/Padding"
import { useMemo } from "react"
import SettingsItem from "./Settings/Item"

export default function SettingsDialog() {
    const settingsState = SettingsDialog.State.useState();

    const titleRef = useRefById("title");
    const titleRegion = useRegion(titleRef);
    const mainRef = useRefById("main");
    const mainRegion = useRegion(mainRef);
    const titleAlignRegion = useAlign(titleRegion, { right: 0, bottom: "top" });
    const mainAlignRegion = useAlign(mainRegion, { width: "width", height: "height" });
    const dialogStyles = { ...regionToUnit(titleAlignRegion, "px"), ...regionToUnit(mainAlignRegion, "px") };

    const title = useMemo(() => <Bar>
        <div className={styles.label}>Settings</div>
        <Close state={settingsState} />
    </Bar>, [settingsState]);

    return <Dialog classes={{ root: styles.dialog }} style={dialogStyles} title={title} visible={settingsState.visible}>
        <Padding padding="1em">
            <List className={styles.list} itemSize={40} count={100} Item={SettingsItem}>

            </List>
        </Padding>
    </Dialog>;
}

SettingsDialog.State = createState({ visible: false });
