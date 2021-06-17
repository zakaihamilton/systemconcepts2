import Button from "@components/Core/UI/Widgets/Button"
import Tooltip from "@components/Core/UI/Widgets/Tooltip"
import Sidebar from "@components/App/Sidebar"
import { usePage } from "@components/App/Page"
import Translation from "@components/Core/Util/Translation"

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
        <Tooltip title="Sidebar">
            <Button onClick={toggleAppMenu} icon={page?.icon}>
                {label}
            </Button>
        </Tooltip>
    </>;
}
