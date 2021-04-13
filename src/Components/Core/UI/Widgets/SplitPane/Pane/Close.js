import Tooltip from "@components/Core/UI/Widgets/Tooltip"
import Button from "@components/Core/UI/Widgets/Button"
import { MdCancel } from "react-icons/md"
import Pane from "../Pane"

export default function Close({ state }) {
    const onClose = () => {
        state.visible = false;
    };
    return <Tooltip title="Close">
        <Button onClick={onClose}>
            <MdCancel />
        </Button>
    </Tooltip>
}
