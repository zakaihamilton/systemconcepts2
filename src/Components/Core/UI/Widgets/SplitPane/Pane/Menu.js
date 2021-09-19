import SplitPaneLayout from "@components/Core/UI/Layout/SplitPane"
import { MdMoreVert, MdMoreHoriz } from "react-icons/md"
import Button from "@components/Core/UI/Widgets/Button"
import Components from "@components/Core/Util/Components"
import Tooltip from "@components/Core/UI/Widgets/Tooltip"

export default function Menu({ menu }) {
    const { orientation } = SplitPaneLayout.State.useState();

    return <Components menu={menu}>
        <Tooltip title="Menu">
            <Button rounded={false}>
                {orientation === "vertical" && <MdMoreVert />}
                {orientation === "horizontal" && <MdMoreHoriz />}
            </Button>
        </Tooltip>
    </Components>
}
