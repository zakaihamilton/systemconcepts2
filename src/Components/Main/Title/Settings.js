import { MdSettings } from "react-icons/md"
import Button from "@components/Core/UI/Widgets/Button"
import Tooltip from "@components/Core/UI/Widgets/Tooltip"
import SettingsDialog from "@components/Main/Dialogs/Settings"

export default function Settings() {
    const settingsState = SettingsDialog.State.useState({ visible: false });

    const toggleSettings = () => {
        settingsState.visible = !settingsState.visible;
    };

    return <>
        <Tooltip title="Settings">
            <Button onClick={toggleSettings}>
                <MdSettings />
            </Button>
        </Tooltip>
        <SettingsDialog />
    </>;
}
