import Button from "@components/Core/UI/Widgets/Button"
import Tooltip from "@components/Core/UI/Widgets/Tooltip"
import Sidebar from "@components/App/Sidebar"
import { usePage } from "@components/App/Page"
import Translation from "@components/Core/Util/Translation"
import styles from "./AppButton.module.scss"

export default function AppButton() {
    const translation = Translation.useTranslation();
    const sidebarState = Sidebar.State.useState();
    const page = usePage();

    const toggleAppMenu = () => {
        sidebarState.visible = !sidebarState.visible;
    };

    let label = page?.name || "APP";
    label = translation?.[label] || label;

    return <>
        <Tooltip title={translation?.SIDEBAR} className={styles.tooltip}>
            <Button rounded={false} className={styles.button} onClick={toggleAppMenu} icon={page?.icon}>
                {label}
            </Button>
        </Tooltip>
    </>;
}
