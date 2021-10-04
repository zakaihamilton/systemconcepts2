import styles from "./ItemMenu.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "@components/Core/UI/Widgets/Button";
import { createState } from "@components/Core/Util/State";
import PopupMenu from "@components/Core/UI/Widgets/Menu/PopupMenu";
import Popup from "@components/Core/Util/Popup";
import { useCallback, useRef } from "react";
import { useRegion } from "@components/Core/Util/Region";
import clsx from "clsx";

export default function ItemMenu() {
    const buttonRef = useRef();
    const buttonRegion = useRegion(buttonRef);
    const state = ItemMenu.State.useState();
    const onClick = useCallback(() => {
        state.popup = true;
    }, [state]);
    const hidePopup = useCallback(() => {
        state.popup = false;
    }, [state]);
    const visible = state?.visible && state?.items.length;
    return <Popup.State visible={state?.popup} onClick={hidePopup}>
        <PopupMenu items={state.items} region={buttonRegion}>
            <Button rootRef={buttonRef} className={clsx(styles.root, visible && styles.visible)} onClick={onClick}>
                <BsThreeDotsVertical />
            </Button>
        </PopupMenu>
    </Popup.State>;
}

ItemMenu.State = createState();
