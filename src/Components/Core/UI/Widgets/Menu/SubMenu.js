import Modal from "@components/Core/Util/Modal";
import { useRegion } from "@components/Core/Util/Region";
import { createState } from "@components/Core/Util/State";
import { useCallback, useMemo, useRef } from "react";
import Popup from "src/Components/Core/Util/Popup";
import Menu from "../Menu"
import Item from "./Item"

export default function SubMenu({ items, ...props }) {
    const state = SubMenu.State.useState();
    const itemRef = useRef();

    const onClick = useCallback(() => {
        state.visible = !state.visible;
    }, [state]);

    const itemRegion = useRegion(itemRef);

    const children = useMemo(() => {
        let menuStyles = { top: itemRegion.bottom };
        if (itemRegion.left > window.innerWidth / 2) {
            const right = window.innerWidth - itemRegion.left - itemRegion.width;
            menuStyles.right = right;
        }
        else {
            menuStyles.left = itemRegion.left;
        }
        return <Menu.State items={items}>
            <Item {...props} selected={state.visible} rootRef={itemRef} onClick={onClick} />
            <Popup visible={state?.visible} onClick={onClick}>
                <Menu vertical={true} popup={true} style={menuStyles} />
            </Popup>
        </Menu.State>
    }, [props, state?.visible, onClick, items, itemRegion]);

    return { children };
}

SubMenu.State = createState({ visible: false });
