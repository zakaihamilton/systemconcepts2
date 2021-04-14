import { MdSettings } from "react-icons/md"
import Button from "@components/Core/UI/Widgets/Button"
import Tooltip from "@components/Core/UI/Widgets/Tooltip"

export default function Settings() {
    return <Tooltip title="Settings">
        <Button>
            <MdSettings />
        </Button>
    </Tooltip>;
}
