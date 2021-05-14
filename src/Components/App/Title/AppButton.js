import Button from "@components/Core/UI/Widgets/Button"
import Tooltip from "@components/Core/UI/Widgets/Tooltip"
import Sidebar from "@components/App/Sidebar"

export default function AppButton() {
    const sidebarState = Sidebar.State.useState();

    const toggleAppMenu = () => {
        sidebarState.visible = !sidebarState.visible;
    };

    return <>
        <Tooltip title="App Menu">
            <Button onClick={toggleAppMenu}>
                App
            </Button>
        </Tooltip>
    </>;
}
