import Button from "@components/Core/UI/Widgets/Button"
import Tooltip from "@components/Core/UI/Widgets/Tooltip"
import Sidebar from "@components/App/Sidebar"
import { usePage } from "@components/App/Page"

export default function AppButton() {
    const sidebarState = Sidebar.State.useState();
    const page = usePage();

    const toggleAppMenu = () => {
        sidebarState.visible = !sidebarState.visible;
    };

    const label = page?.name || "App";

    return <>
        <Tooltip title="Sidebar">
            <Button onClick={toggleAppMenu} icon={page?.icon}>
                {label}
            </Button>
        </Tooltip>
    </>;
}
