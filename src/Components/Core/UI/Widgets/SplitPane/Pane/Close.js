import Tooltip from "@components/Core/UI/Widgets/Tooltip"
import Button from "@components/Core/UI/Widgets/Button"
import { MdCancel } from "react-icons/md"
import Translation from "@components/Core/Util/Translation"

export default function Close({ state }) {
    const translation = Translation.useTranslation();
    const onClose = () => {
        state.visible = false;
    };
    return <Tooltip title={translation?.CLOSE}>
        <Button onClick={onClose}>
            <MdCancel />
        </Button>
    </Tooltip>
}
